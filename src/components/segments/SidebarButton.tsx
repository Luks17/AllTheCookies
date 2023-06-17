import { Lines } from "@/resources/static/Icons";

import { openSidebar } from "@/resources/stores/nav-store";

function SidebarButton() {
  return (
    <button className="flex items-center" onClick={() => openSidebar()}>
      <Lines />
    </button>
  );
}

export default SidebarButton;
