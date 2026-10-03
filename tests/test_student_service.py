import logging
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
from services.student_service import StudentService

GOOD = {"student_id": 1001, "name": "Ana", "age": 20, "course": "BSIT", "email": "ana@mail.com"}


class TestStudentService(unittest.TestCase):
    def setUp(self):
        # Use a temporary file so real data is not touched
        self.file = os.path.join(tempfile.mkdtemp(), "students.json")
        self.service = StudentService(self.file, logging.getLogger("test"))

    def test_add_and_get(self):
        added = self.service.add(GOOD)
        self.assertEqual(self.service.get(added["student_id"])["name"], "Ana")

    def test_update(self):
        added = self.service.add(GOOD)
        updated = self.service.update(added["student_id"], dict(GOOD, name="Ben"))
        self.assertEqual(updated["name"], "Ben")

    def test_delete(self):
        added = self.service.add(GOOD)
        self.service.delete(added["student_id"])
        self.assertEqual(self.service.get_all(), [])

    def test_invalid_email(self):
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, email="wrong"))

    def test_search(self):
        self.service.add(GOOD)
        self.assertEqual(len(self.service.get_all("ana")), 1)
        self.assertEqual(len(self.service.get_all("xyz")), 0)

    def test_delete_not_found(self):
        with self.assertRaises(LookupError):
            self.service.delete(999)

    def test_admin_id_is_used(self):
        added = self.service.add(dict(GOOD, student_id="20240001"))
        self.assertEqual(added["student_id"], 20240001)

    def test_duplicate_id(self):
        self.service.add(GOOD)
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, name="Ben"))

    def test_invalid_id(self):
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, student_id="abc"))
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, student_id=""))

    def test_broken_file_is_backed_up(self):
        with open(self.file, "w") as f:
            f.write("{ not json")
        self.assertEqual(self.service.get_all(), [])
        self.assertTrue(os.path.exists(self.file + ".bak"))


if __name__ == "__main__":
    unittest.main()
