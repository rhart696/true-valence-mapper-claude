#!/usr/bin/env python3
"""Fail closed on incomplete TVM work packages, drift and release evidence."""
import argparse
import datetime as dt
import fnmatch
import json
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
STAGES = ['framed', 'specified', 'implemented', 'verified', 'evaluated']
GATES = ['dependencies', 'authorization', 'retention', 'persistence', 'privacy',
         'accessibility', 'reports', 'facilitation', 'pilot-research']
SENSITIVE = ['.github/*', 'scripts/*', 'AI_POLICY.md', 'AGENTS*',
             'docs/governance/*', '*.sql', '**/*.sql', 'v1/src/lib/shareSession.ts',
             'v1/src/lib/supabase.ts', 'v1/src/lib/sessionStorage.ts',
             'v1/src/context/SessionContext.tsx', 'v1/package*.json']

def safe(root, path):
    return isinstance(path, str) and bool(path) and not Path(path).is_absolute() and (root / path).resolve().is_relative_to(root.resolve())

def validate_package(root, package, records):
    errors = []
    pid = package.get('id', '?')
    def error(message): errors.append(f'{pid}: {message}')
    if package.get('schema_version') != 1 or not re.fullmatch(r'WP-\d{4}', str(pid)):
        error('invalid schema/id')
    stage = package.get('stage')
    if stage not in STAGES: error('invalid lifecycle stage')
    for field in ['owner', 'objective', 'problem', 'scope', 'uncertainty', 'alternatives', 'acceptance', 'rollback']:
        if not isinstance(package.get(field), str) or not package[field].strip(): error('missing ' + field)
    for field, kind in [('requirements','requirement'), ('decisions','decision'), ('evidence',None), ('risks','risk'), ('tests','test')]:
        refs = package.get(field)
        if not isinstance(refs, list) or not refs: error('missing ' + field); continue
        for ref in refs:
            record = records.get(ref, {})
            if not record or (kind and record.get('kind') != kind): error('invalid ' + field + ' link ' + str(ref))
            if field == 'evidence' and record.get('kind') not in ['source','claim','observation']: error('invalid evidence kind')
            if field == 'evidence' and record.get('kind') == 'source' and record.get('review_due'):
                try:
                    if dt.date.fromisoformat(record['review_due']) < dt.date.today(): error('overdue linked source ' + ref)
                except (ValueError, TypeError): error('invalid evidence review date')
    for domain in ['product', 'service']:
        impact = package.get('impacts', {}).get(domain, {})
        if impact.get('disposition') not in ['changed','no-change']: error('missing ' + domain + ' disposition')
        if not impact.get('rationale'): error('missing ' + domain + ' rationale')
        paths = impact.get('specifications', [])
        if not isinstance(paths,list) or not paths: error('missing ' + domain + ' specification'); continue
        for path in paths:
            if not safe(root,path) or not (root/path).is_file(): error('absent/unsafe specification')
            if not path.startswith('docs/' + domain + '/'): error('wrong specification domain')
    history = package.get('history', [])
    reached = [h.get('stage') for h in history if isinstance(h,dict)]
    if stage in STAGES and reached != STAGES[:STAGES.index(stage)+1]: error('skipped or reordered lifecycle transition')
    for h in history:
        if not isinstance(h,dict): error('invalid transition'); continue
        for field in ['date','actor','evidence']:
            if not h.get(field): error('transition lacks ' + field)
        try: dt.date.fromisoformat(h.get('date',''))
        except (ValueError,TypeError): error('invalid transition date')
    paths = package.get('paths', [])
    if not isinstance(paths,list) or not paths: error('missing exact paths'); paths=[]
    if any(not safe(root,path) for path in paths): error('unsafe package path')
    reviews = package.get('required_reviews', [])
    if any(any(fnmatch.fnmatchcase(p,pattern) for pattern in SENSITIVE) for p in paths) and 'human-domain-review' not in reviews:
        error('sensitive change lacks human-domain-review requirement')
    if any(p.startswith(('v1/src/', 'docs/product/', 'docs/service/')) for p in paths) and 'product-service-review' not in reviews:
        error('product/service change lacks coordinated review')
    verification = package.get('verification', [])
    if not isinstance(verification,list) or not verification: error('missing verification plan'); verification=[]
    for check in verification:
        if not isinstance(check,dict): error('invalid verification');continue
        if not check.get('command') or not check.get('scope'): error('unscoped verification')
        if check.get('status') not in ['pending','passed','failed','blocked']: error('invalid verification status')
        if check.get('status') == 'passed' and not check.get('evidence'): error('passing check lacks evidence')
    if stage in ['verified','evaluated'] and any(c.get('status') != 'passed' for c in verification):
        error('verification promotion with incomplete or failing checks')
    if stage == 'evaluated' and not package.get('evaluation'): error('evaluation promotion lacks service outcomes')
    if package.get('release_status') != 'not-authorized': error('work package cannot self-authorize a release')
    return errors

