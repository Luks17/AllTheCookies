
let currentTheme = getCurrentTheme();

// executing this early to avoid page flashes
setTheme(currentTheme);

// return theme if theme is in local storage, else checks device preferred color theme and returns it
function getCurrentTheme() {
  const theme = localStorage.getItem("theme");

  if (theme !== null) return theme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// sets theme to the document html element on the custom property named "page-theme"
// also stores current theme in local storage
function setTheme(theme) {
  document.firstElementChild.setAttribute("page-theme", theme);

  localStorage.theme = theme;
}

// toggles theme when the theme toggle button is pressed
window.onload = function() {
  document
    .querySelectorAll(".theme-toggle-btn").forEach(element => {
      element.addEventListener("click", () => {
        currentTheme = currentTheme === "light" ? "dark" : "light";
        setTheme(currentTheme);
      });
    })
};
