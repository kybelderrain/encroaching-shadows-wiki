const sidebar = document.querySelector("[data-js='sidebar']");
const navToggle = document.querySelector("[data-js='nav-toggle']");

if (navToggle && sidebar) {
  navToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}
