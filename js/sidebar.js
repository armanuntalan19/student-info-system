// Pages shown in the sidebar
const NAV_LINKS = [
  { key: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard", href: "index.html" },
  { key: "students", label: "View Students", icon: "ti-users", href: "students.html" },
  { key: "add", label: "Add Student", icon: "ti-user-plus", href: "add.html" }
];

// Build the sidebar and put it in the page
function initSidebar() {
  const nav = document.getElementById("nav");
  if (!nav) return;   // this page has no sidebar

  // Each page sets <body data-page="..."> so we know which link is active
  const activePage = document.body.dataset.page;

  // Make one link for each page in NAV_LINKS
  const linksHtml = NAV_LINKS.map(item => `
    <a class="nav-link ${activePage === item.key ? "active" : ""}" href="${item.href}">
      <i class="ti ${item.icon}"></i><span class="label">${item.label}</span>
    </a>`).join("");

  // Put the sidebar HTML inside <nav id="nav">
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
  const overlay = document.getElementById("overlay");   // dark area behind the open menu

  // The toggle button:
  // - on a computer it makes the sidebar small (icons only) or big again
  // - on a tablet or phone it opens and closes the sidebar
  function toggleMenu() {
    if (window.innerWidth <= 900) {
      nav.classList.toggle("open");        // slide in or out
      overlay.classList.toggle("show");
    } else {
      nav.classList.toggle("collapsed");   // small or big
    }
  }
  const menuBtn = document.getElementById("menuBtn");
  menuBtn.innerHTML = '<i class="ti ti-layout-sidebar-left-collapse"></i>';   // same icon as the toggle

  document.getElementById("toggleBtn").addEventListener("click", toggleMenu);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Escape key closes the menu on tablet and phone
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

  // Delete all students
  document.getElementById("clearBtn").addEventListener("click", () => {
    if (!confirm("Delete ALL students?")) return;
    saveStudents([]);              // save an empty list
    window.location.reload();      // refresh the page
  });
}

initSidebar();