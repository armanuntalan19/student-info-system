// Shared helpers: students are saved as JSON in the browser (localStorage)
const KEY = "students";

// Get all students (sorted by ID)
function getStudents() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY)) || [];
    return list.sort((a, b) => a.student_id - b.student_id);
  } catch (e) {
    return []; // data was broken, start empty
  }
}

// Save all students
function saveStudents(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Stop HTML tags in names from running as code
function clean(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Read the form. Returns the student, or an error message
function readForm() {
  const s = {
    student_id: document.getElementById("student_id").value.trim(),
    name: document.getElementById("name").value.trim(),
    age: document.getElementById("age").value.trim(),
    course: document.getElementById("course").value.trim(),
    email: document.getElementById("email").value.trim()
  };
  if (!s.student_id || !s.name || !s.age || !s.course || !s.email) return { error: "All fields are required" };
  if (!/^[0-9]{1,12}$/.test(s.student_id) || Number(s.student_id) < 1) return { error: "Student ID must be a number (digits only)" };
  if (!Number.isInteger(Number(s.age))) return { error: "Age must be a whole number" };
  if (s.age < 1 || s.age > 120) return { error: "Age must be a number from 1 to 120" };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) return { error: "Email is not valid" };
  s.student_id = Number(s.student_id);
  s.age = Number(s.age);
  return { student: s };
}

// Show a message under the form
function showMessage(text, type) {
  const box = document.getElementById("message");
  box.textContent = text;
  box.className = "message " + type;
}
