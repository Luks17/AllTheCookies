
import { useRef, useState } from "react";

import type { LinkTemplate } from "@/types/Header";

interface SubmenuProps {
  buttonName: string,
  sublinks: LinkTemplate[],
}

function Submenu({ buttonName, sublinks }: SubmenuProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const container = useRef<HTMLButtonElement | null>(null);

  const submenuPadding = 20;
  let submenuAbsolutePosition = 0;

  const submenuBtn = container.current;

  if (submenuBtn) {
    const submenuBtnBoundings = submenuBtn.getBoundingClientRect();

    const submenuCenterWidth = ((submenuBtnBoundings.left + submenuBtnBoundings.right) / 2) - submenuBtnBoundings.left;

    submenuAbsolutePosition = submenuBtnBoundings.left - submenuCenterWidth - submenuPadding;
  }

  return <div onMouseLeave={() => setIsSubmenuOpen(false)}>
    <button onMouseOver={() => setIsSubmenuOpen(true)} ref={container}>{buttonName}</button>
    {/* Tailwindcss does not support dynamic values for classes, so I need to use the style prop to align the submenu */}
    <aside className={`absolute w-fit origin-top transition-transform ease-in flex flex-col items-center justify-center ${!isSubmenuOpen && "scale-y-0"}`} style={{ left: `${submenuAbsolutePosition}px` }}>
      <div className="triangle"></div>
      <ul className="bg-white rounded-lg" style={{ padding: submenuPadding }}>
        {sublinks.map(sublink => {
          const { id, name, Icon, url } = sublink;

          return <li key={id} className="flex items-center text-skin-accent hoverable-btn py-1">
            {Icon}
            <a href={url}>{name}</a>
          </li>
        })}
      </ul>
    </aside>
  </div>
}

export default Submenu;

