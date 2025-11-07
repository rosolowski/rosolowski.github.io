import type { Metadata } from "next";
import { Geist, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adam Rosołowski Personal Page",
  description: "Frontend Developer & Indie Game Creator",
  themeColor: "#030712",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
