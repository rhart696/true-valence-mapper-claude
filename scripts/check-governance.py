#!/usr/bin/env python3
"""Validate TVM context records and change coverage using only the standard library."""
import argparse
import datetime as dt
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
KINDS = {'SRC': 'source', 'CLM': 'claim', 'DEC': 'decision', 'REQ': 'requirement',
         'RSK': 'risk', 'RQ': 'research-question', 'EXP': 'experiment',
         'OBS': 'observation', 'TEST': 'test'}
VIEWS = {
    'source': ('docs/evidence/EVIDENCE-REGISTER.md', 'Evidence and sources'),
    'claim': ('docs/evidence/CLAIMS-REGISTER.md', 'Claims and hypotheses'),
    'decision': ('docs/decisions/DECISION-REGISTER.md', 'Decisions'),
    'requirement': ('docs/requirements/REQUIREMENTS-REGISTER.md', 'Requirements'),
    'risk': ('docs/risk/RISK-REGISTER.md', 'Risks'),
}


def safe_path(root, path):
    if not isinstance(path, str) or not path or Path(path).is_absolute():
        return False
    resolved = (root / path).resolve()
    return resolved.is_relative_to(root.resolve())


def validate(root, data, manifests, changed=None, changed_manifests=None):
    errors, warnings = [], []
    entries = data.get('records', [])
    if data.get('schema_version') != 1 or not isinstance(entries, list):
        return ['Unsupported registry schema'], warnings
    ids = {r.get('id') for r in entries if isinstance(r, dict)}
    seen = set()
    by_id = {}
    for r in entries:
        if not isinstance(r, dict):
            errors.append('Record must be an object')
            continue
        rid = r.get('id', '')
        if not isinstance(rid, str) or not re.fullmatch(r'(SRC|CLM|DEC|REQ|RSK|RQ|EXP|OBS|TEST)-\d{4}', rid):
            errors.append(f'Invalid ID: {rid}')
            continue
        if rid in seen:
            errors.append(f'Duplicate ID: {rid}')
        seen.add(rid)
        by_id[rid] = r
        if r.get('kind') != KINDS[rid.split('-')[0]]:
            errors.append(f'{rid}: kind mismatch')
        for field in ('title', 'path', 'status', 'currency', 'owner', 'created', 'last_reviewed'):
            if not isinstance(r.get(field), str) or not r[field].strip():
                errors.append(f'{rid}: missing {field}')
        if r.get('currency') not in ('authoritative', 'superseded', 'archival'):
            errors.append(f'{rid}: invalid currency')
        for field in ('created', 'last_reviewed'):
            try:
                dt.date.fromisoformat(r.get(field, ''))
            except (ValueError, TypeError):
                errors.append(f'{rid}: invalid {field}')
        if not safe_path(root, r.get('path')) or not (root / r.get('path', '')).is_file():
            errors.append(f'{rid}: absent/unsafe record path')
        for field in ('related', 'supersedes', 'superseded_by', 'verified_by'):
            refs = r.get(field, [])
            if not isinstance(refs, list) or any(not isinstance(ref, str) for ref in refs):
                errors.append(f'{rid}: {field} must be an ID array')
                continue
            for ref in refs:
                if ref not in ids:
                    errors.append(f'{rid}: dangling {field} reference {ref}')
        for path in r.get('implemented_by', []) + r.get('specified_in', []) + r.get('artifacts', []):
            if not safe_path(root, path) or not (root / path).exists():
                errors.append(f'{rid}: absent/unsafe artifact {path}')
        if r.get('kind') == 'source':
            for field in ('verification', 'claim_supported', 'limitations', 'source_type'):
                if not r.get(field):
                    errors.append(f'{rid}: source lacks {field}')
            if rid != 'SRC-0001':
                if not str(r.get('url', '')).startswith('https://'):
                    errors.append(f'{rid}: missing source URL')
                for field in ('verified', 'review_due'):
                    try:
                        value = dt.date.fromisoformat(r.get(field, ''))
                        if field == 'review_due' and value < dt.date.today():
                            warnings.append(f'{rid}: evidence review overdue ({value})')
                    except (ValueError, TypeError):
                        errors.append(f'{rid}: invalid {field}')
        if r.get('kind') == 'requirement' and (not r.get('acceptance') or not r.get('validation_plan')):
            errors.append(f'{rid}: requirement lacks acceptance or validation plan')
        if r.get('kind') == 'requirement' and r.get('status') == 'verified':
            if not r.get('verified_by'):
                errors.append(f'{rid}: verified requirement has no result')
            for ref in r.get('verified_by', []):
                result = next((x for x in entries if isinstance(x, dict) and x.get('id') == ref), {})
                if result.get('kind') != 'test' or result.get('status') != 'passed':
                    errors.append(f'{rid}: verification result {ref} is not a passed test')
    for r in entries:
        if not isinstance(r, dict):
            continue
        for successor in r.get('superseded_by', []):
            if successor in by_id and r.get('id') not in by_id[successor].get('supersedes', []):
                errors.append(f'{r.get("id")}: nonreciprocal supersession {successor}')

    manifest_ids = set()
    for name, manifest in manifests.items():
        mid = manifest.get('id')
        if not isinstance(mid, str) or not re.fullmatch(r'CHG-\d{4}', mid) or mid in manifest_ids:
            errors.append(f'{name}: invalid/duplicate change ID')
        manifest_ids.add(mid)
        for field in ('summary', 'rationale', 'validation', 'owner', 'date'):
            if not manifest.get(field):
                errors.append(f'{name}: missing {field}')
        try:
            dt.date.fromisoformat(manifest.get('date', ''))
        except (ValueError, TypeError):
            errors.append(f'{name}: invalid date')
        paths = manifest.get('paths')
        if not isinstance(paths, list) or not paths:
            errors.append(f'{name}: missing paths')
            paths = []
        if any(not safe_path(root, p) for p in paths):
            errors.append(f'{name}: unsafe change path')
        change_type = manifest.get('change_type')
        if change_type not in ('governance', 'feature', 'fix', 'security', 'editorial'):
            errors.append(f'{name}: invalid change_type')
        for field, kind in [('requirements', 'requirement'), ('decisions', 'decision'),
                            ('evidence', None), ('risks', 'risk'), ('tests', 'test')]:
            refs = manifest.get(field, [])
            if not isinstance(refs, list) or any(not isinstance(ref, str) for ref in refs):
                errors.append(f'{name}: invalid {field}')
                continue
            if change_type != 'editorial' and field in ('requirements', 'decisions', 'evidence', 'tests') and not refs:
                errors.append(f'{name}: missing {field}')
            for ref in refs:
                if ref not in by_id:
                    errors.append(f'{name}: missing context {ref}')
                elif kind and by_id[ref].get('kind') != kind:
                    errors.append(f'{name}: wrong {field} kind {ref}')
                elif field == 'evidence' and by_id[ref].get('kind') not in ('source', 'claim', 'observation'):
                    errors.append(f'{name}: invalid evidence kind {ref}')
        if not manifest.get('risks') and not manifest.get('risk_disposition'):
            errors.append(f'{name}: risk assessment absent')
        if change_type == 'editorial':
            if not manifest.get('editorial_reason'):
                errors.append(f'{name}: missing editorial reason')
            if any(not isinstance(p, str) or not p.endswith('.md') or p.startswith(('docs/product/', 'docs/service/', 'docs/decisions/', 'docs/requirements/')) for p in paths):
                errors.append(f'{name}: editorial exemption cannot cover implementation/specifications')
    if changed is not None:
        active = changed_manifests or []
        if not active:
            errors.append('Change set has no new/updated change manifest')
        covered = {p for name in active for p in manifests.get(name, {}).get('paths', [])}
        for path in changed:
            if path not in covered:
                errors.append(f'Unlinked changed path: {path}')
    return errors, warnings


