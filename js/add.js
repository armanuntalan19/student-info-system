// When the user clicks Save, add the student
document.getElementById("saveBtn").addEventListener("click", () => {
  const result = readForm(); // get the form values or an error message
  if (result.error) return showMessage(result.error, "error");

  // The admin types the ID. Stop if another student has the ID.
  const students = getStudents();
  if (students.some(s => s.student_id === result.student.student_id)) {
    return showMessage("Student ID " + result.student.student_id + " already exists", "error");
  }

  students.push(result.student);
  saveStudents(students);

  showMessage("Student added!", "success");
  document.querySelectorAll("input").forEach(i => (i.value = ""));  // clear the form
});
