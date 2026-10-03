// When Save is clicked, add the student
document.getElementById("saveBtn").addEventListener("click", () => {
  const result = readForm();
  if (result.error) return showMessage(result.error, "error");

  // The admin types the ID, so make sure nobody else has it
  const students = getStudents();
  if (students.some(s => s.student_id === result.student.student_id)) {
    return showMessage("Student ID " + result.student.student_id + " already exists", "error");
  }

  students.push(result.student);
  saveStudents(students);

  showMessage("Student added!", "success");
  document.querySelectorAll("input").forEach(i => (i.value = ""));
});
