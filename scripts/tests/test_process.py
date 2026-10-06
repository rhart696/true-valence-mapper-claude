import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec=importlib.util.spec_from_file_location('process',Path(__file__).parents[1]/'check-process.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)

class ProcessTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name)
        for domain in ['product','service']:
            p=self.root/f'docs/{domain}/spec.md';p.parent.mkdir(parents=True);p.write_text('fixture')
        self.records={rid:dict(kind=kind) for rid,kind in [('REQ-0001','requirement'),('DEC-0001','decision'),('SRC-0001','source'),('RSK-0001','risk'),('TEST-0001','test')]}
        self.wp=dict(schema_version=1,id='WP-0001',stage='implemented',release_status='not-authorized',
            **{k:'fixture' for k in ['owner','objective','problem','scope','uncertainty','alternatives','acceptance','rollback']},
            requirements=['REQ-0001'],decisions=['DEC-0001'],evidence=['SRC-0001'],risks=['RSK-0001'],tests=['TEST-0001'],
            impacts={d:dict(disposition='changed',rationale='fixture',specifications=[f'docs/{d}/spec.md']) for d in ['product','service']},
            history=[dict(stage=s,date='2026-10-05',actor='fixture',evidence='fixture') for s in m.STAGES[:3]],
            paths=['v1/src/lib/shareSession.ts'],required_reviews=['human-domain-review','product-service-review'],
            verification=[dict(command='test',scope='fixture',status='pending')])
    def errors(self):return m.validate_package(self.root,self.wp,self.records)
    def test_valid_implementation_can_be_reviewed_with_release_blocked(self):self.assertEqual([],self.errors())
    def test_no_lifecycle_jump(self):
        self.wp['history'].pop(1);self.assertTrue(any('skipped' in e for e in self.errors()))
    def test_verified_with_pending_check_fails(self):
        self.wp['stage']='verified';self.wp['history'].append(dict(stage='verified',date='2026-10-05',actor='fixture',evidence='fixture'))
        self.assertTrue(any('incomplete' in e for e in self.errors()))
    def test_service_impact_required(self):
        del self.wp['impacts']['service'];self.assertTrue(self.errors())
    def test_sensitive_change_requires_human_review(self):
        self.wp['required_reviews'].remove('human-domain-review');self.assertTrue(any('human-domain-review' in e for e in self.errors()))
    def test_product_service_review_required(self):
        self.wp['required_reviews'].remove('product-service-review');self.assertTrue(any('coordinated review' in e for e in self.errors()))
    def test_overdue_linked_evidence_blocks(self):
        self.records['SRC-0001']['review_due']='2000-01-01';self.assertTrue(any('overdue' in e for e in self.errors()))
    def test_wrong_record_kind_blocks(self):
        self.wp['requirements']=['SRC-0001'];self.assertTrue(any('invalid requirements' in e for e in self.errors()))
    def test_self_authorized_release_fails(self):
        self.wp['release_status']='approved';self.assertTrue(any('self-authorize' in e for e in self.errors()))
    def test_passing_check_without_artifact_fails(self):
        self.wp['verification'][0]['status']='passed';self.assertTrue(any('lacks evidence' in e for e in self.errors()))
    def test_evaluation_needs_service_outcomes(self):
        self.wp['stage']='evaluated';self.wp['history']=[dict(stage=s,date='2026-10-05',actor='fixture',evidence='fixture') for s in m.STAGES]
        self.wp['verification'][0].update(status='passed',evidence='fixture');self.assertTrue(any('outcomes' in e for e in self.errors()))
    def test_unsafe_specification_blocks(self):
        self.wp['impacts']['service']['specifications']=['../../escape'];self.assertTrue(any('unsafe' in e for e in self.errors()))

class ReleaseTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.root=Path(self.tmp.name)
        (self.root/'evidence.md').write_text('fixture')
        self.build='a'*40;self.config='b'*64
        self.release=dict(schema_version=1,approvers=dict(sponsor='sponsor',security='reviewer'),gates={n:dict(status='passed',owner='fixture',criteria='fixture',evidence=['evidence.md'],build_sha=self.build,config_digest=self.config) for n in m.GATES})
        self.reviews=[dict(user=dict(login=u),state='APPROVED',commit_id=self.build,submitted_at='2026-10-05T00:00:00Z',body='TVM release build: '+self.build+'\nTVM release configuration: '+self.config) for u in ['sponsor','reviewer']]
    def errors(self):return m.validate_release(self.root,self.release,True,self.build,self.config,self.reviews)
    def test_bound_release_passes_with_authenticated_review_fixture(self):self.assertEqual([],self.errors())
    def test_missing_gate_blocks(self):
        del self.release['gates']['privacy'];self.assertTrue(self.errors())
    def test_open_gate_blocks(self):
        self.release['gates']['privacy']['status']='pending';self.assertTrue(any('not passed' in e for e in self.errors()))
    def test_stale_commit_blocks(self):
        self.release['gates']['privacy']['build_sha']='c'*40;self.assertTrue(any('stale' in e for e in self.errors()))
    def test_stale_config_blocks(self):
        self.release['gates']['privacy']['config_digest']='d'*64;self.assertTrue(any('stale' in e for e in self.errors()))
    def test_unreviewed_release_blocks(self):
        self.reviews=[];self.assertTrue(any('approval' in e for e in self.errors()))
    def test_change_request_overrides_prior_approval(self):
        self.reviews.append(dict(user=dict(login='reviewer'),state='CHANGES_REQUESTED',submitted_at='2026-10-06T00:00:00Z'))
        self.assertTrue(any('approval' in e for e in self.errors()))
    def test_stale_review_blocks(self):
        self.reviews[0]['commit_id']='c'*40;self.assertTrue(self.errors())
    def test_distinct_reviewers_required(self):
        self.release['approvers']['security']='sponsor';self.assertTrue(self.errors())
    def test_missing_evidence_artifact_blocks(self):
        (self.root/'evidence.md').unlink();self.assertTrue(self.errors())

class ChangeCoverageTests(unittest.TestCase):
    def setUp(self):
        import subprocess
        self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup)
        self.root=Path(self.tmp.name);self.original=m.ROOT;m.ROOT=self.root
        self.addCleanup(lambda:setattr(m,'ROOT',self.original))
        def git(*args):return subprocess.check_output(['git',*args],cwd=self.root).decode().strip()
        self.git=git;git('init','-q');git('config','user.name','Fixture');git('config','user.email','fixture@example.invalid')
        p=self.root/'docs/governance/changes/CHG-0001.json';p.parent.mkdir(parents=True);p.write_text('{}')
        git('add','.');git('commit','-qm','baseline');self.base=git('rev-parse','HEAD')
        self.wp='docs/governance/work-packages/WP-0001.json'
    def commit(self, files):
        for name,text in files.items():
            p=self.root/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(text)
        self.git('add','.');self.git('commit','-qm','change')
    def test_uncovered_changed_path_fails(self):
        self.commit({self.wp:'{}','v1/src/new.ts':'fixture'})
        errors=m.check_changes(self.base,'HEAD',{self.wp:dict(paths=[self.wp])})
        self.assertTrue(any('unmanaged changed path' in e for e in errors))
    def test_old_manifest_cannot_be_mutated(self):
        name='docs/governance/changes/CHG-0001.json';self.commit({self.wp:'{}',name:'changed'})
        errors=m.check_changes(self.base,'HEAD',{self.wp:dict(paths=[self.wp,name])})
        self.assertTrue(any('historical manifest mutated' in e for e in errors))
    def test_product_change_cannot_hide_as_no_change(self):
        self.commit({self.wp:'{}','v1/src/new.ts':'fixture'})
        errors=m.check_changes(self.base,'HEAD',{self.wp:dict(paths=[self.wp,'v1/src/new.ts'],impacts=dict(product=dict(disposition='no-change')))})
        self.assertTrue(any('hidden' in e for e in errors))
    def test_missing_current_work_package_fails(self):
        self.commit({'README.md':'fixture'})
        self.assertTrue(any('lacks a current' in e for e in m.check_changes(self.base,'HEAD',{})))

class PromotionTests(unittest.TestCase):
    def test_partial_passing_result_cannot_verify_requirement(self):
        records={'REQ-0001':dict(kind='requirement',status='verified',verified_by=['TEST-0001']),
                 'TEST-0001':dict(kind='test',status='passed',coverage='partial')}
        self.assertTrue(m.validate_promotions(Path('.'),records))
    def test_named_full_result_with_artifact_and_commit_passes(self):
        with tempfile.TemporaryDirectory() as folder:
            root=Path(folder);(root/'result.txt').write_text('fixture')
            records={'REQ-0001':dict(kind='requirement',status='verified',verified_by=['TEST-0001']),
                     'TEST-0001':dict(kind='test',status='passed',coverage='full-acceptance',verified_requirements=['REQ-0001'],build_sha='a'*40,artifacts=['result.txt'])}
            self.assertEqual([],m.validate_promotions(root,records))

if __name__=='__main__':unittest.main()
