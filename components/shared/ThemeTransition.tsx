"use client";

import { forwardRef } from "react";

interface ThemeTransitionProps {
  color: string;
}

/**
 * Full-screen overlay used during theme switch.
 * Slides in from left, sits at center, then slides out to right.
 */
const ThemeTransition = forwardRef<HTMLDivElement, ThemeTransitionProps>(
  ({ color }, ref) => (
    <div
      ref={ref}
      aria-hidden
      className="theme-overlay"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: "-50vw",
        width: "200vw",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: color,
        transform: "translateX(-110%)",
        willChange: "transform",
      }}
    />
  ),
);

ThemeTransition.displayName = "ThemeTransition";
export default ThemeTransition;
