import { ImageResponse } from "next/og";

export const alt = "Adam Rosołowski — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Bebas Neue (latin subset) — fetched at build time
  let fontData: ArrayBuffer | null = null;
  try {
    fontData = await fetch(
      "https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5r.woff2"
    ).then((res) => res.arrayBuffer());
  } catch {
    // font unavailable at build time — falls back to sans-serif
  }

  const display: React.CSSProperties = {
    fontFamily: fontData ? "'Bebas Neue', sans-serif" : "sans-serif",
    fontWeight: 400,
    letterSpacing: "2px",
    lineHeight: 1,
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left lime accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 8,
            background: "#afff03",
          }}
        />

        {/* Name block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 24,
          }}
        >
          <span style={{ ...display, color: "#afff03", fontSize: 168 }}>
            ADAM
          </span>
          <span style={{ ...display, color: "#ffffff", fontSize: 168 }}>
            ROSOLOWSKI
          </span>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            paddingLeft: 24,
          }}
        >
          {/* Lime separator line */}
          <div style={{ width: "100%", height: 4, background: "#afff03", marginBottom: 24 }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: "#afff03",
                fontSize: 28,
                fontFamily: "sans-serif",
                fontWeight: 600,
                letterSpacing: "6px",
                textTransform: "uppercase",
              }}
            >
              FRONTEND DEVELOPER
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 28,
                fontFamily: "sans-serif",
                letterSpacing: "3px",
                opacity: 0.4,
              }}
            >
              rosolowski.dev
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Bebas Neue",
                data: fontData,
                style: "normal",
                weight: 400,
              },
            ],
          }
        : {}),
    }
  );
}
