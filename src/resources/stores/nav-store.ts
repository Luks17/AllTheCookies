import { atom } from "nanostores";

// boolean for sidebar
export const isSidebarOpen = atom(false);

// functions
export const openSidebar = () => isSidebarOpen.set(true);
export const closeSidebar = () => isSidebarOpen.set(false);
