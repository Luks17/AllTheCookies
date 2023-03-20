
import React from "react"
import { useStore } from "@nanostores/react";

import Logo from "@/components/Logo";

import { isSidebarOpen } from "@/assets/stores/nav-store";


function Header() {
  const $isSidebarOpen = useStore(isSidebarOpen);

  return <header className="p-7 flex-col w-full">

    <div className="flex items-center justify-between">
      {/* logo */}
      <a href="/"><Logo /></a>

      {/* sidebar-toggle mobile */}
      <button className="md:hidden" onClick={() => isSidebarOpen.set(!$isSidebarOpen)}>
        <svg className="h8 w-8 text-skin-base" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
        </svg>
      </button>
    </div>

    {/* nav */}
    <nav>
      {/* links */}

      {/* Icons */}
      <ul>
        <li></li>
      </ul>
    </nav>

  </header>
}

export default Header;

