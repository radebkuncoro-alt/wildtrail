import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WildTrail — Explore the Wild, Craft Your Legacy",
  description:
    "A pixel-art outdoor adventure game. Hike, climb, kayak, and discover wildlife while crafting survival gear.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
