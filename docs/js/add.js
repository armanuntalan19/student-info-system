// When Save is clicked, add the student
document.getElementById("saveBtn").addEventListener("click", () => {
  const result = readForm();
  if (result.error) return showMessage(result.error, "error");

  const students = getStudents();
  // New id = biggest id + 1
  result.student.student_id = Math.max(0, ...students.map(s => s.student_id)) + 1;
  students.push(result.student);
  saveStudents(students);

  showMessage("Student added!", "success");
  document.querySelectorAll("input").forEach(i => (i.value = ""));
});
