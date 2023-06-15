
import { atom } from "nanostores";

// booleans for submenu and sidebar
export const isSidebarOpen = atom(false);

// functions
export const openSidebar = () => isSidebarOpen.set(true);
export const closeSidebar = () => isSidebarOpen.set(false);


