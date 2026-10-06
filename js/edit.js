// Read the student ID from the web address (edit.html?id=2024001)
const id = new URLSearchParams(window.location.search).get("id");
const students = getStudents();
const current = students.find(s => s.student_id === id);

// Fill the form with the current data. The ID stays the same.
if (current) {
  document.getElementById("student_id").value = current.student_id;
  document.getElementById("name").value = current.name;
  document.getElementById("age").value = current.age;
  document.getElementById("course").value = current.course;
  document.getElementById("email").value = current.email;
} else {
  showMessage("Student not found", "error");
}

// When the user clicks Save, update the student
document.getElementById("saveBtn").addEventListener("click", () => {
  if (!current) return;
  const result = readForm();
  if (result.error) return showMessage(result.error, "error");

  Object.assign(current, result.student);  // copy the new values into the student
  saveStudents(students);
  window.location.href = "students.html";  // go back to the list
});
