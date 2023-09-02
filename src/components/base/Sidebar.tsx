import SidebarLink from "@/components/segments/SidebarLink";
import ThemeToggle from "@/components/segments/ThemeToggle";

import { navLinks } from "@/resources/static/links";

function Sidebar() {
  return (
    <>
      <div className="absolute left-5 top-5">
        <ThemeToggle />
      </div>

      {/* links */}
      <nav className="relative border-crust mt-20 border-t-2">
        {navLinks.map((link, id) => (
          <SidebarLink key={id} {...link} />
        ))}
      </nav>
    </>
  );
}

export default Sidebar;
