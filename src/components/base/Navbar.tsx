import React from "react";

import { links } from "@/resources/static/links";
import Submenu from "@/components/segments/Submenu";

function Navbar() {
  return (
    <nav className="flex gap-24 z-20 text-skin-base font-bold text-2xl">
      {links.map((link) => {
        const { id, sublinks, url, name } = link;

        return (
          <div key={id} className="hoverable-btn">
            {sublinks === undefined ? (
              <a href={url}>{name}</a>
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
