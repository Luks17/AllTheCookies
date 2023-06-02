import { Moon, Sun } from "@/assets/static/Icons";
import { useEffect, useRef, useState } from "react";

import { setTheme, getNotCurrentSetMode } from "@/util/theme";


function ThemeToggle() {
  const [btnCurrentTheme, setBtnCurrentTheme] = useState(localStorage.getItem("theme"));

  const buttonContainer = useRef<HTMLButtonElement | null>(null);
  const sunIconContainer = useRef<HTMLDivElement | null>(null);
  const moonIconContainer = useRef<HTMLDivElement | null>(null);
  const overlayContainer = useRef<HTMLDivElement | null>(null);

  function toggleTheme() {
    const theme = getNotCurrentSetMode(btnCurrentTheme!);

    setTheme(theme)
    setBtnCurrentTheme(theme);
  };

  useEffect(() => {
    const button = buttonContainer.current!;
    const overlay = overlayContainer.current!;
    const sunIcon = sunIconContainer.current!;
    const moonIcon = moonIconContainer.current!;

    if (btnCurrentTheme === "light") {
      overlay.classList.add("translate-x-full");

      sunIcon.classList.add("text-skin-alternate");
      moonIcon.classList.remove("text-skin-alternate");
    }
    else {
      overlay.classList.remove("translate-x-full");

      moonIcon.classList.add("text-skin-alternate");
      sunIcon.classList.remove("text-skin-alternate");
    }

    button.addEventListener("click", toggleTheme);
    return () => button.removeEventListener("click", toggleTheme);

  }, [btnCurrentTheme]);

  return <button className={`theme-toggle-btn flex justify-between bg-fg-base text-skin-base border-crust overflow-hidden items-center border-2 rounded-2xl`} ref={buttonContainer} >
    <div className="z-20 relative flex">
      <div className="bg-crust transition-transform duration-200 absolute w-1/2 h-full" ref={overlayContainer}></div>

      <div className="z-30 pl-2 p-1 relative" ref={moonIconContainer}><Moon /></div>
      <div className="z-30 p-1 pr-2 relative" ref={sunIconContainer}><Sun /></div>
    </div>

  </button >
}

export default ThemeToggle;

