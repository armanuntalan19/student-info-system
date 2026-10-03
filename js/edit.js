// Get the student id from the web address (edit.html?id=1001)
const id = Number(new URLSearchParams(window.location.search).get("id"));
const students = getStudents();
const current = students.find(s => s.student_id === id);

// Fill the form with the current data (the ID cannot be changed)
if (current) {
  document.getElementById("student_id").value = current.student_id;
  document.getElementById("name").value = current.name;
  document.getElementById("age").value = current.age;
  document.getElementById("course").value = current.course;
  document.getElementById("email").value = current.email;
} else {
  showMessage("Student not found", "error");
}

// When Save is clicked, update the student
document.getElementById("saveBtn").addEventListener("click", () => {
  if (!current) return;
  const result = readForm();
  if (result.error) return showMessage(result.error, "error");

  Object.assign(current, result.student);
  saveStudents(students);
  window.location.href = "students.html";
});
