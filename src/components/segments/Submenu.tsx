import { useRef, useState } from "react";

import { navLinks } from "@/resources/static/links";

interface SubmenuProps {
  buttonName: string;
  navSlug: string;
}

function Submenu({ buttonName, navSlug }: SubmenuProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const container = useRef<HTMLButtonElement | null>(null);

  const sublinks = navLinks.find((link) => link.slug === navSlug)?.sublinks;

  const submenuPadding = 20;
  let submenuAbsolutePosition = 0;

  const submenuBtn = container.current;

  if (submenuBtn) {
    const submenuBtnBoundings = submenuBtn.getBoundingClientRect();

    const submenuCenterWidth =
      (submenuBtnBoundings.left + submenuBtnBoundings.right) / 2 -
      submenuBtnBoundings.left;

    submenuAbsolutePosition =
      submenuBtnBoundings.left - submenuCenterWidth - submenuPadding;
  }

  return (
    <div onMouseLeave={() => setIsSubmenuOpen(false)}>
      <button onMouseOver={() => setIsSubmenuOpen(true)} ref={container}>
        {buttonName}
      </button>
      {/* Tailwindcss does not support dynamic values for classes, so I need to use the style prop to align the submenu */}
      <aside
        className={`absolute w-fit origin-top transition-transform ease-in flex flex-col items-center justify-center ${
          !isSubmenuOpen && "scale-y-0"
        }`}
        style={{ left: `${submenuAbsolutePosition}px` }}
      >
        <div className="submenu-triangle"></div>
        <ul
          className="bg-fg-base rounded-lg"
          style={{ padding: submenuPadding }}
        >
          {sublinks !== undefined &&
            sublinks.map((sublink, id) => {
              const { name, Icon, slug } = sublink;

              return (
                <li
                  key={id}
                  className="flex items-center text-skin-base hoverable-btn py-1 capitalize"
                >
                  {Icon}
                  <a href={"/posts/" + slug}>{name}</a>
                </li>
              );
            })}
        </ul>
      </aside>
    </div>
  );
}

export default Submenu;
