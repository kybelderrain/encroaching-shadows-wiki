const sidebar = document.querySelector("[data-js='sidebar']");
const navToggle = document.querySelector("[data-js='nav-toggle']");

if (navToggle && sidebar) {
  navToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

// Persist CSS-only theme toggle (checkbox) across navigations.
const themeToggle = document.querySelector("#theme-toggle");
const THEME_STORAGE_KEY = "dndwiki:theme";

function safeGetTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function safeSetTheme(value) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value);
  } catch {
    // Ignore storage failures (private browsing, disabled storage, etc.)
  }
}

if (themeToggle instanceof HTMLInputElement) {
  const saved = safeGetTheme();
  if (saved === "night") themeToggle.checked = true;
  if (saved === "day") themeToggle.checked = false;

  themeToggle.addEventListener("change", () => {
    safeSetTheme(themeToggle.checked ? "night" : "day");
  });
}
