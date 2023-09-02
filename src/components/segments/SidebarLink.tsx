import type { ItemTemplate, LinkTemplate } from "@/types/Links";
import { useRef } from "react";

function Item({ name, Icon }: ItemTemplate) {
  return (
    <div className="p-1.5 justify-center m-1.5 flex items-center gap-0.5 hoverable-btn capitalize">
      {Icon}
      <span>{name}</span>
    </div>
  );
}

function SidebarLink(link: LinkTemplate) {
  const container = useRef<HTMLUListElement | null>(null);

  // uses scale-y-0 to hide the ul sublinks and scales it back toggling it
  // the absolute is used because, even when scaled down, the elements still take space
  function toggleSublinks(): void {
    const sidebarSublinks = container.current!;

    const toggleAbsolute = () => sidebarSublinks.classList.toggle("absolute");

    sidebarSublinks.classList.toggle("scale-y-0");

    sidebarSublinks.classList.contains("absolute")
      ? toggleAbsolute()
      : setTimeout(() => toggleAbsolute(), 200);
  }

  return (
    <div className="text-xl md:text-2xl font-bold text-skin-base w-full border-crust border-b-2">
      {link.sublinks === undefined ? (
        <a href={"/" + link.slug}>
          <Item {...link} />
        </a>
      ) : (
        <div>
          <button className="w-full" onClick={toggleSublinks}>
            <Item {...link} />
          </button>
          {/* The transition here uses transform-scale-y along with origin-top */}
          <ul
            className="ml-1 flex-col absolute scale-y-0 transition-transform origin-top ease-linear"
            ref={container}
          >
            {link.sublinks.map((sublink, id) => (
              <li key={id}>
                <a href={"/posts/" + sublink.slug}>
                  <Item {...sublink} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SidebarLink;
