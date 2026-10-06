const list = document.getElementById("studentList");
const message = document.getElementById("message");
const count = document.getElementById("count");

// Show students in the table (with search)
function loadStudents() {
  const search = document.getElementById("search").value.toLowerCase();
  // Keep only the matching students
  const students = getStudents().filter(s =>
    s.name.toLowerCase().includes(search) ||
    s.course.toLowerCase().includes(search) ||
    s.student_id.includes(search));

  list.innerHTML = students.map(s => `<tr>
      <td data-label="ID"><span class="chip">${s.student_id}</span></td>
      <td data-label="Name"><strong>${clean(s.name)}</strong></td>
      <td data-label="Age">${s.age}</td>
      <td data-label="Course"><span class="chip chip-orange">${clean(s.course)}</span></td>
      <td data-label="Email">${clean(s.email)}</td>
      <td data-label="Actions">
        <a class="btn btn-edit" href="edit.html?id=${s.student_id}"><i class="ti ti-pencil"></i>Edit</a>
        <button class="btn btn-delete" data-id="${s.student_id}"><i class="ti ti-trash"></i>Delete</button>
      </td>
    </tr>`).join("");

  count.textContent = students.length + " student(s)";
  // Show a message with an icon when nothing matches
  message.innerHTML = students.length === 0 ? '<i class="ti ti-mood-empty"></i>No students found.' : "";
  message.className = "message empty";
}

// Delete a student after asking first
function deleteStudent(id) {
  if (!confirm("Delete this student?")) return;
  saveStudents(getStudents().filter(s => s.student_id !== id));
  loadStudents();
}

// Delete button clicks (one listener for the whole table)
list.addEventListener("click", e => {
  const button = e.target.closest("[data-id]");
  if (button) deleteStudent(button.dataset.id);
});

document.getElementById("search").addEventListener("input", loadStudents);
loadStudents();
