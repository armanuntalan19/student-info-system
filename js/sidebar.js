// Pages shown in the sidebar
const NAV_LINKS = [
  { key: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard", href: "index.html" },
  { key: "students", label: "View Students", icon: "ti-users", href: "students.html" },
  { key: "add", label: "Add Student", icon: "ti-user-plus", href: "add.html" }
];

// Build the sidebar and put it in the page
function initSidebar() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  // Each page sets <body data-page="..."> so we know which link is active
  const activePage = document.body.dataset.page;

  const linksHtml = NAV_LINKS.map(item => `
    <a class="nav-link ${activePage === item.key ? "active" : ""}" href="${item.href}">
      <i class="ti ${item.icon}"></i><span>${item.label}</span>
    </a>`).join("");

  nav.innerHTML = `
    <a class="nav-brand" href="index.html">
      <img src="images/logo1.png" alt="Logo">
      <div><strong>Student System</strong><small>Information System</small></div>
    </a>
    <div class="nav-links">${linksHtml}</div>
    <div class="nav-bottom">
      <button type="button" class="nav-btn" id="exportBtn"><i class="ti ti-download"></i>Export JSON</button>
      <button type="button" class="nav-btn danger" id="clearBtn"><i class="ti ti-trash"></i>Clear All Data</button>
      <div class="nav-user"><div class="nav-avatar">AD</div>Admin</div>
    </div>`;

  wireSidebar();
}

// Make the sidebar buttons work
function wireSidebar() {
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  // Open and close the sidebar (tablet and phone)
  function toggleMenu(open) {
    nav.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
  }
  document.getElementById("menuBtn").addEventListener("click", () => toggleMenu(true));
  overlay.addEventListener("click", () => toggleMenu(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") toggleMenu(false);
  });

  // Download all students as a JSON file
  document.getElementById("exportBtn").addEventListener("click", () => {
    const file = new Blob([JSON.stringify(getStudents(), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "students.json";
    link.click();
  });

  // Delete all students
  document.getElementById("clearBtn").addEventListener("click", () => {
    if (!confirm("Delete ALL students?")) return;
    saveStudents([]);
    window.location.reload();
  });
}

initSidebar();
