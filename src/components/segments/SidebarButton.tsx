import React from "react";

import { Lines } from "@/resources/static/Icons";

import { openSidebar } from "@/resources/stores/nav-store";

function SidebarButton() {
  return (
    <button onClick={() => openSidebar()}>
      <Lines />
    </button>
  );
}

export default SidebarButton;
