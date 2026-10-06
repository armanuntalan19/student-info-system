// Pages shown in the sidebar
const NAV_LINKS = [
  { key: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard", href: "index.html" },
  { key: "students", label: "View Students", icon: "ti-users", href: "students.html" },
  { key: "add", label: "Add Student", icon: "ti-user-plus", href: "add.html" }
];

// Build the sidebar and add the menu to the page
function initSidebar() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  // Each page sets <body data-page="..."> to mark the active link
  const activePage = document.body.dataset.page;

  // Make one link for each page in NAV_LINKS
  const linksHtml = NAV_LINKS.map(item => `
    <a class="nav-link ${activePage === item.key ? "active" : ""}" href="${item.href}">
      <i class="ti ${item.icon}"></i><span class="label">${item.label}</span>
    </a>`).join("");

  nav.innerHTML = `
    <button type="button" class="nav-toggle" id="toggleBtn" aria-label="Toggle menu"><i class="ti ti-layout-sidebar-left-collapse"></i></button>
    <a class="nav-brand" href="index.html">
      <img src="images/logo1.png" alt="Logo">
      <div class="label"><strong>Student System</strong><small>Information System</small></div>
    </a>
    <div class="nav-links">${linksHtml}</div>
    <div class="nav-bottom">
      <button type="button" class="nav-btn" id="exportBtn"><i class="ti ti-download"></i><span class="label">Export JSON</span></button>
      <button type="button" class="nav-btn danger" id="clearBtn"><i class="ti ti-trash"></i><span class="label">Clear All Data</span></button>
      <div class="nav-user"><div class="nav-avatar">AD</div><span class="label">Admin</span></div>
    </div>`;

  wireSidebar();
}

// Make the sidebar buttons work
function wireSidebar() {
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");

  // The toggle button
  function toggleMenu() {
    if (window.innerWidth <= 900) {
      nav.classList.toggle("open");
      overlay.classList.toggle("show");
    } else {
      nav.classList.toggle("collapsed");
    }
  }
  const menuBtn = document.getElementById("menuBtn");
  menuBtn.innerHTML = '<i class="ti ti-layout-sidebar-left-collapse"></i>';

  document.getElementById("toggleBtn").addEventListener("click", toggleMenu);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("open")) toggleMenu();
  });

  // Download all students as a JSON file
  // (Blob = a file made in memory, link.click() starts the download)
  document.getElementById("exportBtn").addEventListener("click", () => {
    const file = new Blob([JSON.stringify(getStudents(), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "students.json";
    link.click();
  });

  // Delete all students after asking first
  document.getElementById("clearBtn").addEventListener("click", () => {
    if (!confirm("Delete ALL students?")) return;
    saveStudents([]);
    window.location.reload();
  });
}

initSidebar();