def validate_release(root, release, authorize=False, build=None, config=None, reviews=None, decision_sha=None):
    errors=[]
    if release.get('schema_version') != 1: errors.append('release: invalid schema')
    gates=release.get('gates',{})
    if set(gates) != set(GATES): errors.append('release: exact gate inventory required')
    for name,gate in gates.items():
        if gate.get('status') not in ['blocked','pending','passed']: errors.append(f'release: invalid {name} status')
        if not gate.get('owner') or not gate.get('criteria'): errors.append(f'release: missing {name} responsibility/criteria')
        if gate.get('status') == 'passed':
            if not gate.get('evidence') or not gate.get('build_sha') or not gate.get('config_digest'):
                errors.append(f'release: {name} passing evidence must bind build/config')
            for path in gate.get('evidence',[]):
                if not safe(root,path) or not (root/path).is_file(): errors.append(f'release: {name} missing evidence artifact')
    if authorize:
        if not re.fullmatch(r'[0-9a-f]{40}',build or '') or not re.fullmatch(r'[0-9a-f]{64}',config or ''):
            errors.append('release: exact build SHA and configuration SHA256 required')
        for name,gate in gates.items():
            if gate.get('status') != 'passed': errors.append('release: gate not passed: '+name)
            elif gate.get('build_sha') != build or gate.get('config_digest') != config: errors.append('release: stale build/config evidence: '+name)
        # Reviews must come from the authenticated GitHub API, not repository assertions.
        approvals = release.get('approvers', {})
        if not approvals.get('sponsor') or not approvals.get('security') or approvals.get('sponsor') == approvals.get('security'):
            errors.append('release: distinct sponsor/security reviewers must be designated')
        latest = {}
        for review in sorted(reviews or [], key=lambda r:r.get('submitted_at','')):
            if review.get('state') in ['APPROVED','CHANGES_REQUESTED','DISMISSED']:
                latest[review.get('user',{}).get('login')] = review
        for role in ['sponsor','security']:
            review=latest.get(approvals.get(role),{})
            if review.get('state') != 'APPROVED' or review.get('commit_id') != (decision_sha or build):
                errors.append('release: missing current authenticated '+role+' approval')
            if 'TVM release build: '+str(build) not in review.get('body',''):
                errors.append('release: '+role+' approval does not bind application build')
            if 'TVM release configuration: '+str(config) not in review.get('body',''):
                errors.append('release: '+role+' approval does not bind configuration')
    return errors

def validate_promotions(root, records):
    errors=[]
    for rid,record in records.items():
        if record.get('kind') != 'requirement' or record.get('status') != 'verified': continue
        results=record.get('verified_by',[])
        if not results:errors.append(rid+': verification promotion lacks full acceptance result')
        for result_id in results:
            result=records.get(result_id,{})
            if result.get('kind') != 'test' or result.get('status') != 'passed' or result.get('coverage') != 'full-acceptance' or rid not in result.get('verified_requirements',[]):
                errors.append(rid+': result does not verify full requirement acceptance')
            if not re.fullmatch(r'[0-9a-f]{40}',str(result.get('build_sha',''))):errors.append(rid+': result lacks tested commit')
            artifacts=result.get('artifacts',[])
            if not artifacts or any(not safe(root,path) or not (root/path).is_file() for path in artifacts):errors.append(rid+': result lacks existing verification artifacts')
    return errors


def git(*args):
    return subprocess.check_output(['git',*args],cwd=ROOT).decode()

