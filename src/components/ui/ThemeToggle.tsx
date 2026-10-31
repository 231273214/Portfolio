import { AnimatePresence, motion } from "motion/react";
import { useThemeStore } from "../../store/useThemeStore";
import { useSound } from "../../hooks/useSound";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const { onHover, onClick } = useSound();

  return (
    <button
      onClick={() => {
        toggleTheme();
        onClick();
      }}
      onMouseEnter={onHover}
      aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {theme === "dark" ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </>
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}