import { atom } from "nanostores";

// boolean for sidebar
export const isSidebarOpen = atom(false);

// functions
export const openSidebar = () => isSidebarOpen.set(true);
export const closeSidebar = () => isSidebarOpen.set(false);

// boolean for search
export const isSearchOpen = atom(false);

// functions
export const openSearch = () => isSearchOpen.set(true);
export const closeSearch = () => isSearchOpen.set(false);
