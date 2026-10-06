from utils.config import load_config
from utils.logger import setup_logger
from services.student_service import StudentService
from models.student import Student

config = load_config()
logger = setup_logger(config["log_file"])
service = StudentService(config["data_file"], logger)


def show(students):
    if not students:
        print("No students found.")
    for s in students:
        print(f"{s['student_id']}. {s['name']} | {s['age']} | {s['course']} | {s['email']}")


# Ask for the student details. Only adding asks for the ID.
def ask_details(ask_student_id=False):
    details = {}
    if ask_student_id:
        details["student_id"] = input("Student ID (7 digits): ")
    details["name"] = input("Name: ")
    details["age"] = input("Age: ")
    details["course"] = input("Course: ")
    details["email"] = input("Email (name@panpacificu.edu.ph): ")
    return details


# Ask for a student id (must be exactly 7 digits)
def ask_id():
    student_id = input("Student ID (7 digits): ").strip()
    Student.validate_id(student_id)
    return student_id


def add():
    service.add(ask_details(ask_student_id=True))
    print("Student added!")


def view():
    show(service.get_all())


def update():
    student_id = ask_id()
    old = service.get(student_id)  # raises an error if the ID does not exist
    print("Current:", old["name"], old["age"], old["course"], old["email"])
    service.update(student_id, ask_details())
    print("Student updated!")


def delete():
    service.delete(ask_id())
    print("Student deleted!")


def search():
    show(service.get_all(input("Search name or course: ")))

# Save all students to a new JSON file
def export():
    name = input("File name (press Enter for students_export.json): ").strip()
    service.export(name or "students_export.json")
    print("Exported!")
    
# Each menu number runs one function
MENU = {"1": add, "2": view, "3": update, "4": delete, "5": search, "6": export}


def main():
    logger.info("App started")
    while True:
        print("\n=== Student Information System ===")
        print("1. Add  2. View  3. Update  4. Delete  5. Search  6. Export  0. Exit")
        choice = input("Choose: ")
        if choice == "0":
            logger.info("App closed")
            break
        if choice not in MENU:
            print("Invalid choice.")
            continue
        try:
            MENU[choice]()
        except (ValueError, LookupError) as e:
            logger.warning("Rejected: %s", e)
            print("Error:", e)
        except (EOFError, KeyboardInterrupt):
            print("\nCancelled.")
        except Exception:
            logger.exception("Unexpected error")
            print("Something went wrong. Check logs/app.log")


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):   # Ctrl+C or Ctrl+Z at the menu
        print("\nGoodbye!")
