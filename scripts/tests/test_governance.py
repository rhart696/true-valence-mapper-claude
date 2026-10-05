import copy
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('governance', Path(__file__).parents[1] / 'check-governance.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class GovernanceTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'record.md').write_text('fixture')
        def record(rid, kind):
            return dict(id=rid, kind=kind, title='fixture', path='record.md', status='specified',
                        currency='authoritative', owner='fixture', created='2026-10-05', last_reviewed='2026-10-05',
                        related=[], supersedes=[], superseded_by=[])
        source = record('SRC-0001', 'source')
        source.update(verification='captured', claim_supported='user direction', limitations='fixture', source_type='user-direction')
        req = record('REQ-0001', 'requirement')
        req.update(acceptance='defined', validation_plan='defined')
        self.data = dict(schema_version=1, records=[source, req, record('DEC-0001', 'decision'), record('TEST-0001', 'test')])
        self.name = 'docs/governance/changes/CHG-0001.json'
        self.manifest = dict(id='CHG-0001', change_type='governance', summary='fixture', rationale='fixture',
                             owner='fixture', date='2026-10-05', validation='fixture', paths=['record.md', self.name],
                             requirements=['REQ-0001'], decisions=['DEC-0001'], evidence=['SRC-0001'], tests=['TEST-0001'],
                             risks=[], risk_disposition='no client-data change')

    def check(self, changed=None, active=None):
        return module.validate(self.root, self.data, {self.name: self.manifest}, changed, active)[0]

    def test_complete_context_passes(self):
        self.assertEqual([], self.check(['record.md', self.name], [self.name]))

    def test_unlinked_new_behavior_fails(self):
        self.assertTrue(any('Unlinked changed path' in e for e in self.check(['v1/src/new.ts'], [self.name])))

    def test_historical_manifest_cannot_cover_new_change(self):
        self.assertTrue(any('no new/updated' in e for e in self.check(['record.md'], [])))

    def test_dangling_context_fails(self):
        self.manifest['decisions'] = ['DEC-9999']
        self.assertTrue(any('missing context' in e for e in self.check()))

    def test_record_links_and_duplicate_ids_fail(self):
        self.data['records'][1]['related'] = ['CLM-9999']
        self.data['records'].append(copy.deepcopy(self.data['records'][1]))
        result = self.check()
        self.assertTrue(any('dangling' in e for e in result))
        self.assertTrue(any('Duplicate' in e for e in result))

    def test_path_escape_fails(self):
        self.data['records'][1]['path'] = '../outside.md'
        self.manifest['paths'] = ['../outside.md']
        self.assertTrue(any('unsafe' in e for e in self.check()))

    def test_verified_requirement_needs_passing_result(self):
        self.data['records'][1].update(status='verified', verified_by=['TEST-0001'])
        self.assertTrue(any('not a passed test' in e for e in self.check()))
        self.data['records'][3]['status'] = 'passed'
        self.assertEqual([], self.check())

    def test_editorial_exemption_cannot_cover_code(self):
        self.manifest.update(change_type='editorial', editorial_reason='typo', paths=['v1/src/new.ts'])
        self.assertTrue(any('editorial exemption' in e for e in self.check()))

    def test_wrong_context_type_fails(self):
        self.manifest['requirements'] = ['SRC-0001']
        self.assertTrue(any('wrong requirements kind' in e for e in self.check()))


if __name__ == '__main__':
    unittest.main()
