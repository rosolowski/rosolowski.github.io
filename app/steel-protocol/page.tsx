import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Steel Protocol",
};

export default function SteelProtocolPage() {
  return (
    <>
      <main
        id="game"
        className="steel-protocol-page"
        aria-label="Steel Protocol game"
      />
      <Script
        src="/steel-protocol/assets/index-DZXu5QIU.js"
        type="module"
        strategy="afterInteractive"
      />
    </>
  );
}
