import "./globals.css";
import type { Metadata } from "next";
import NoiseBg from "@/app/components/ui/NoiseBg";
import CustomCursor from "@/app/components/ui/CustomCursor";
import Navigation from "@/app/components/layout/Navigation";
import MatrixBackground from "@/app/components/three/MatrixBackground";

export const metadata: Metadata = {
  title: "Tanmay Warke — AI Engineer & Creative Technologist",
  description:
    "Portfolio of Tanmay Warke, a Computer Science AI & Analytics student building projects across artificial intelligence, computer vision, automation, embedded systems and interactive technology.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Tanmay Warke — AI Engineer & Creative Technologist",
    description:
      "Portfolio of Tanmay Warke, a Computer Science AI & Analytics student building projects across artificial intelligence, computer vision, automation, embedded systems and interactive technology.",
    url: "https://tanmaywarke.com",
    siteName: "Tanmay Warke Portfolio",
    images: [
      {
        url: "https://tanmaywarke.com/og.jpg",
        width: 1200,
        height: 630,
        alt: "Tanmay Warke Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Warke — AI Engineer & Creative Technologist",
    description:
      "Portfolio of Tanmay Warke, a Computer Science AI & Analytics student building projects across artificial intelligence, computer vision, automation, embedded systems and interactive technology.",
    images: ["https://tanmaywarke.com/twitter.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <MatrixBackground />
        <NoiseBg />
        <Navigation />
        <CustomCursor />
        <div className="relative z-0">{children}</div>
      </body>
    </html>
  );
}
