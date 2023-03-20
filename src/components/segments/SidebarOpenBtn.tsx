
import React from "react"

import { isSidebarOpen } from "@/assets/stores/nav-store";

function SidebarOpenBtn() {
  return <button className="md:hidden" onClick={() => isSidebarOpen.set(true)}>
    <svg className="h8 w-8 text-skin-base" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
    </svg>
  </button>
}

export default SidebarOpenBtn;
