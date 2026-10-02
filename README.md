# Student Information System

A simple system to manage student records (add, view, update, delete).
Data is saved in JSON format. It has two versions:

1. **Console app** (Python) - menu in the terminal
2. **Web version** (HTML, CSS, JS) - in the `docs/` folder

## Features
- Add, view, update and delete students
- Search students
- Data validation
- Config file and log file
- Unit tests
- Export students to JSON (web version)

## Project Structure
```
src/     -> Python code (models, services, utils, main.py)
docs/    -> Web version (HTML, CSS, JS)
data/    -> students.json
config/  -> config.json
logs/    -> app.log
tests/   -> unit tests
```

## How to Run the Console App
Only Python 3 is needed.
```
python src/main.py
```

## How to Run the Web Version
Open `docs/index.html` in your browser.

## Run Tests
```
python -m unittest discover tests
```
