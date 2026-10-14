import { useContext } from "react";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../Context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === "light";

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري"}
      title={isLight ? "تفعيل الوضع الليلي (Dark Mode)" : "تفعيل الوضع النهاري (Light Mode)"}
      className={`relative flex items-center justify-between w-16 h-8 px-1.5 rounded-full border transition-all cursor-pointer shadow-inner group ${
        isLight
          ? "bg-slate-200/90 border-slate-300/80 hover:border-purple-500/50"
          : "bg-slate-900/80 border-white/15 hover:border-purple-500/40"
      }`}
    >
      <Moon
        size={13}
        className={`ml-0.5 pointer-events-none transition-colors duration-200 ${
          isLight ? "text-slate-400" : "text-indigo-400"
        }`}
      />
      <Sun
        size={13}
        className={`mr-0.5 pointer-events-none transition-colors duration-200 ${
          isLight ? "text-amber-500" : "text-amber-400/60"
        }`}
      />

      {/* Sliding knob */}
      <span
        className={`theme-toggle-knob absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
          isLight
            ? "translate-x-8 bg-linear-to-tr from-amber-400 to-orange-500 shadow-amber-500/40 text-white"
            : "translate-x-0 bg-linear-to-tr from-indigo-500 to-purple-500 shadow-purple-500/40 text-white"
        }`}
      >
        {isLight ? (
          <Sun size={13} className="text-white fill-white/20 stroke-white" />
        ) : (
          <Moon size={13} className="text-white fill-white/20 stroke-white" />
        )}
      </span>
    </button>
  );
}
