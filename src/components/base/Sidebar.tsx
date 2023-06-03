
import React from "react";
import { useStore } from "@nanostores/react";

import SidebarLink from "@/components/segments/SidebarLink";
import ThemeToggle from "@/components/segments/ThemeToggle";

import { closeSidebar, isSidebarOpen } from "@/assets/stores/nav-store";
import { links } from "@/assets/static/links";

function Sidebar() {
  const $isSidebarOpen = useStore(isSidebarOpen);

  // Uses the sidebar-opacity utility class, which is a rgba value, instead of tailwindcss opacity. This is useful
  // because doing it this way the child will not inherit the opacity.
  // To handle transitions, i'm using scale and visibility.
  return <aside className={`fixed flex lg:hidden z-10 top-0 right-0 h-full w-full justify-center items-center sidebar-opacity transition-all duration-100 ease-linear ${$isSidebarOpen ? "scale-100 visible" : "scale-0 invisible"}`}>
    <div className="bg-mantle rounded-md relative shadow-black h-[95%] w-[90%] max-w-sm border-primary border-2">
      <button onClick={() => closeSidebar()}>

        <svg className="w-8 h-8 text-skin-base absolute right-5 top-5 hoverable-btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="absolute left-5 top-5">
        <ThemeToggle />
      </div>

      {/* links */}
      <nav className="relative border-crust mt-20 border-t-2">
        {links.map(link => (
          <SidebarLink key={link.id} {...link} />
        ))}
      </nav>

    </div>
  </aside>
}

export default Sidebar;

