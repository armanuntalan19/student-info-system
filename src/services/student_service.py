import json
import os
from models.student import Student


# Does all the work with students: create, read, update, delete
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
            os.replace(self.data_file, self.data_file + ".bak")
            self.logger.error("Data file is broken, backup saved as .bak")
            return []

    # Save all students to the JSON file.
    # Write to a temp file first, then replace the real file.
    def _save(self, students):
        os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
        temp_file = self.data_file + ".tmp"
        with open(temp_file, "w") as f:
            json.dump([s.to_dict() for s in students], f, indent=2)
        os.replace(temp_file, self.data_file)

    # Create. The admin types the ID and the ID must be new.
    def add(self, data):
        Student.validate_id(data.get("student_id", ""))
        Student.validate(data)
        students = self._load()
        student_id = str(data["student_id"]).strip()
        if any(s.student_id == student_id for s in students):  # stop if another student has this ID
            raise ValueError("student_id " + student_id + " already exists")
        student = Student(student_id, data["name"].strip(), int(data["age"]),
                          data["course"].strip(), data["email"].strip().lower())
        students.append(student)
        self._save(students)
        self.logger.info("Added student %s", student_id)
        return student.to_dict()

    # Read all students, with an optional search
    def get_all(self, search=""):
        search = search.lower()
        return [s.to_dict() for s in self._load()
                if search in s.student_id or search in s.name.lower()
                or search in s.course.lower()]

    # Read one
    def get(self, student_id):
        for s in self._load():
            if s.student_id == str(student_id):
                return s.to_dict()
        raise LookupError("Student not found")

    # Update. The ID stays the same.
    def update(self, student_id, data):
        Student.validate(data)
        students = self._load()
        for s in students:
            if s.student_id == str(student_id):
                s.name = data["name"].strip()
                s.age = int(data["age"])
                s.course = data["course"].strip()
                s.email = data["email"].strip().lower()
                self._save(students)
                self.logger.info("Updated student %s", student_id)
                return s.to_dict()
        raise LookupError("Student not found")

    # Export all students to another JSON file
    def export(self, path):
        with open(path, "w") as f:
            json.dump([s.to_dict() for s in self._load()], f, indent=2)
        self.logger.info("Exported students to %s", path)

    # Delete
    def delete(self, student_id):
        students = self._load()
        remaining = [s for s in students if s.student_id != str(student_id)]
        if len(remaining) == len(students):
            raise LookupError("Student not found")
        self._save(remaining)
        self.logger.info("Deleted student %s", student_id)
