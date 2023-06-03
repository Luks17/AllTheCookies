
import React from "react";

import { Lines } from "@/assets/static/Icons";

import { openSidebar } from "@/assets/stores/nav-store";

function SidebarButton() {
  return <button onClick={() => openSidebar()}>
    <Lines />
  </button >
}

export default SidebarButton;
