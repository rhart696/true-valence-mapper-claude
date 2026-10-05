#!/usr/bin/env python3
"""Verify live main rules; requires gh authenticated read access. No mutation."""
import argparse
import json
from pathlib import Path
import subprocess
import sys

def validate(actual, expected):
    errors=[]
    rules={r['type']:r for r in actual}
    for rule in expected['rules']:
        live=rules.get(rule['type'],{})
        if not live: errors.append('missing active rule '+rule['type']);continue
        params=live.get('parameters',{})
        for key,value in rule.get('parameters',{}).items():
            if key=='required_status_checks':
                found={(x['context'],x.get('integration_id')) for x in params.get(key,[])}
                if not {(x['context'],x['integration_id']) for x in value}.issubset(found):errors.append('missing required checks or trusted Actions source')
            elif key=='required_approving_review_count':
                if params.get(key,0)<value:errors.append('insufficient approvals')
            elif params.get(key)!=value:errors.append('rule weaker than required: '+key)
    return errors

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--parent',action='store_true')
    args=parser.parse_args()
    repository='rhart696/true-valence-mapper' if args.parent else 'rhart696/true-valence-mapper-claude'
    filename='parent-github-ruleset.json' if args.parent else 'github-ruleset.json'
    try:
        expected=json.loads((Path(__file__).parents[1]/'docs/governance'/filename).read_text())
        actual=json.loads(subprocess.check_output(['gh','api','--paginate','--slurp',f'repos/{repository}/rules/branches/main']))
        errors=validate([r for page in actual for r in page],expected)
        # Verify no bypass actors in the repository ruleset itself.
        sets=json.loads(subprocess.check_output(['gh','api','--paginate','--slurp',f'repos/{repository}/rulesets']))
        matches=[r for page in sets for r in page if r.get('name')==expected['name'] and r.get('enforcement')=='active']
        if not matches:errors.append('designated active ruleset absent')
        for item in matches:
            detail=json.loads(subprocess.check_output(['gh','api',f"repos/{repository}/rulesets/{item['id']}"]))
            if detail.get('bypass_actors'):errors.append('ruleset permits bypass actors')
        for error in errors:print('FAIL:',error)
        if errors:return 1
        print('PASS: live merge enforcement matches required policy');return 0
    except (OSError,ValueError,KeyError,subprocess.CalledProcessError) as error:
        print('FAIL: cannot verify activation:',error);return 1
if __name__=='__main__':sys.exit(main())
