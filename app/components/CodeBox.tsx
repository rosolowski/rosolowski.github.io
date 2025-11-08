import { ReactNode } from "react";

interface CodeBoxProps {
  children: ReactNode;
}

export default function CodeBox({ children }: CodeBoxProps) {
  return (
    <div className="code border border-gray-200 p-5 boxShadow">{children}</div>
  );
}
