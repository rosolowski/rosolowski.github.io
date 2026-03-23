import type { CSSProperties } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
}

type TypewriterStyle = CSSProperties & {
  "--typewriter-characters": number;
  "--typewriter-duration": string;
};

export default function Typewriter({ text, className }: TypewriterProps) {
  const style: TypewriterStyle = {
    "--typewriter-characters": Math.max(text.length, 1),
    "--typewriter-duration": `${Math.max(text.length * 0.08, 1.2)}s`,
  };

  return (
    <span className={["typewriter-text", className].filter(Boolean).join(" ")} style={style}>
      {text}
    </span>
  );
}