def check_changes(base, head, packages):
    errors=[]
    changed=set(filter(None,git('diff','--name-only','-z',base,head,'--').split('\0')))
    active=[p for p in changed if p.startswith('docs/governance/work-packages/WP-') and p.endswith('.json')]
    covered={path for p in active for path in packages.get(p,{}).get('paths',[])}
    if not active: errors.append('change set lacks a current work package')
    for path in sorted(changed-covered): errors.append('unmanaged changed path: '+path)
    for p in active:
        wp=packages.get(p,{})
        exists=subprocess.run(['git','cat-file','-e',base+':'+p],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL).returncode==0
        if exists:
            old=json.loads(git('show',base+':'+p))
            history=old.get('history',[])
            if wp.get('history',[])[:len(history)] != history:
                errors.append(p+': historical lifecycle evidence rewritten')
            if old.get('stage') in STAGES and wp.get('stage') in STAGES and STAGES.index(wp['stage']) < STAGES.index(old['stage']):
                errors.append(p+': lifecycle regression; create a new increment instead')
        for domain,prefixes in [('product',('v1/src/','docs/product/')),('service',('docs/service/',))]:
            if any(path.startswith(prefixes) for path in changed & set(wp.get('paths',[]))):
                impact=wp.get('impacts',{}).get(domain,{})
                if impact.get('disposition') != 'changed': errors.append(p+': '+domain+' change hidden as no-change')
    # Past change manifests are an append-only audit record; amendments get new IDs.
    for p in changed:
        if p.startswith('docs/governance/changes/CHG-'):
            exists=subprocess.run(['git','cat-file','-e',base+':'+p],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL).returncode==0
            if exists: errors.append('historical manifest mutated: '+p)
    return errors

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base');parser.add_argument('--head',default='HEAD')
    parser.add_argument('--authorize-release',action='store_true')
    parser.add_argument('--build');parser.add_argument('--config-digest');parser.add_argument('--release-pr',type=int)
    args=parser.parse_args()
    try:
        registry=json.loads((ROOT/'docs/governance/registry.json').read_text())
        records={r['id']:r for r in registry['records']}
        packages={str(p.relative_to(ROOT)):json.loads(p.read_text()) for p in (ROOT/'docs/governance/work-packages').glob('WP-*.json')}
        errors=validate_promotions(ROOT,records)
        if not packages: errors.append('no work packages')
        seen=set()
        for p,wp in packages.items():
            if wp.get('id') in seen: errors.append('duplicate work package ID')
            seen.add(wp.get('id'))
            errors.extend(validate_package(ROOT,wp,records))
        release=json.loads((ROOT/'docs/governance/release.json').read_text())
        reviews=[]
        decision_sha=None
        if args.authorize_release:
            if not args.release_pr: errors.append('release: authenticated release PR required')
            else:
                pr=json.loads(subprocess.check_output(['gh','api',f'repos/rhart696/true-valence-mapper-claude/pulls/{args.release_pr}']))
                decision_sha=pr['head']['sha']
                if not pr.get('merged') or pr['base']['ref'] != 'main': errors.append('release: reviewed release-decision PR must be merged to main')
                if not re.fullmatch(r'[0-9a-f]{40}',args.build or ''):
                    errors.append('release: invalid build SHA')
                elif subprocess.run(['git','merge-base','--is-ancestor',args.build,'HEAD'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL).returncode:
                    errors.append('release: application build is not an ancestor of reviewed main')
                reviews=json.loads(subprocess.check_output(['gh','api','--paginate','--slurp',f'repos/rhart696/true-valence-mapper-claude/pulls/{args.release_pr}/reviews']))
                reviews=[item for page in reviews for item in page]
                if pr['user']['login'] in release.get('approvers',{}).values(): errors.append('release: approver cannot be PR author')
        errors.extend(validate_release(ROOT,release,args.authorize_release,args.build,args.config_digest,reviews,decision_sha))
        if args.base: errors.extend(check_changes(args.base,args.head,packages))
        for error in errors: print('FAIL:',error,file=sys.stderr)
        if errors:return 1
        print(f'PASS: {len(packages)} managed work packages; release '+('AUTHORIZED' if args.authorize_release else 'NOT AUTHORIZED (structure only)'))
        return 0
    except (OSError,ValueError,TypeError,KeyError,subprocess.CalledProcessError) as error:
        print('FAIL: process input/check error:',error,file=sys.stderr);return 1

if __name__=='__main__': sys.exit(main())
