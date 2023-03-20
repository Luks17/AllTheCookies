
import { atom } from "nanostores";

import type { LinkTemplate, SubmenuCords } from "@/types/Header";
import { links } from "../static/links";

export const isSidebarOpen = atom(false);
export const isSubmenuOpen = atom(true);
export const submenuCords = atom({} as SubmenuCords);
export const selectedSubmenu = atom({} as LinkTemplate | undefined);

export const openSidebar = () => isSidebarOpen.set(true);
export const closeSidebar = () => isSidebarOpen.set(false);

export function openSubmenu(linkName: string, cords: SubmenuCords) {
  const selectedLink = links.find(link => link.name === linkName);
  selectedSubmenu.set(selectedLink);

  submenuCords.set(cords);
  isSubmenuOpen.set(true);
}

export const closeSubmenu = () => isSubmenuOpen.set(false);

