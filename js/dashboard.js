// Show the numbers and the latest students
const students = getStudents();

document.getElementById("total").textContent = students.length;

// Count the different courses
// A Set keeps each course only once
const courses = new Set(students.map(s => s.course.toLowerCase()));
document.getElementById("courses").textContent = courses.size;

// Average age (rounded)
const totalAge = students.reduce((sum, s) => sum + s.age, 0);   // add all ages together
document.getElementById("avgAge").textContent = students.length ? Math.round(totalAge / students.length) : "-";

// Last 5 students added
const recent = document.getElementById("recent");
if (students.length === 0) {
  recent.innerHTML = '<p class="empty"><i class="ti ti-users-group"></i>No students yet. Click "Add Student" to start.</p>';
} else {
  // slice(-5) = last 5, reverse() = newest first
  recent.innerHTML = students.slice(-5).reverse().map(s => `
    <div class="recent-item">
      <div class="avatar">${clean(s.name.charAt(0).toUpperCase())}</div>
      <div><strong>${clean(s.name)}</strong><small>${clean(s.course)}</small></div>
      <span class="chip">${s.student_id}</span>
    </div>`).join("");
}
