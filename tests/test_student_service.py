import logging
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "src"))
from services.student_service import StudentService

# A correct student, reused by the tests below
GOOD = {"student_id": "2024001", "name": "Ana", "age": 20, "course": "BSIT",
        "email": "ana@panpacificu.edu.ph"}


class TestStudentService(unittest.TestCase):
    def setUp(self):
        # Use a temporary file so real data is not touched
        self.file = os.path.join(tempfile.mkdtemp(), "students.json")
        self.service = StudentService(self.file, logging.getLogger("test"))

    def test_add_and_get(self):
        added = self.service.add(GOOD)            # add, then read it back
        self.assertEqual(self.service.get(added["student_id"])["name"], "Ana")

    def test_update(self):
        added = self.service.add(GOOD)
        updated = self.service.update(added["student_id"], dict(GOOD, name="Ben"))
        self.assertEqual(updated["name"], "Ben")

    def test_delete(self):
        added = self.service.add(GOOD)
        self.service.delete(added["student_id"])
        self.assertEqual(self.service.get_all(), [])   # the list is empty again

    def test_invalid_email(self):
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, email="wrong"))

    def test_search(self):
        self.service.add(GOOD)
        self.assertEqual(len(self.service.get_all("ana")), 1)
        self.assertEqual(len(self.service.get_all("xyz")), 0)

    def test_delete_not_found(self):
        with self.assertRaises(LookupError):      # must raise an error
            self.service.delete("9999999")

    def test_admin_id_is_used(self):
        added = self.service.add(dict(GOOD, student_id="0012345"))
        self.assertEqual(added["student_id"], "0012345")   # leading zeros are kept

    def test_duplicate_id(self):
        self.service.add(GOOD)
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, name="Ben"))

    def test_id_must_be_7_digits(self):
        # too short, too long, letters, empty and with a space
        for bad_id in ["abc", "", "123456", "12345678", "12 4567"]:
            with self.assertRaises(ValueError):
                self.service.add(dict(GOOD, student_id=bad_id))

    def test_email_must_be_school_email(self):
        with self.assertRaises(ValueError):
            self.service.add(dict(GOOD, email="ana@gmail.com"))

    def test_broken_file_is_backed_up(self):
        with open(self.file, "w") as f:
            f.write("{ not json")
        self.assertEqual(self.service.get_all(), [])
        self.assertTrue(os.path.exists(self.file + ".bak"))


if __name__ == "__main__":
    unittest.main()