def view_text(kind, title, records):
    lines = [f'# {title}', '', 'Generated from `docs/governance/registry.json`; do not edit this index by hand.',
             'Read detailed records for rationale, source access limits and validation.', '',
             '| ID | Record | Lifecycle | Relevant context |', '|---|---|---|---|']
    parent = Path(VIEWS[kind][0]).parent
    import os
    for r in records:
        if r['kind'] == kind:
            rel = os.path.relpath(r['path'], parent).replace('\\', '/')
            if kind in ('claim', 'risk'):
                label = r['title'] + ' — ' + (r.get('claim') if kind == 'claim' else r.get('treatment', ''))
            else:
                label = f'[{r["title"]}]({rel})'
            context = ', '.join(r.get('related', []))
            if kind == 'source':
                context = r.get('verification', '') + '; review due ' + r.get('review_due', 'n/a')
            if kind == 'claim':
                context += '; ' + r.get('basis', '') + '; certainty ' + r.get('confidence', '')
            if kind == 'risk':
                context += '; severity ' + r.get('severity', '') + '; likelihood ' + r.get('likelihood', '')
            lines.append(f'| {r["id"]} | {label.replace(chr(124), chr(92)+chr(124))} | {r["status"]} | {context} |')
    return '\n'.join(lines) + '\n'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base')
    parser.add_argument('--head', default='HEAD')
    parser.add_argument('--render', action='store_true', help='Regenerate index views from registry')
    args = parser.parse_args()
    try:
        data = json.loads((ROOT / 'docs/governance/registry.json').read_text())
        manifests = {str(p.relative_to(ROOT)): json.loads(p.read_text()) for p in sorted((ROOT / 'docs/governance/changes').glob('CHG-*.json'))}
        changed = active = None
        if args.base:
            # No shell interpolation; refs are data, and -- separates paths.
            output = subprocess.check_output(['git', 'diff', '--name-only', '-z', args.base, args.head, '--'], cwd=ROOT)
            changed = [p for p in output.decode().split('\0') if p]
            active = [p for p in changed if p.startswith('docs/governance/changes/CHG-') and p.endswith('.json') and p in manifests]
        errors, warnings = validate(ROOT, data, manifests, changed, active)
        if args.render and not errors:
            for kind, (path, title) in VIEWS.items():
                (ROOT / path).write_text(view_text(kind, title, data['records']))
        elif not errors:
            for kind, (path, title) in VIEWS.items():
                if not (ROOT / path).is_file() or (ROOT / path).read_text() != view_text(kind, title, data['records']):
                    errors.append(f'Stale index {path}; run --render')
        for warning in warnings:
            print('WARNING:', warning)
        for error in errors:
            print('FAIL:', error, file=sys.stderr)
        if errors:
            return 1
        print(f'PASS: {len(data["records"])} records, {len(manifests)} change manifests' + (f', {len(changed)} linked paths' if changed is not None else ''))
        return 0
    except (OSError, ValueError, TypeError, KeyError, subprocess.CalledProcessError) as error:
        print(f'FAIL: governance input/check error: {error}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
