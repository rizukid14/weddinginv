import type { Metadata, Viewport } from "next";
import { Great_Vibes, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Configure Great Vibes for couple names
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Configure Cormorant Garamond for elegant editorial headings
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

// Configure Plus Jakarta Sans for UI and body copy
const plusJakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
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
      className={`${greatVibes.variable} ${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body className="font-sans antialiased bg-[#F5EFE8]">
        {children}
      </body>
    </html>
  );
}
