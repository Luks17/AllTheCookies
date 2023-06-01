import { Moon, Sun } from "@/assets/static/Icons";

// Ironically, this react component does not actually contain any code to toggle the current theme, 
// you can find the actual code on /public/theme-scripts.js

function ThemeToggle() {

  return <button className={`theme-toggle-btn flex justify-between bg-fg-base text-skin-base border-crust overflow-hidden items-center border-2 rounded-2xl`} >
    <div className="z-20 relative flex">
      <div className="overlay bg-crust translate-x-full transition-transform duration-200 absolute w-1/2 h-full"></div>

      <div className="dark-mode-icon z-30 pl-2 p-1 relative"><Moon /></div>
      <div className="light-mode-icon z-30 p-1 pr-2 relative"><Sun /></div>
    </div>

  </button >
}

export default ThemeToggle;

