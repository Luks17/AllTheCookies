import { atom } from "nanostores";

export const isLightMode = atom(false);

function setTheme(theme: boolean) {
  isLightMode.set(theme);

  const themeStr = theme ? "light" : "dark";

  document.firstElementChild?.setAttribute("page-theme", themeStr);
  localStorage.theme = themeStr;
}

function isLightModePreferred() {
  const theme = localStorage.getItem("theme");

  if (theme !== null) return theme === "dark" ? false : true;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return false;

  return true;
}

// only works inside useEffect on react and script tag on astro
// sets theme to the document html element on the custom property named "page-theme"
// also stores theme in local storage
export function toggleTheme() {
  setTheme(!isLightMode.get());
}

// only works inside useEffect on react and script tag on astro
// sets preffered theme if it is in local storage,
// else checks device preferred color theme,
// else sets theme light mode
export const setPreferredTheme = () => setTheme(isLightModePreferred());
