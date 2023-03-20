import { Moon, Sun } from "@/assets/static/Icons";

function ThemeToggle() {
  return <button id="theme-toggle-btn" className="flex justify-between items-center border rounded-2xl px-1">
    <div className="border-r p-1">
      <Moon />
    </div>
    <div className="p-1">
      <Sun />
    </div>
  </button>
}

export default ThemeToggle;

