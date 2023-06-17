import { MagnifyingGlass } from "@/resources/static/Icons";

import { openSearch } from "@/resources/stores/nav-store";

function SidebarButton() {
  return (
    <button className="flex items-center" onClick={() => openSearch()}>
      <MagnifyingGlass />
    </button>
  );
}

export default SidebarButton;
