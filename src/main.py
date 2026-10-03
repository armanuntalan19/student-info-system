from utils.config import load_config
from utils.logger import setup_logger
from services.student_service import StudentService

config = load_config()
logger = setup_logger(config["log_file"])
service = StudentService(config["data_file"], logger)


# Show a list of students
def show(students):
    if not students:
        print("No students found.")
    for s in students:
        print(f"{s['student_id']}. {s['name']} | {s['age']} | {s['course']} | {s['email']}")


# Ask for the student details (the ID is only asked when adding)
def ask_details(ask_student_id=False):
    details = {}
    if ask_student_id:
        details["student_id"] = input("Student ID: ")
    details["name"] = input("Name: ")
    details["age"] = input("Age: ")
    details["course"] = input("Course: ")
    details["email"] = input("Email: ")
    return details


# Ask for a student id (must be a number)
def ask_id():
    text = input("Student ID: ")
    if not text.isdigit():
        raise ValueError("ID must be a number")
    return int(text)


# Menu choices
def add():
    service.add(ask_details(ask_student_id=True))
    print("Student added!")


def view():
    show(service.get_all())


def update():
    student_id = ask_id()
    old = service.get(student_id)
    print("Current:", old["name"], old["age"], old["course"], old["email"])
    service.update(student_id, ask_details())
    print("Student updated!")


def delete():
    service.delete(ask_id())
    print("Student deleted!")


def search():
    show(service.get_all(input("Search name or course: ")))


MENU = {"1": add, "2": view, "3": update, "4": delete, "5": search}


def main():
    logger.info("App started")
    while True:
        print("\n=== Student Information System ===")
        print("1. Add  2. View  3. Update  4. Delete  5. Search  0. Exit")
        choice = input("Choose: ")
        if choice == "0":
            logger.info("App closed")
            break
        if choice not in MENU:
            print("Invalid choice.")
            continue
        try:
            MENU[choice]()
        except (ValueError, LookupError) as e:   # input or not-found errors
            print("Error:", e)
        except Exception:                        # any other error
            logger.exception("Unexpected error")
            print("Something went wrong. Check logs/app.log")


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):   # Ctrl+C or Ctrl+Z
        print("\nGoodbye!")
