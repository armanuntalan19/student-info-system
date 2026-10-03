// Show the numbers and the latest students
const students = getStudents();

document.getElementById("total").textContent = students.length;

// Count the different courses
const courses = new Set(students.map(s => s.course.toLowerCase()));
document.getElementById("courses").textContent = courses.size;

// Average age (rounded)
const totalAge = students.reduce((sum, s) => sum + s.age, 0);
document.getElementById("avgAge").textContent = students.length ? Math.round(totalAge / students.length) : "-";

// Last 5 students added
const recent = document.getElementById("recent");
if (students.length === 0) {
  recent.innerHTML = '<p class="empty">No students yet. Click "Add Student" to start.</p>';
} else {
  recent.innerHTML = students.slice(-5).reverse().map(s => `
    <div class="recent-item">
      <div class="avatar">${clean(s.name.charAt(0).toUpperCase())}</div>
      <div><strong>${clean(s.name)}</strong><small>ID ${s.student_id} - ${clean(s.course)}</small></div>
    </div>`).join("");
}
