# Student Information System

A simple system to manage student records (add, view, update, delete).
Data is saved in JSON format. It has two versions:

1. **Console app** (Python) - menu in the terminal
2. **Web version** (HTML, CSS, JS) - runs in the browser and is hosted with GitHub Pages

## Live Demo
https://armanuntalan19.github.io/student-info-system/

## Features
- Add, view, update and delete students
- The admin types the **Student ID**: exactly 7 digits, and it must be new
- Search students (by ID, name or course)
- Data validation (required fields, 7-digit ID, age 1 to 120, email must end with `@panpacificu.edu.ph`)
- Config file (`config/config.json`) and log file (`logs/app.log`)
- Error handling and error recovery (a broken data file is backed up as `.bak`, saving uses a temp file)
- Unit tests
- Export students to JSON (web version and console menu option 6)
- Responsive web design (phone, iPad and desktop) with a sidebar toggle button
- Logs are written to logs/app.log when the app runs (not uploaded to GitHub)

## Project Structure
```
src/        -> Python code
  models/   -> Student model
  services/ -> Student service (add, view, update, delete, search)
  utils/    -> config loader and logger
  main.py   -> console menu
data/       -> students.json (used by the console app)
config/     -> config.json (file paths; defaults are used if the file is missing)
logs/       -> app.log
tests/      -> unit tests
css/        -> style.css (page) and nav.css (sidebar)
js/         -> one JS file per page, plus storage.js and sidebar.js
images/     -> logo1.png (site logo and browser tab icon)
index.html, students.html, add.html, edit.html -> web pages
```

## How to Run the Console App
Only Python 3 is needed. Nothing to install.
```
python src/main.py
```

## How to Run the Web Version
Open `index.html` in your browser. The web version saves students in the browser
(localStorage), because GitHub Pages has no server. Use **Export JSON** in the
sidebar to download the data.

To publish it: GitHub repo -> **Settings -> Pages** -> Branch `main`, folder `/ (root)` -> Save.

## Run Tests
```
python -m unittest discover tests
```

## Git Workflow
Each change was made on a feature branch (for example `feature-readme`,
`feature-validation`, `feature-unit-tests`) and merged into `main` with a Pull Request.