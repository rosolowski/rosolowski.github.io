"use client";

import { forwardRef } from "react";

/**
 * Full-screen overlay used during theme switch.
 * Sweeps left to right behind all content; color and timing are set imperatively via ref.
 */
const ThemeTransition = forwardRef<HTMLDivElement, object>((_props, ref) => (
  <div
    ref={ref}
    aria-hidden
    style={{
      position: "fixed",
      top: 0,
      bottom: 0,
      left: "-50vw",
      width: "200vw",
      zIndex: -1,
      pointerEvents: "none",
      transform: "translateX(-110%)",
      willChange: "transform",
    }}
  />
));

ThemeTransition.displayName = "ThemeTransition";
export default ThemeTransition;
