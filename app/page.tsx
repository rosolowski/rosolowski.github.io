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

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-gray-200 crt font-mono">
      <div className="code border border-gray-200 p-5 boxShadow mx-5">
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
                className="underline text-gray-200 hover:text-gray-600"
              >
                {link.label}
              </a>
              {i < PROFILE.links.length - 1 && ",\n    "}
            </span>
          ))}
          {`\n  ]\n}`}
        </pre>
      </div>
    </div>
  );
}
