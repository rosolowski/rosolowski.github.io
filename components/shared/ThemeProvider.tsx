"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Theme, ThemeContext } from "@/lib/theme";
import ThemeTransition from "./ThemeTransition";

const STORAGE_KEY = "theme";
const ANIMATION_TOTAL = 500; // ms for full sweep (-110% → 110%)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const overlayRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  // On mount: read persisted theme
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggle = () => {
    if (animating.current) return;
    animating.current = true;

    const next: Theme = theme === "dark" ? "light" : "dark";
    const overlay = overlayRef.current;
    if (!overlay) {
      applyTheme(next);
      animating.current = false;
      return;
    }

    // Overlay color = incoming theme background
    overlay.style.backgroundColor = next === "dark" ? "#000000" : "#ffffff";

    // Single continuous sweep: -110% → 110%, screen fully covered at midpoint
    overlay.style.transition = `transform ${ANIMATION_TOTAL}ms ease-in-out`;
    overlay.style.transform = "translateX(110%)";

    // Swap theme at midpoint (250ms) — overlay fully covers screen at translateX(0)
    setTimeout(() => applyTheme(next), ANIMATION_TOTAL / 2);

    const onSweepEnd = () => {
      overlay.removeEventListener("transitionend", onSweepEnd);
      // Reset off-screen left instantly (no transition)
      overlay.style.transition = "none";
      overlay.style.transform = "translateX(-110%)";
      animating.current = false;
    };
    overlay.addEventListener("transitionend", onSweepEnd);
  };

  const applyTheme = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(STORAGE_KEY, t);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <ThemeTransition ref={overlayRef} />
      {children}
    </ThemeContext.Provider>
  );
}
