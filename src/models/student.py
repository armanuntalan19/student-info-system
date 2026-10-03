# Student model: holds the data of one student
class Student:
    def __init__(self, student_id, name, age, course, email):
        self.student_id = student_id
        self.name = name
        self.age = age
        self.course = course
        self.email = email

    # Turn the student into a dictionary (for JSON)
    def to_dict(self):
        return {"student_id": self.student_id, "name": self.name,
                "age": self.age, "course": self.course, "email": self.email}

    # Make a student from a dictionary
    @staticmethod
    def from_dict(data):
        return Student(data["student_id"], data["name"], data["age"],
                       data["course"], data["email"])

    # Check the student ID typed by the admin (digits only, up to 12 digits)
    @staticmethod
    def validate_id(value):
        text = str(value).strip()
        if not text:
            raise ValueError("student_id is required")
        if not text.isdigit() or len(text) > 12 or int(text) < 1:
            raise ValueError("student_id must be a number (digits only)")

    # Check the other fields, raise an error if something is wrong
    @staticmethod
    def validate(data):
        for field in ["name", "age", "course", "email"]:
            if not str(data.get(field, "")).strip():
                raise ValueError(field + " is required")
        if not str(data["age"]).isdigit() or not 1 <= int(data["age"]) <= 120:
            raise ValueError("age must be a number from 1 to 120")
        email = data["email"].strip()
        if "@" not in email or "." not in email.split("@")[-1]:
            raise ValueError("email is not valid")
