import type { ItemTemplate, LinkTemplate } from "@/types/Links";

// uses scale-y-0 to hide the ul sublinks and scales it back toggling it
// the absolute is used because, even when scaled down, the elements still take space
function toggleSublinks(id: number): void {
  const sidebarSublinks = document.querySelector(`#sidebar-sublinks-${id}`);

  const toggleAbsolute = () => sidebarSublinks?.classList.toggle("absolute");

  sidebarSublinks?.classList.toggle("scale-y-0");

  sidebarSublinks?.classList.contains("absolute")
    ? toggleAbsolute()
    : setTimeout(() => toggleAbsolute(), 200);
}

function Item({ name, Icon }: ItemTemplate) {
  return (
    <div className="p-1.5 justify-center m-1.5 flex items-center hoverable-btn capitalize">
      {Icon}
      <h6>{name}</h6>
    </div>
  );
}

function SidebarLink(link: LinkTemplate) {
  const { id, sublinks } = link;

  return (
    <div className="text-xl md:text-2xl font-bold text-skin-base w-full border-crust border-b-2">
      {sublinks === undefined ? (
        <a href={"/" + link.slug}>
          <Item {...link} />
        </a>
      ) : (
        <div>
          <button className="w-full" onClick={() => toggleSublinks(id)}>
            <Item {...link} />
          </button>
          {/* The transition here uses transform-scale-y along with origin-top */}
          <ul
            id={`sidebar-sublinks-${id}`}
            className="ml-1 flex-col absolute scale-y-0 transition-transform origin-top ease-linear"
          >
            {sublinks.map((sublink) => (
              <li key={sublink.id}>
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
