
export const getNotCurrentSetMode = (currentTheme: string) => currentTheme === "light" ? "dark" : "light";

// only works inside useEffect on react
// sets theme to the document html element on the custom property named "page-theme"
// also stores current theme in local storage
export function setTheme(theme: string) {
  document.firstElementChild?.setAttribute("page-theme", theme);

  localStorage.theme = theme;
};

// only works inside useEffect on react
// return theme if theme is in local storage, else checks device preferred color theme and returns it,
// else return dark
export function getCurrentTheme() {
  const theme = localStorage.getItem("theme");

  if (theme !== null) return theme;

  if (window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  return "dark";
};


