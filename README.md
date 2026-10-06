# Student Information System

A simple system to manage student records (add, view, update, delete).
The app saves students in JSON format and has two versions:

1. Console app (Python) with a menu in the terminal
2. Web version (HTML, CSS, JS) in the browser, hosted on GitHub Pages

## Live Demo
https://armanuntalan19.github.io/student-info-system/

## Features
- Add, view, update and delete students
- The admin types the Student ID. The ID needs exactly 7 digits and must be new
- Search students by ID, name or course
- Data validation (required fields, 7-digit ID, age 1 to 120, email ending in `@panpacificu.edu.ph`)
- Config file (`config/config.json`) and log file (`logs/app.log`). Git does not upload the log file.
- Error handling and recovery. The app backs up a broken data file as `.bak`, saves through a temp file, and handles Ctrl+Z and Ctrl+C
- 11 unit tests
- Export students to JSON (web version and console menu option 6)
- Responsive web design for phone, iPad and desktop with one shared sidebar and a toggle button

## Project Structure
```
src/        -> Python code
  models/   -> Student model
  services/ -> Student service (add, view, update, delete, search)
  utils/    -> config loader and logger
  main.py   -> console menu
data/       -> students.json (used by the console app)
config/     -> config.json (file paths, the app uses defaults if the file is missing)
logs/       -> app.log
tests/      -> unit tests
css/        -> style.css (page) and nav.css (sidebar)
js/         -> one JS file per page, plus storage.js and sidebar.js
images/     -> logo1.png (site logo and browser tab icon)
index.html, students.html, add.html, edit.html -> web pages
```

## How to Run the Console App
The console app needs only Python 3. Nothing to install.
```
python src/main.py
```

## How to Run the Web Version
Open `index.html` in your browser. The web version saves students in the browser
(localStorage), because GitHub Pages has no server. Use Export JSON in the
sidebar to download the data.

## Run Tests
```
python -m unittest discover tests
```

## Git Workflow
I made most changes on a feature branch (for example `feature-readme`,
`feature-validation`, `feature-unit-tests`) and merged each branch into `main` with a Pull Request.
The repository has 10 merged pull requests.