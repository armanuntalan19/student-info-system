import json
import os
from models.student import Student


# Service: does all the work with the students (CRUD)
class StudentService:
    def __init__(self, data_file, logger):
        self.data_file = data_file
        self.logger = logger

    # Read all students from the JSON file
    def _load(self):
        if not os.path.exists(self.data_file):
            return []
        try:
            with open(self.data_file, "r") as f:
                return [Student.from_dict(d) for d in json.load(f)]
        except (json.JSONDecodeError, KeyError, TypeError):
            # Save a copy of the broken file so nothing is lost
            os.replace(self.data_file, self.data_file + ".bak")
            self.logger.error("Data file is broken, backup saved as .bak")
            return []

    # Save all students to the JSON file.
    # Write to a temp file first, then swap it in, so a crash while
    # saving can never leave a half-written data file.
    def _save(self, students):
        temp_file = self.data_file + ".tmp"
        with open(temp_file, "w") as f:
            json.dump([s.to_dict() for s in students], f, indent=2)
        os.replace(temp_file, self.data_file)

    # Create (the admin types the student ID, it must be new)
    def add(self, data):
        Student.validate_id(data.get("student_id", ""))
        Student.validate(data)
        students = self._load()
        student_id = int(data["student_id"])
        if any(s.student_id == student_id for s in students):
            raise ValueError("student_id " + str(student_id) + " already exists")
        student = Student(student_id, data["name"].strip(), int(data["age"]),
                          data["course"].strip(), data["email"].strip())
        students.append(student)
        self._save(students)
        self.logger.info("Added student %s", student_id)
        return student.to_dict()

    # Read all (with optional search)
    def get_all(self, search=""):
        search = search.lower()
        return [s.to_dict() for s in self._load()
                if search in s.name.lower() or search in s.course.lower()]

    # Read one
    def get(self, student_id):
        for s in self._load():
            if s.student_id == student_id:
                return s.to_dict()
        raise LookupError("Student not found")

    # Update (the student ID itself cannot be changed)
    def update(self, student_id, data):
        Student.validate(data)
        students = self._load()
        for s in students:
            if s.student_id == student_id:
                s.name = data["name"].strip()
                s.age = int(data["age"])
                s.course = data["course"].strip()
                s.email = data["email"].strip()
                self._save(students)
                self.logger.info("Updated student %s", student_id)
                return s.to_dict()
        raise LookupError("Student not found")

    # Delete
    def delete(self, student_id):
        students = self._load()
        remaining = [s for s in students if s.student_id != student_id]
        if len(remaining) == len(students):
            raise LookupError("Student not found")
        self._save(remaining)
        self.logger.info("Deleted student %s", student_id)
