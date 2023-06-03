
import { Moon, Sun } from "@/assets/static/Icons";
import { useEffect, useRef } from "react";
import { toggleTheme, isLightMode } from "@/assets/stores/theme-store";
import { useStore } from "@nanostores/react";


// in this icon, I use an overlay with translate-x animations to do the sliding effect
// translate-x-full sends the element completely to the right, 
// when that class is removed it slides back to it's original position
function ThemeToggle() {
  const $isLightMode = useStore(isLightMode);

  const buttonContainer = useRef<HTMLButtonElement | null>(null);
  const sunIconContainer = useRef<HTMLDivElement | null>(null);
  const moonIconContainer = useRef<HTMLDivElement | null>(null);
  const overlayContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const button = buttonContainer.current!;
    const overlay = overlayContainer.current!;
    const sunIcon = sunIconContainer.current!;
    const moonIcon = moonIconContainer.current!;

    if ($isLightMode) {
      overlay.classList.add("translate-x-full");

      sunIcon.classList.add("text-skin-alternate");
      moonIcon.classList.remove("text-skin-alternate");
    }
    else {
      overlay.classList.remove("translate-x-full");

      sunIcon.classList.remove("text-skin-alternate");
      moonIcon.classList.add("text-skin-alternate");
    }

    button.addEventListener("click", toggleTheme);
    return () => button.removeEventListener("click", toggleTheme);

  }, [$isLightMode]);

  return <button className={`bg-fg-base z-20 relative flex text-skin-base border-crust overflow-hidden items-center border-2 rounded-2xl`} ref={buttonContainer} >
    <div className="bg-crust transition-transform duration-200 absolute w-1/2 h-full" ref={overlayContainer}></div>

    <div className="z-30 pl-2 p-1 relative" ref={moonIconContainer}><Moon /></div>
    <div className="z-30 p-1 pr-2 relative" ref={sunIconContainer}><Sun /></div>
  </button >
}

export default ThemeToggle;

