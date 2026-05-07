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
  Fraunces,
  Cormorant,
  IM_Fell_English,
  Quattrocento_Sans,
  Cinzel,
  Amiri,
  Scheherazade_New,
  Tajawal,
  EB_Garamond
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
const cormorantGaramond = Cormorant_Garamond({
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

const yesevaOne = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-brush-display",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-brush-heading",
  display: "swap",
});

const karla = Karla({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-brush-body",
  display: "swap",
});

const dancingScript = Dancing_Script({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-brush-accent",
  display: "swap",
});

const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-modern-display",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-modern-body",
  display: "swap",
});

const fraunces = Fraunces({
  weight: ["300", "400"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-modern-accent",
  display: "swap",
});

// --- SPRINT 5 FONTS ---

const cormorant = Cormorant({
  weight: ["700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-culture-display",
  display: "swap",
});

const imFellEnglish = IM_Fell_English({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-culture-subheading",
  display: "swap",
  adjustFontFallback: false,
});

const quattrocentoSans = Quattrocento_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-culture-body",
  display: "swap",
});

const cinzel = Cinzel({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-culture-number",
  display: "swap",
});

const amiri = Amiri({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["arabic", "latin"],
  variable: "--font-spirit-arabic",
  display: "swap",
});

const scheherazadeNew = Scheherazade_New({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-spirit-heading",
  display: "swap",
});

const tajawal = Tajawal({
  weight: ["300", "400", "500"],
  subsets: ["arabic", "latin"],
  variable: "--font-spirit-body",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-spirit-serif",
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
        ${cormorantGaramond.variable}
        ${plusJakarta.variable}
        ${yesevaOne.variable}
        ${libreBaskerville.variable}
        ${karla.variable}
        ${dancingScript.variable}
        ${syne.variable}
        ${dmMono.variable}
        ${fraunces.variable}
        ${cormorant.variable}
        ${imFellEnglish.variable}
        ${quattrocentoSans.variable}
        ${cinzel.variable}
        ${amiri.variable}
        ${scheherazadeNew.variable}
        ${tajawal.variable}
        ${ebGaramond.variable}
      `}
    >
      <body className="font-sans antialiased bg-[#F5EFE8]">
        {children}
      </body>
    </html>
  );
}

