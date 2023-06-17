import type { ReactNode } from "react";

interface Props {
  condition: boolean;
  closeFunction: Function;
  children: ReactNode;
  z?: number;
  lgHidden?: boolean;
}

// Uses the overlay-opacity utility class, which is a rgba value, instead of tailwindcss opacity. This is useful
// because doing it this way the child will not inherit the opacity.
// To handle transitions, i'm using scale and visibility.
function Overlay({
  condition,
  closeFunction,
  children,
  z = 10,
  lgHidden = false,
}: Props) {
  return (
    <aside
      className={`fixed flex z-${z} ${
        lgHidden ? "lg:hidden" : ""
      } top-0 right-0 h-full w-full justify-center items-center overlay-opacity transition-all duration-100 ease-linear ${
        condition ? "scale-100 visible" : "scale-0 invisible"
      }`}
    >
      <div className="bg-mantle rounded-md relative shadow-black h-[95%] w-[90%] max-w-sm border-primary border-2">
        <button onClick={() => closeFunction()}>
          <svg
            className="w-8 h-8 text-skin-base absolute right-5 top-5 hoverable-btn"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {children}
      </div>
    </aside>
  );
}

export default Overlay;
