
import type { ItemTemplate, LinkTemplate } from "@/types/Header"

// uses scale-y-0 to hide the ul sublinks and scales it back toggling it
// the absolute is used because, even when scaled down, the elements still take space
function toggleSublinks(id: number): void {
  document.querySelector(`#sidebar-sublinks-${id}`)?.classList.toggle("scale-y-0");
  document.querySelector(`#sidebar-sublinks-${id}`)?.classList.toggle("absolute");
}

function Item({ name, Icon }: ItemTemplate) {
  return <div className="p-1.5 m-1.5 flex items-center hoverable-btn">
    {Icon}
    <h6>{name}</h6>
  </div>
}

function SidebarLink(link: LinkTemplate) {
  const { id, sublinks } = link;

  return <div className="m-3 text-2xl font-bold text-skin-accent w-full">
    {(sublinks === undefined) ? <a href={link.url}><Item {...link} /></a> : <div>
      <button className="w-full" onClick={() => toggleSublinks(id)}><Item {...link} /></button>
      {/* The transition here uses transform-scale-y along with origin-top */}
      <ul id={`sidebar-sublinks-${id}`} className="ml-1 flex-col absolute scale-y-0 transition-transform origin-top ease-linear">
        {sublinks.map(sublink => <li key={sublink.id} className="text-xl">
          <a href={sublink.url}><Item {...sublink} /></a>
        </li>)}
      </ul>
    </div>}
  </div>
}

export default SidebarLink;
