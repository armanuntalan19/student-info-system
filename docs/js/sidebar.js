// Pages shown in the sidebar
const NAV_LINKS = [
  { key: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard", href: "index.html" },
  { key: "students", label: "View Students", icon: "ti-users", href: "students.html" },
  { key: "add", label: "Add Student", icon: "ti-user-plus", href: "add.html" }
];

const TITLE = "Student System";

// Build the sidebar and put it in the page
function initSidebar() {
  const placeholder = document.getElementById("sidebar-placeholder");
  if (!placeholder) return;

  // Each page sets <body data-page="..."> so we know which link is active
  const activePage = document.body.dataset.page;

  const linksHtml = NAV_LINKS.map(item => `
    <a class="sidebar-link ${activePage === item.key ? "active" : ""}" href="${item.href}">
      <i class="ti ${item.icon}"></i><span class="nav-label">${item.label}</span>
    </a>`).join("");

  placeholder.innerHTML = `
    <nav class="sidebar" id="sidebar">
      <div class="sidebar-top">
        <a href="index.html" class="sidebar-brand">
          <div class="sidebar-logo"><i class="ti ti-school"></i></div>
          <div class="sidebar-brand-text">
            <div class="sidebar-brand-title">${TITLE}</div>
            <div class="sidebar-brand-sub">Information System</div>
          </div>
        </a>
      </div>

      <div class="sidebar-nav">${linksHtml}</div>

      <div class="sidebar-bottom">
        <button type="button" class="nav-action-btn" id="exportBtn">
          <i class="ti ti-download"></i><span class="nav-label">Export JSON</span>
        </button>

        <div class="nav-user" id="navUser">
          <div class="nav-avatar">AD</div>
          <span class="nav-user-name">Admin</span>
          <i class="ti ti-chevron-down chevron"></i>
          <div class="nav-dropdown" id="navDropdown">
            <button type="button" id="clearBtn"><i class="ti ti-trash"></i> Clear All Data</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="sidebar-toggle-bar">
      <div class="brand-mini"><i class="ti ti-school"></i> ${TITLE}</div>
      <button type="button" class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
        <i class="ti ti-layout-sidebar-left-collapse"></i>
      </button>
    </div>`;

  document.body.classList.add("has-sidebar");
  wireSidebar();
}

// Make the sidebar buttons work
function wireSidebar() {
  const sidebar = document.getElementById("sidebar");
  const dropdown = document.getElementById("navDropdown");

  // Open and close the user menu
  document.getElementById("navUser").addEventListener("click", e => {
    dropdown.classList.toggle("show");
    e.stopPropagation();
  });
  document.addEventListener("click", () => dropdown.classList.remove("show"));

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

  // Collapse the sidebar (or open it on phones)
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.add("mobile-open");
    } else {
      sidebar.classList.toggle("collapsed");
      document.body.classList.toggle("sidebar-collapsed");
    }
  });

  // Reset the sidebar when the screen size changes
  let wasSmall = window.innerWidth <= 900;
  window.addEventListener("resize", () => {
    const isSmall = window.innerWidth <= 900;
    if (isSmall !== wasSmall) {
      sidebar.classList.remove("collapsed", "mobile-open");
      document.body.classList.remove("sidebar-collapsed");
      wasSmall = isSmall;
    }
  });
}

initSidebar();
