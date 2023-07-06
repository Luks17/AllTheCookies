import { useStore } from "@nanostores/react";

import Overlay from "@/components/segments/Overlay";
import SidebarLink from "@/components/segments/SidebarLink";
import ThemeToggle from "@/components/segments/ThemeToggle";

import { closeSidebar, isSidebarOpen } from "@/resources/stores/nav-store";
import { navLinks } from "@/resources/static/links";

function Sidebar() {
  const $isSidebarOpen = useStore(isSidebarOpen);

  return (
    <Overlay
      condition={$isSidebarOpen}
      closeFunction={closeSidebar}
      lgHidden={true}
    >
      <div className="absolute left-5 top-5">
        <ThemeToggle />
      </div>

      {/* links */}
      <nav className="relative border-crust mt-20 border-t-2">
        {navLinks.map((link) => (
          <SidebarLink key={link.id} {...link} />
        ))}
      </nav>
    </Overlay>
  );
}

export default Sidebar;
