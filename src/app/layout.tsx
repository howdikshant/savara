import type { Metadata } from "next";
import { Cinzel, Rajdhani, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/next"


const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAVĀRA 26 | ChronoSync",
  description: "SAVĀRA ChronoSync — The flagship techno-cultural fest of IIITDM Kancheepuram. Where the ancient meets the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${rajdhani.variable} ${outfit.variable} antialiased`}
      >
        <Analytics />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
