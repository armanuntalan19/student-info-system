import re

# Only school emails are allowed
EMAIL_DOMAIN = "panpacificu.edu.ph"


# Student model: holds the data of one student
class Student:
    def __init__(self, student_id, name, age, course, email):
        self.student_id = student_id   # 7 digits, kept as text so zeros are not lost
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
        return Student(str(data["student_id"]), data["name"], data["age"],
                       data["course"], data["email"])

    # Check the student ID typed by the admin: exactly 7 digits
    @staticmethod
    def validate_id(value):
        # [0-9]{7} means: exactly 7 digits, nothing else
        if not re.fullmatch(r"[0-9]{7}", str(value).strip()):
            raise ValueError("student_id must be exactly 7 digits")

    # Check the other fields, raise an error if something is wrong
    @staticmethod
    def validate(data):
        for field in ["name", "age", "course", "email"]:   # none can be empty
            if not str(data.get(field, "")).strip():
                raise ValueError(field + " is required")
        if not str(data["age"]).isdigit() or not 1 <= int(data["age"]) <= 120:
            raise ValueError("age must be a number from 1 to 120")
        # name + @panpacificu.edu.ph, capital letters are allowed
        if not re.fullmatch(r"[^@\s]+@" + re.escape(EMAIL_DOMAIN),
                            data["email"].strip(), re.IGNORECASE):
            raise ValueError("email must end with @" + EMAIL_DOMAIN)
