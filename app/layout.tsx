import type { Metadata, Viewport } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Yeseva_One,
  Libre_Baskerville,
  Karla,
  Dancing_Script,
  Syne,
  DM_Mono,
  Fraunces
} from "next/font/google";
import "./globals.css";

// Configure Great Vibes for couple names (Floral Display)
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Configure Cormorant Garamond for elegant editorial headings (Floral Heading)
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

// Configure Plus Jakarta Sans for UI and body copy (Floral Body)
const plusJakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// --- SPRINT 3 FONTS ---

// Yeseva One: decorative serif (Brush Display)
const yesevaOne = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brush-display",
  display: "swap",
});

// Libre Baskerville: traditional elegant serif (Brush Heading)
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-brush-heading",
  display: "swap",
});

// Karla: clean modern grok-sans (Brush Body)
const karla = Karla({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-brush-body",
  display: "swap",
});

// Dancing Script: expressive organic script (Brush Accent)
const dancingScript = Dancing_Script({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-brush-accent",
  display: "swap",
});

// Syne: futuristic eye-catching geometric (Modern Display)
const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-modern-display",
  display: "swap",
});

// DM Mono: sleek editorial coding interface (Modern Body)
const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-modern-body",
  display: "swap",
});

// Fraunces: high-fashion bespoke italic serif (Modern Accent)
const fraunces = Fraunces({
  weight: ["300", "400"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-modern-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Undangan Digital Pernikahan",
  description: "Buat momen spesialmu abadi dengan undangan digital elegan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`
        ${greatVibes.variable}
        ${cormorant.variable}
        ${plusJakarta.variable}
        ${yesevaOne.variable}
        ${libreBaskerville.variable}
        ${karla.variable}
        ${dancingScript.variable}
        ${syne.variable}
        ${dmMono.variable}
        ${fraunces.variable}
      `}
    >
      <body className="font-sans antialiased bg-[#F5EFE8]">
        {children}
      </body>
    </html>
  );
}

