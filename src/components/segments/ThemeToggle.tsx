import { Moon, Sun } from "@/assets/static/Icons";

// Ironically, this react component does not actually contain any code to toggle the current theme, 
// you can find the actual code on /public/theme-scripts.js

function ThemeToggle() {

  return <button className={`theme-toggle-btn flex justify-between text-skin-base border-crust overflow-hidden items-center border-2 rounded-2xl`} >
    <div className="dark-mode-icon bg-fg-base p-1 pl-2">
      <Moon />
    </div>
    <div className="light-mode-icon bg-fg-base pr-2 p-1">
      <Sun />
    </div>
  </button >
}

export default ThemeToggle;

