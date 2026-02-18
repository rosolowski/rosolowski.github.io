"use client";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

interface ColoredSegment {
  text: string;
  color?: string;
}

type TerminalOutput = string | ColoredSegment[];

interface TerminalLine {
  command: string;
  output: TerminalOutput;
}

export default function TermWindow() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key.length === 1 &&
        inputRef.current &&
        document.activeElement !== inputRef.current
      ) {
        inputRef.current.focus();
        scrollToBottom();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0) {
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentInput.trim()) {
      setLines((prev) => [...prev, { command: "", output: "" }]);
      setCurrentInput("");
      return;
    }

    if (currentInput.toLowerCase().trim() === "clear") {
      setLines([]);
      setCurrentInput("");
      return;
    }

    const output = processCommand(currentInput);

    setLines((prev) => [...prev, { command: currentInput, output }]);
    setCurrentInput("");
  };

  const processCommand = (command: string): TerminalOutput => {
    switch (command.toLowerCase().trim()) {
      case "help":
        return "Available commands: help, clear, echo [text], art";
      case "art":
        return [
          {
            text: "                                                                                                          ;                                 \n",
            color: "text-brand",
          },
          {
            text: "                :                   :                     :                                               ED.                               \n",
            color: "text-brand",
          },
          {
            text: "               t#,           .     t#,                   t#,                            . G:              E#Wi                 ,;           \n",
            color: "text-brand",
          },
          {
            text: "  j.          ;##W.         ;W    ;##W.             i   ;##W.                          ;W E#,    : t      E###G.             f#i            \n",
            color: "text-brand",
          },
          {
            text: "  EW,        :#L:WE        f#E   :#L:WE            LE  :#L:WE             ;           f#E E#t  .GE Ej     E#fD#W;          .E#t             \n",
            color: "text-brand",
          },
          {
            text: "  E##j      .KG  ,#D     .E#f   .KG  ,#D          L#E .KG  ,#D          .DL         .E#f  E#t j#K; E#,    E#t t##L        i#W,   t      .DD.\n",
            color: "text-brand",
          },
          {
            text: "  E###D.    EE    ;#f   iWW;    EE    ;#f        G#W. EE    ;#f f.     :K#L     LWLiWW;   E#GK#f   E#t    E#t  .E#K,     L#D.    EK:   ,WK. \n",
            color: "text-brand",
          },
          {
            text: "  E#jG#W;  f#.     t#i L##Lffi f#.     t#i      D#K. f#.     t#iEW:   ;W##L   .E#fL##Lffi E##D.    E#t    E#t    j##f  :K#Wfff;  E#t  i#D   \n",
            color: "text-brand",
          },
          {
            text: "  E#t t##f :#G     GK tLLG##L  :#G     GK      E#K.  :#G     GK E#t  t#KE#L  ,W#;tLLG##L  E##Wi    E#t    E#t    :E#K: i##WLLLLt E#t j#f    \n",
            color: "text-brand",
          },
          {
            text: "  E#t  :K#E:;#L   LW.   ,W#i    ;#L   LW.    .E#E.    ;#L   LW. E#t f#D.L#L t#K:   ,W#i   E#jL#D:  E#t    E#t   t##L    .E#L     E#tL#i     \n",
            color: "text-brand",
          },
          {
            text: "  E#KDDDD###it#f f#:   j#E.      t#f f#:    .K#E       t#f f#:  E#jG#f  L#LL#G    j#E.    E#t ,K#j E#t    E#t .D#W;       f#E:   E#WW,      \n",
            color: "text-brand",
          },
          {
            text: "  E#f,t#Wi,,, f#D#;  .D#j         f#D#;    .K#D         f#D#;   E###;   L###j   .D#j      E#t   jD E#t    E#tiW#G.         ,WW;  E#K:       \n",
            color: "text-brand",
          },
          {
            text: "  E#t  ;#W:    G#t  ,WK,           G#t    .W#G           G#t    E#K:    L#W;   ,WK,       j#t      E#t    E#K##i            .D#; ED.        \n",
            color: "text-brand",
          },
          {
            text: "  DWi   ,KK:    t   EG.             t    :W##########Wt   t     EG      LE.    EG.         ,;      E#t .j E##D.               tt t          \n",
            color: "text-brand",
          },
          {
            text: "                    ,                    :,,,,,,,,,,,,,.        ;       ;@     ,                   ,;. ;f.E#t                               \n",
            color: "text-brand",
          },
          {
            text: "                                                                                                          L:                                \n",
            color: "text-brand",
          },
        ];
      default:
        if (command.startsWith("echo ")) {
          return command.slice(5);
        }
        return `Command not found: ${command}`;
    }
  };

  const renderOutput = (output: TerminalOutput) => {
    if (typeof output === "string") {
      return <div className="mb-2 whitespace-pre-wrap">{output}</div>;
    }

    return (
      <div className="mb-2 whitespace-pre-wrap">
        {output.map((segment, i) => (
          <span key={i} className={segment.color}>
            {segment.text}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="p-4 font-mono h-screen w-full overflow-y-auto pb-20 cursor-text select-text"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="content">
        {lines.map((line, i) => (
          <div key={i}>
            <div>
              <span className="text-brand">$</span> {line.command}
            </div>
            {line.output && renderOutput(line.output)}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-brand">$</span>
        <input
          ref={inputRef}
          id="term-input"
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="flex-1 bg-transparent outline-none ml-1"
          style={{ color: "var(--fg)" }}
          autoFocus
        />
      </form>
    </div>
  );
}
