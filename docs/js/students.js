const list = document.getElementById("studentList");
const message = document.getElementById("message");

// Stop HTML tags in names from running as code
function clean(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Show students in the table (with search)
function loadStudents() {
  const search = document.getElementById("search").value.toLowerCase();
  const students = getStudents().filter(s =>
    s.name.toLowerCase().includes(search) || s.course.toLowerCase().includes(search));

  list.innerHTML = "";
  students.forEach(s => {
    list.innerHTML += `<tr>
      <td>${s.student_id}</td>
      <td>${clean(s.name)}</td>
      <td>${s.age}</td>
      <td>${clean(s.course)}</td>
      <td>${clean(s.email)}</td>
      <td>
        <a class="btn btn-edit" href="edit.html?id=${s.student_id}">Edit</a>
        <button class="btn btn-delete" data-id="${s.student_id}">Delete</button>
      </td>
    </tr>`;
  });
  message.textContent = students.length === 0 ? "No students found." : "";
}

// Delete a student after asking first
function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;
  saveStudents(getStudents().filter(s => s.student_id !== id));
  loadStudents();
}

// Delete button clicks (one listener for the whole table)
list.addEventListener("click", e => {
  if (e.target.dataset.id) deleteStudent(Number(e.target.dataset.id));
});

document.getElementById("search").addEventListener("input", loadStudents);
loadStudents();
