"use client";

import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="fixed top-4 right-4 z-50 bg-(--fg) text-(--bg) border-2 border-(--fg) px-3 py-1 font-display text-sm tracking-widest hover:bg-brand hover:border-brand hover:text-black cursor-pointer"
    >
      THEME = {theme === "dark" ? "DARK" : "LIGHT"}
    </button>
  );
}
