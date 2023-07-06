import { navLinks } from "@/resources/static/links";
import Submenu from "@/components/segments/Submenu";

function Navbar() {
  return (
    <nav className="flex gap-24 z-20 text-skin-base font-bold text-2xl">
      {navLinks.map((link) => {
        const { id, sublinks, slug, name } = link;

        return (
          <div key={id} className="hoverable-btn">
            {sublinks === undefined ? (
              <a href={"/posts/" + slug}>{name}</a>
            ) : (
              <Submenu buttonName={name} sublinks={sublinks} />
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Navbar;
