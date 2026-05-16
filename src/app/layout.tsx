import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Devoreq Technology and Publishing",
  description: "A modern publishing studio powered by creativity, technology, and premium storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased font-sans bg-[#F8FAFC]">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
        <link href="https://api.fontshare.com/v2/css?f[]=nohemi@400,500,600,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/geist@1.0.3/dist/fonts/geist-sans/style.css" />
      </head>
      <body className="flex flex-col text-[#0F172A]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
