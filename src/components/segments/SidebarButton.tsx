import { Lines } from "@/resources/static/Icons";

import { openSidebar } from "@/resources/stores/nav-store";

function SidebarButton() {
  return (
    <button
      aria-label="Abre barra de navegação"
      className="flex items-center"
      onClick={() => openSidebar()}
    >
      <Lines />
    </button>
  );
}

export default SidebarButton;
