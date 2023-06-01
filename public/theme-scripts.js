
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

function changeToggleBtnStyle(element, toggledTheme) {
  const targetIcon = element.getElementsByClassName(`${toggledTheme}-mode-icon`).item(0);
  const overlay = element.getElementsByClassName("overlay").item(0);
  const overlayTranslatePrefix = toggledTheme === "light" ? "-" : "";

  overlay.classList.toggle(`${overlayTranslatePrefix}translate-x-full`);
  targetIcon.classList.toggle("text-skin-alternate");
}

function getNotCurrentSetMode() {
  return currentTheme === "light" ? "dark" : "light";
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
      changeToggleBtnStyle(element, currentTheme);

      element.addEventListener("click", () => {
        currentTheme = getNotCurrentSetMode();

        changeToggleBtnStyle(element, currentTheme);
        changeToggleBtnStyle(element, getNotCurrentSetMode());

        setTheme(currentTheme);
      });
    })
};
