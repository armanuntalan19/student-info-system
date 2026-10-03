// When Save is clicked, add the student
document.getElementById("saveBtn").addEventListener("click", () => {
  const result = readForm();   // get the form values, or an error
  if (result.error) return showMessage(result.error, "error");

  // The admin types the ID, so make sure nobody else has it
  const students = getStudents();
  if (students.some(s => s.student_id === result.student.student_id)) {
    return showMessage("Student ID " + result.student.student_id + " already exists", "error");
  }

  students.push(result.student);   // add to the list
  saveStudents(students);          // save the list in the browser

  showMessage("Student added!", "success");
  document.querySelectorAll("input").forEach(i => (i.value = ""));   // clear the form
});
