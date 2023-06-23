import type { ReactNode } from "react";

interface Props {
  condition: boolean;
  closeFunction: Function;
  children: ReactNode;
  lgHidden?: boolean;
  maxW_sm?: boolean;
}

// Uses the overlay-opacity utility class, which is a rgba value, instead of tailwindcss opacity. This is useful
// because doing it this way the child will not inherit the opacity.
// To handle transitions, i'm using scale and visibility.
function Overlay({
  condition,
  closeFunction,
  children,
  lgHidden = false,
  maxW_sm = true,
}: Props) {
  return (
    <aside
      className={`fixed flex z-20 ${
        lgHidden ? "lg:hidden " : " "
      }top-0 overlay right-0 h-full w-full justify-center items-center overlay-opacity transition-all duration-100 ease-linear ${
        condition ? "scale-100 visible" : "scale-0 invisible"
      }`}
    >
      <div
        className={`bg-mantle scroll-smooth overflow-y-auto rounded-md relative shadow-black h-[95%] w-[90%] border-primary border-2 ${
          maxW_sm ? "max-w-sm" : "max-w-md"
        }`}
      >
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
