from utils.config import load_config
from utils.logger import setup_logger
from services.student_service import StudentService
from models.student import Student

config = load_config()                                  # read config/config.json
logger = setup_logger(config["log_file"])               # logs go to logs/app.log
service = StudentService(config["data_file"], logger)   # does all the student work


# Show a list of students
def show(students):
    if not students:                          # empty list
        print("No students found.")
    for s in students:                        # one line per student
        print(f"{s['student_id']}. {s['name']} | {s['age']} | {s['course']} | {s['email']}")


# Ask for the student details (the ID is only asked when adding)
def ask_details(ask_student_id=False):
    details = {}
    if ask_student_id:                        # only when adding a new student
        details["student_id"] = input("Student ID (7 digits): ")
    details["name"] = input("Name: ")
    details["age"] = input("Age: ")
    details["course"] = input("Course: ")
    details["email"] = input("Email (name@panpacificu.edu.ph): ")
    return details


# Ask for a student id (must be exactly 7 digits)
def ask_id():
    student_id = input("Student ID (7 digits): ").strip()   # remove extra spaces
    Student.validate_id(student_id)                          # error if not 7 digits
    return student_id


# Menu choices
def add():
    service.add(ask_details(ask_student_id=True))
    print("Student added!")


def view():
    show(service.get_all())


def update():
    student_id = ask_id()
    old = service.get(student_id)             # error if the student does not exist
    print("Current:", old["name"], old["age"], old["course"], old["email"])
    service.update(student_id, ask_details())
    print("Student updated!")


def delete():
    service.delete(ask_id())
    print("Student deleted!")


def search():
    show(service.get_all(input("Search name or course: ")))


# Each menu number runs one function
MENU = {"1": add, "2": view, "3": update, "4": delete, "5": search}


def main():
    logger.info("App started")
    while True:                               # keep showing the menu until 0
        print("\n=== Student Information System ===")
        print("1. Add  2. View  3. Update  4. Delete  5. Search  0. Exit")
        choice = input("Choose: ")
        if choice == "0":
            logger.info("App closed")
            break
        if choice not in MENU:                # wrong number typed
            print("Invalid choice.")
            continue
        try:
            MENU[choice]()                    # run the chosen function
        except (ValueError, LookupError) as e:   # input or not-found errors
            logger.warning("Rejected: %s", e)
            print("Error:", e)
        except Exception:                        # any other error
            logger.exception("Unexpected error")
            print("Something went wrong. Check logs/app.log")


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):   # Ctrl+C or Ctrl+Z
        print("\nGoodbye!")
