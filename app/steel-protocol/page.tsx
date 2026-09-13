import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Steel Protocol",
};

const ASSETS_DIR = path.join(
  process.cwd(),
  "public",
  "steel-protocol",
  "assets",
);
const ASSETS_URL = "/steel-protocol/assets";

/**
 * The game is built by Vite, which content-hashes its entry bundle
 * (index-<hash>.js). The hash changes on every rebuild, so resolve it from disk
 * at build time instead of hardcoding it. Throws rather than rendering a blank
 * page, so a bad drop fails `next build` instead of shipping silently.
 */
function findEntry(
  extension: string,
  options: { required: true },
): string;
function findEntry(
  extension: string,
  options: { required: false },
): string | null;
function findEntry(extension: string, { required }: { required: boolean }) {
  let entries: string[];
  try {
    entries = fs.readdirSync(ASSETS_DIR);
  } catch {
    throw new Error(
      `Steel Protocol: assets directory not found at ${ASSETS_DIR}. ` +
        `Copy the game's Vite build output into public/steel-protocol/assets/.`,
    );
  }

  const matches = entries
    .filter((file) => file.startsWith("index-") && file.endsWith(extension))
    .sort();

  if (matches.length > 1) {
    throw new Error(
      `Steel Protocol: found ${matches.length} "index-*${extension}" files in ` +
        `public/steel-protocol/assets/ (${matches.join(", ")}). ` +
        `Delete the stale ones so only the current build remains.`,
    );
  }

  if (matches.length === 0) {
    if (required) {
      throw new Error(
        `Steel Protocol: no "index-*${extension}" file in ` +
          `public/steel-protocol/assets/. ` +
          `Copy the game's Vite build output there.`,
      );
    }
    return null;
  }

  return `${ASSETS_URL}/${matches[0]}`;
}

export default function SteelProtocolPage() {
  const script = findEntry(".js", { required: true });
  const stylesheet = findEntry(".css", { required: false });

  return (
    <>
      {stylesheet ? <link rel="stylesheet" href={stylesheet} /> : null}
      <main
        id="game"
        className="steel-protocol-page"
        aria-label="Steel Protocol game"
      />
      <Script src={script} type="module" strategy="afterInteractive" />
    </>
  );
}
