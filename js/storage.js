// Shared helpers: students are saved as JSON in the browser (localStorage)
const KEY = "students";

// Only school emails are allowed
const EMAIL_DOMAIN = "@panpacificu.edu.ph";

// Get all students (sorted by ID)
function getStudents() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY)) || [];   // nothing saved yet = empty list
    list.forEach(s => (s.student_id = String(s.student_id))); // IDs are text
    return list.sort((a, b) => a.student_id.localeCompare(b.student_id));
  } catch (e) {
    return []; // saved data was broken, start empty
  }
}

// Save all students
function saveStudents(list) {
  localStorage.setItem(KEY, JSON.stringify(list));   // list -> text -> browser
}

// Stop HTML tags in names from running as code
function clean(text) {
  const div = document.createElement("div");
  div.textContent = text;   // textContent shows tags as plain text
  return div.innerHTML;
}

// Read the form. Returns the student, or an error message
function readForm() {
  // Read every input box (trim() removes extra spaces)
  const s = {
    student_id: document.getElementById("student_id").value.trim(),
    name: document.getElementById("name").value.trim(),
    age: document.getElementById("age").value.trim(),
    course: document.getElementById("course").value.trim(),
    email: document.getElementById("email").value.trim()
  };
  // Check the rules one by one. The first problem found is returned
  if (!s.student_id || !s.name || !s.age || !s.course || !s.email) return { error: "All fields are required" };
  if (!/^[0-9]{7}$/.test(s.student_id)) return { error: "Student ID must be exactly 7 digits" };
  if (!Number.isInteger(Number(s.age))) return { error: "Age must be a whole number" };
  if (s.age < 1 || s.age > 120) return { error: "Age must be a number from 1 to 120" };
  if (!/^[^@\s]+@panpacificu\.edu\.ph$/i.test(s.email)) return { error: "Email must end with " + EMAIL_DOMAIN };
  s.email = s.email.toLowerCase();   // save emails in small letters
  s.age = Number(s.age);             // text -> number
  return { student: s };
}

// Show a message under the form
function showMessage(text, type) {
  const box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;   // type is "error" (red) or "success" (green)
}
