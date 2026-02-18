"use client";

import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBoxProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBox({
  code,
  language,
  title,
  showLineNumbers = false,
}: CodeBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="border-2 border-(--fg) font-mono text-sm overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b-2 border-(--fg) bg-neutral-900 px-4 py-2">
        <span className="font-heading uppercase tracking-widest text-brand text-xs">
          {title ?? language}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="font-heading uppercase tracking-widest text-xs hover:text-brand transition-colors"
        >
          {copied ? "COPIED ✓" : "COPY"}
        </button>
      </div>

      {/* Code block */}
      <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4`}
            style={{ ...style, background: "transparent", margin: 0 }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {showLineNumbers && (
                  <span className="select-none pr-4 text-neutral-600 text-right inline-block w-8">
                    {i + 1}
                  </span>
                )}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
