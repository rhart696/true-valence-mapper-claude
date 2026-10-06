import copy
import importlib.util
import json
from pathlib import Path
import unittest
spec=importlib.util.spec_from_file_location('activation',Path(__file__).parents[1]/'check-enforcement-activation.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class ActivationTests(unittest.TestCase):
    def setUp(self):
        self.expected=json.loads((Path(__file__).parents[2]/'docs/governance/github-ruleset.json').read_text())
        self.live=copy.deepcopy(self.expected['rules'])
    def test_exact_rules_pass(self):self.assertEqual([],m.validate(self.live,self.expected))
    def test_empty_rules_fail(self):self.assertTrue(m.validate([],self.expected))
    def test_any_source_status_is_not_trusted(self):
        self.live[-1]['parameters']['required_status_checks'][0]['integration_id']=None
        self.assertTrue(m.validate(self.live,self.expected))
    def test_stale_review_allowed_fails(self):
        self.live[-2]['parameters']['dismiss_stale_reviews_on_push']=False
        self.assertTrue(m.validate(self.live,self.expected))
    def test_no_approval_fails(self):
        self.live[-2]['parameters']['required_approving_review_count']=0
        self.assertTrue(m.validate(self.live,self.expected))
if __name__=='__main__':unittest.main()
