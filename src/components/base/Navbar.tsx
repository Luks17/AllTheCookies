
import React from "react";

import { links } from "@/assets/static/links";
import { isSubmenuOpen, openSubmenu, closeSubmenu } from "@/assets/stores/nav-store";
import type { SubmenuCords } from "@/types/Header";

// when the mouse hovers a link in the navbar, this function gets it's name and cords (cords get adjusted to the middle and below 3 units)
// with that info, it sends it to openSubmenu so it can open a submenu in that cords for that link
function displaySubmenu(e: React.MouseEvent): void {
  const linkName = e.currentTarget.textContent!;
  const linkCords = e.currentTarget.getBoundingClientRect();

  const submenuCords: SubmenuCords = {
    center: (linkCords.left + linkCords.right) / 2,
    bottom: linkCords.bottom - 3,
  }

  openSubmenu(linkName, submenuCords);
}

function hideSubmenu(): void {
  if (isSubmenuOpen)
    closeSubmenu();
}

function Navbar() {
  return <nav onMouseLeave={hideSubmenu} className="flex gap-24 text-skin-base font-bold text-2xl">
    {links.map(link => {
      const { id, sublinks, url, name } = link;

      return <div key={id} className="opacity-80 hover:opacity-100 transition-opacity ease-linear">
        {(sublinks === undefined ? <a href={url}>{name}</a> : <button onMouseOver={displaySubmenu}>{name}</button>)}
      </div>
    })}
  </nav >
}

export default Navbar;

