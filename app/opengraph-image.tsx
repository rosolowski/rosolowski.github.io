import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const dynamic = "force-static";

export const alt = "Adam Rosołowski";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Bebas Neue font — fetched at build time
  let fontData: ArrayBuffer | null = null;
  try {
    fontData = await fetch(
      "https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5r.woff2"
    ).then((res) => res.arrayBuffer());
  } catch {
    // falls back to sans-serif
  }

  // Pre-baked grayscale photo (generated once, lives in public/)
  const picBuffer = readFileSync(
    path.join(process.cwd(), "public", "og-pic.png")
  );
  const picBase64 = `data:image/png;base64,${picBuffer.toString("base64")}`;

  const displayFont = fontData ? "'Bebas Neue', sans-serif" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {/* Left: name */}
        <div
          style={{
            flex: "0 0 55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 56px",
            borderRight: "8px solid #afff03",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.9,
            }}
          >
            <span
              style={{
                color: "#afff03",
                fontSize: 156,
                fontFamily: displayFont,
                fontWeight: 400,
                letterSpacing: "2px",
              }}
            >
              ADAM
            </span>
            <span
              style={{
                color: "#ffffff",
                fontSize: 156,
                fontFamily: displayFont,
                fontWeight: 400,
                letterSpacing: "2px",
              }}
            >
              ROSOLOWSKI
            </span>
          </div>

          <span
            style={{
              color: "#afff03",
              fontFamily: "sans-serif",
              fontSize: 22,
              letterSpacing: "5px",
              opacity: 0.6,
            }}
          >
            ROSOLOWSKI.DEV
          </span>
        </div>

        {/* Right: B&W photo */}
        <div
          style={{
            flex: "0 0 45%",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={picBase64}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
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
