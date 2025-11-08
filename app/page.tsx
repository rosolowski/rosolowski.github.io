import Image from "next/image";
import pic from "@/app/assets/pic.jpg";
import Typewriter from "./components/Typewriter";
import CodeBox from "./components/CodeBox";

const PROFILE = {
  name: "Adam Rosołowski",
  occupation: "Frontend Developer",
  hobbies: [
    "game dev",
    "algorithms",
    "blockchains (mainly Ethereum)",
    "ai",
    "workflow improvement",
    "making this profile page better",
  ],
  links: [
    { url: "https://github.com/rosolowski", label: "github.com/rosolowski" },
    { url: "https://rosolowski.itch.io", label: "rosolowski.itch.io" },
    { url: "https://x.com/rosolowski_dev", label: "x.com/rosolowski_dev" },
  ],
};

const WELCOME_TEXT = `Hi, my name is Adam!
check out the links for different places where I share things!`;

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-200 crt font-mono">
      <div className="flex gap-10 flex-col sm:flex-row items-stretch justify-center p-10">
        <CodeBox>
          <div className="flex flex-col justify-start gap-5 min-w-full sm:w-[200px] min-h-[250px]">
            <Image
              src={pic}
              alt="that's me"
              className="self-center w-[150px] sm:w-[200px] h-auto object-contain"
              width={150}
              height={150}
            />
            <pre className="code whitespace-pre-wrap wrap-break-word">
              <Typewriter
                options={{
                  strings: WELCOME_TEXT,
                  speed: 20,
                  cursor: true,
                }}
              />
            </pre>
          </div>
        </CodeBox>
        <CodeBox>
          <pre>
            <span
              className="text-red-400"
              style={{ textShadow: "0 0 10px rgba(74, 222, 128, 0.5)" }}
            >
              config
            </span>
            {`: {\n  `}
            <span
              className="text-yellow-300"
              style={{ textShadow: "0 0 10px rgba(250, 204, 21, 0.5)" }}
            >
              name
            </span>
            {`: '${PROFILE.name}',\n  `}
            <span
              className="text-yellow-300"
              style={{ textShadow: "0 0 10px rgba(250, 204, 21, 0.5)" }}
            >
              occupation
            </span>
            {`: '${PROFILE.occupation}',\n  `}
            <span
              className="text-yellow-300"
              style={{ textShadow: "0 0 10px rgba(250, 204, 21, 0.5)" }}
            >
              hobbies
            </span>
            {`: [\n`}
            {PROFILE.hobbies
              .map(
                (hobby, i) =>
                  `    ${hobby}${i < PROFILE.hobbies.length - 1 ? "," : ""}\n`
              )
              .join("")}
            {`  ],\n  `}
            <span
              className="text-yellow-300"
              style={{ textShadow: "0 0 10px rgba(250, 204, 21, 0.5)" }}
            >
              links
            </span>
            {`: [\n    `}
            {PROFILE.links.map((link, i) => (
              <span key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-gray-200 hover:text-gray-400 active:text-black"
                >
                  {link.label}
                </a>
                {i < PROFILE.links.length - 1 && ",\n    "}
              </span>
            ))}
            {`\n  ]\n}`}
          </pre>
        </CodeBox>
      </div>
    </div>
  );
}
