# 📑 ENIX DESIGN - Digital Wedding Platform Master Specifications

Welcome to the consolidated master specification document for the **ENIX DESIGN** digital wedding invitation platform. This document combines all engineering prompts, design guidelines, sprint features, and architectures for Sprint 1 (Premium Public Invitation) and Sprint 2 (CMS Dashboard).

---

## 🗂️ Table of Contents
- [🌸 Sprint 1: Premium Digital Invitation (Floral Rose Template)](#sprint-1-premium-digital-invitation-floral-rose-template)
- [🛡️ Sprint 2: Premium CMS Dashboard (Pengantin Platform)](#sprint-2-premium-cms-dashboard-pengantin-platform)
- [📣 E-Invitation Landing Page & Showcase Prompt Specification](#e-invitation-landing-page-showcase-prompt-specification)

---

# 🌸 Sprint 1: Premium Digital Invitation (Floral Rose Template)

# Sprint 1 — Wedding Invitation App (Floral Template)
# Tech: Next.js 14 + TypeScript + Tailwind + Framer Motion + Firebase
> Copy prompt ini ke Antigravity

---

## 🧠 SYSTEM PROMPT

```
You are a senior full-stack engineer and UI/UX designer building a
production-grade digital wedding invitation app in Bahasa Indonesia.

Tech stack:
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (utility-first, no component libraries)
- Framer Motion (animations)
- Firebase (Firestore + Storage + Auth)

Design philosophy:
- Template "Floral": romantic, lush, botanical — think editorial
  wedding magazine meets fine-art illustration. Avoid generic AI aesthetics.
- Mobile-first. Every pixel matters. Tamu membuka ini di HP.
- Fonts: Cormorant Garamond (display/headings) + Plus Jakarta Sans (body/UI)
- Palette: ivory, blush, dusty rose, sage green, warm gold

Write complete, working, production-ready code. No placeholders,
no TODOs, no simplified versions. Implement everything as specified.
```

---

## 📁 FILE STRUCTURE

```
/app
  /[slug]
    page.tsx                  ← Undangan publik (server component, fetch dari Firestore)
    loading.tsx               ← Skeleton loader
  /[slug]/rsvp
    route.ts                  ← API route POST RSVP
  layout.tsx
  globals.css

/components
  /invitation
    PasswordGate.tsx          ← Password wall jika aktif
    CoverSection.tsx          ← Hero cover + countdown
    MempelaiSection.tsx       ← Foto & bio pengantin
    AkadResepsiSection.tsx    ← Info acara + maps
    GallerySection.tsx        ← Grid foto
    RSVPSection.tsx           ← Form RSVP
    GiftSection.tsx           ← Info rekening & e-gift
    MusicPlayer.tsx           ← Floating music player
    OpeningOverlay.tsx        ← "Buka Undangan" splash screen
  /ui
    FloralDivider.tsx         ← Reusable SVG botanical divider
    CountdownTimer.tsx        ← Live countdown component

/lib
  firebase.ts                 ← Firebase init (client)
  firebase-admin.ts           ← Firebase Admin SDK (server)
  wedding.ts                  ← Fetch wedding data helpers
  rsvp.ts                     ← RSVP write helpers
  animations.ts               ← Framer Motion variants

/types
  wedding.ts                  ← TypeScript interfaces

/public
  /fonts                      ← Self-hosted fonts (optional)
```

---

## 🔥 FIREBASE SETUP

### `/lib/firebase.ts`
```typescript
// Firebase client SDK initialization
// Collections used:
//   weddings/{slug}              → wedding document
//   weddings/{slug}/rsvp/{id}   → RSVP entries (subcollection)

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
```

### `/lib/firebase-admin.ts`
```typescript
// Firebase Admin SDK untuk server-side Firestore reads
// Digunakan di: app/[slug]/page.tsx (server component)

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminDb = getFirestore();
```

### `.env.local`
```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (server-side only)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

---

## 📐 TYPESCRIPT INTERFACES

### `/types/wedding.ts`
```typescript
export interface WeddingData {
  // Identity
  slug: string;
  templateId: "floral" | "brush" | "modern" | "retro" | "culture" | "spiritual" | "seasonal";
  isActive: boolean;

  // Password
  passwordEnabled: boolean;
  password?: string;

  // Mempelai
  groomName: string;           // "Rizki Aditya Pratama"
  groomNickname: string;       // "Rizki"
  groomFatherName: string;     // "Bpk. Hendra Pratama"
  groomMotherName: string;     // "Ibu Sari Pratama"
  groomPhoto: string;          // Firebase Storage URL

  brideName: string;           // "Amira Putri Rahayu"
  brideNickname: string;       // "Amira"
  brideFatherName: string;
  brideMotherName: string;
  bridePhoto: string;

  // Acara
  akadEnabled: boolean;
  akadDate: string;            // ISO string "2025-12-21T09:00:00"
  akadVenue: string;
  akadAddress: string;
  akadMapsUrl: string;

  resepsiEnabled: boolean;
  resepsiDate: string;
  resepsiVenue: string;
  resepsiAddress: string;
  resepsiMapsUrl: string;

  // Media
  coverPhoto: string;          // Firebase Storage URL
  galleryPhotos: string[];     // Array of URLs (max 10)

  // Music
  musicEnabled: boolean;
  musicUrl: string;
  musicTitle: string;

  // Gift
  giftEnabled: boolean;
  bankAccounts: BankAccount[];
  ewallets: EWallet[];
  giftRegistryUrl?: string;

  // Quote
  openingQuote: string;
  openingQuoteSource: string;

  // Meta
  createdAt: string;
  expiresAt: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface EWallet {
  provider: string;            // "GoPay" | "OVO" | "Dana"
  number: string;
  qrCodeUrl?: string;
}

export interface RSVPEntry {
  id: string;
  weddingSlug: string;
  guestName: string;
  attendance: "hadir" | "tidak_hadir" | "mungkin";
  guestCount: number;
  message: string;
  createdAt: string;
}
```

---

## 🗃️ FIRESTORE DUMMY DATA

```
// Seed dokumen ini manual di Firebase Console
// Path: weddings/rizki-amira

{
  slug: "rizki-amira",
  templateId: "floral",
  isActive: true,
  passwordEnabled: true,
  password: "rizki2025",

  groomName: "Rizki Aditya Pratama",
  groomNickname: "Rizki",
  groomFatherName: "Bpk. Hendra Pratama",
  groomMotherName: "Ibu Sari Wulandari",
  groomPhoto: "https://placehold.co/400x500/e8d5c4/8b6f47?text=Rizki",

  brideName: "Amira Putri Rahayu",
  brideNickname: "Amira",
  brideFatherName: "Bpk. Rahmat Hidayat",
  brideMotherName: "Ibu Dewi Rahayu",
  bridePhoto: "https://placehold.co/400x500/e8d5c4/8b6f47?text=Amira",

  akadEnabled: true,
  akadDate: "2025-12-21T09:00:00",
  akadVenue: "Masjid Al-Ikhlas",
  akadAddress: "Jl. Raya Kebayoran Baru No. 12, Jakarta Selatan",
  akadMapsUrl: "https://maps.google.com/?q=-6.2297,106.7986",

  resepsiEnabled: true,
  resepsiDate: "2025-12-21T11:00:00",
  resepsiVenue: "The Grand Ballroom - Hotel Mulia",
  resepsiAddress: "Jl. Asia Afrika, Senayan, Jakarta",
  resepsiMapsUrl: "https://maps.google.com/?q=-6.2186,106.8000",

  coverPhoto: "https://placehold.co/800x1000/f5efe8/c9a96e?text=Cover+Photo",
  galleryPhotos: [
    "https://placehold.co/400x400/e8d5c4/8b6f47?text=Gallery+1",
    "https://placehold.co/400x600/f5efe8/c9a96e?text=Gallery+2",
    "https://placehold.co/400x400/e8d5c4/8b6f47?text=Gallery+3",
    "https://placehold.co/400x500/f5efe8/c9a96e?text=Gallery+4",
    "https://placehold.co/400x400/e8d5c4/8b6f47?text=Gallery+5",
    "https://placehold.co/400x600/f5efe8/c9a96e?text=Gallery+6"
  ],

  musicEnabled: true,
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  musicTitle: "Can't Help Falling in Love",

  giftEnabled: true,
  bankAccounts: [
    { bankName: "BCA", accountNumber: "1234567890", accountName: "Rizki Aditya Pratama" },
    { bankName: "Mandiri", accountNumber: "0987654321", accountName: "Amira Putri Rahayu" }
  ],
  ewallets: [
    { provider: "GoPay", number: "081234567890" },
    { provider: "OVO", number: "081234567890" }
  ],

  openingQuote: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
  openingQuoteSource: "QS. Ar-Rum: 21",

  createdAt: "2025-01-01T00:00:00",
  expiresAt: "2026-12-31T00:00:00"
}
```

---

## 🌸 DESIGN SYSTEM — Template Floral

```
AESTHETIC DIRECTION:
  "Romantic botanical editorial" — seperti halaman majalah wedding mewah
  dengan ilustrasi bunga tangan. Lush tapi tidak noisy.
  Setiap section seperti spread majalah yang berbeda.
  Hindari semua estetika AI generik.

FONTS (import via next/font/google di layout.tsx):
  Display/Script  : Great Vibes 400          → nama mempelai saja
  Heading         : Cormorant Garamond 400, 400i, 600, 700
  Body/UI         : Plus Jakarta Sans 300, 400, 500, 600

CSS VARIABLES (globals.css pada :root):
  --floral-ivory      : #FDFAF7
  --floral-cream      : #F5EFE8
  --floral-blush      : #E8D5C4
  --floral-rose       : #D4A5A0
  --floral-dusty      : #C49A8A
  --floral-gold       : #C9A96E
  --floral-gold-deep  : #8B6F47
  --floral-sage       : #8FAF8A
  --floral-sage-dark  : #5A7A55
  --floral-text       : #2C2424
  --floral-muted      : #9A8070

BOTANICAL SVG ELEMENTS (semua inline SVG, bukan image file):
  Style: stroke="#C9A96E" fill="none" stroke-width="0.8" opacity="0.7"
  Jenis yang dibutuhkan:
  1. Corner ornament — roses + leaves, cocok untuk 4 sudut halaman
  2. Horizontal branch divider — cabang dengan bunga di tengah
  3. Wreath circle — melingkari foto mempelai
  4. Scattered petals — untuk floating animation di cover
  5. Leaf cluster — untuk section break kecil

LAYOUT RULE — Undangan adalah produk MOBILE:
  Semua konten dibungkus: max-w-[430px] mx-auto
  Di desktop: tampil centered seperti preview HP di tengah layar
  Background luar: bg-[--floral-cream] atau subtle pattern

TYPOGRAPHY SCALE:
  Display (nama)     : Great Vibes, clamp(2.5rem, 8vw, 4rem)
  Section title      : Cormorant Garamond, clamp(1.5rem, 5vw, 2rem)
  Body               : Plus Jakarta Sans, 0.875rem (14px)
  Caption            : Plus Jakarta Sans, 0.75rem (12px)
  Label              : Plus Jakarta Sans, 0.625rem (10px), uppercase, tracking-widest
```

---

## 📄 PAGE: `/app/[slug]/page.tsx`

```typescript
// Server Component — fetch data dari Firestore via Admin SDK
// Handle: not found, expired, inactive, OG metadata

import { adminDb } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import { WeddingData } from "@/types/wedding";
import WeddingInvitation from "@/components/invitation/WeddingInvitation";
import { Metadata } from "next";

interface Props {
  params: { slug: string };
  searchParams: { to?: string }; // ?to=Nama+Tamu (personalized)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const doc = await adminDb.collection("weddings").doc(params.slug).get();
  if (!doc.exists) return { title: "Undangan tidak ditemukan" };
  const data = doc.data() as WeddingData;
  const resepsiDate = new Date(data.resepsiDate).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  });
  return {
    title: `Undangan Pernikahan ${data.groomNickname} & ${data.brideNickname}`,
    description: `Dengan penuh kebahagiaan, kami mengundang Anda hadir di pernikahan ${data.groomName} dan ${data.brideName}`,
    openGraph: {
      title: `${data.groomNickname} & ${data.brideNickname} 💍`,
      description: `Resepsi Pernikahan — ${resepsiDate}`,
      images: [{ url: data.coverPhoto, width: 800, height: 1000 }],
    },
  };
}

export default async function WeddingPage({ params, searchParams }: Props) {
  const doc = await adminDb.collection("weddings").doc(params.slug).get();
  if (!doc.exists) notFound();

  const data = doc.data() as WeddingData;
  if (!data.isActive) notFound();
  if (new Date(data.expiresAt) < new Date()) {
    // Render halaman "Undangan sudah tidak aktif" (buat component sederhana)
    return <ExpiredPage groomNickname={data.groomNickname} brideNickname={data.brideNickname} />;
  }

  const guestName = searchParams.to ? decodeURIComponent(searchParams.to) : null;

  return <WeddingInvitation data={data} guestName={guestName} slug={params.slug} />;
}
```

---

## 🎭 COMPONENT: `OpeningOverlay.tsx`

```
Splash screen pertama. WAJIB karena browser memblokir audio autoplay
tanpa user interaction. Ini juga momen pertama yang mengesankan.

LAYOUT: fixed inset-0 z-50 bg-[--floral-ivory] flex flex-col items-center justify-center

BACKGROUND DECORATION:
  - 4 botanical corner ornaments SVG (absolute, setiap sudut)
  - 6-8 floating petal SVGs (absolute, random positions)
    CSS animation: float-petal keyframe, 8-12s loop, staggered delay

CONTENT (flex-col items-center gap-6 text-center px-8):

  1. Eyebrow text:
     "Undangan Pernikahan" 
     Plus Jakarta Sans, xs, tracking-widest, uppercase, --floral-muted

  2. Couple names:
     "{brideNickname} & {groomNickname}"
     Great Vibes, clamp(2.5rem, 10vw, 4rem), --floral-gold
     Dibungkus wreath SVG botanical (ornate, melingkari teks)

  3. Tanggal:
     "Ahad, 21 Desember 2025"
     Cormorant Garamond italic, lg, --floral-muted

  4. Jika guestName ada:
     Separator: FloralDivider simple
     "Kepada Yth." — xs, uppercase, tracking-widest, muted
     "{guestName}" — Cormorant Garamond, xl, --floral-text

  5. CTA Button:
     Icon: amplop/bunga SVG (kecil, gold)
     Text: "Buka Undangan"
     Style: border border-[--floral-gold] text-[--floral-gold-deep]
            px-10 py-3.5 text-sm tracking-widest uppercase
            rounded-none (kotak = lebih elegan dari pill)
            hover:bg-[--floral-gold] hover:text-white transition-all duration-300
     Animation: subtle pulse scale 1↔1.03, CSS keyframe, 2s loop

BEHAVIOR:
  - onClick: panggil onOpen() callback (dari parent WeddingInvitation)
  - onOpen di parent: set isOverlayOpen=false, start music
  - Exit animation (Framer Motion):
    overlay: opacity 1→0, y 0→-20, duration 0.8s ease-out
    Setelah exit: mount WeddingContent + jika passwordEnabled → mount PasswordGate
```

---

## 🔒 COMPONENT: `PasswordGate.tsx`

```
Muncul setelah OpeningOverlay jika passwordEnabled === true.
Overlay di atas konten undangan yang sudah di-mount (blur effect).

LAYOUT:
  fixed inset-0 z-40
  backdrop-blur-md bg-[--floral-ivory]/80

CARD (absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2):
  bg-white rounded-2xl p-8 w-[calc(100%-3rem)] max-w-sm
  border border-[--floral-blush] shadow-2xl text-center

CONTENT:
  - Botanical ornament kecil (SVG, top center card)
  - Icon lock SVG (gold, 2rem, mx-auto)
  - Title: "Undangan Privat" — Cormorant Garamond, 1.5rem
  - Subtitle: "Masukkan kata sandi untuk membuka undangan"
              Plus Jakarta Sans, sm, muted
  - Input: type="password", text-center, text-lg, tracking-widest
           border-b-2 border-[--floral-blush] bg-transparent
           focus:border-[--floral-gold] focus:outline-none transition-colors
           placeholder="••••••••" py-2 w-full
  - Submit Button: "Buka" — bg-[--floral-gold] text-white w-full py-3 mt-4
                   rounded hover:bg-[--floral-gold-deep] transition-colors
  - Error: "Kata sandi salah" — text-rose-500, text-sm, mt-2
           Shake animation (Framer Motion: x oscillation)

BEHAVIOR:
  - Client-side password check (Sprint 1): compare dengan data.password
  - Benar → Framer Motion exit animation → tampil undangan
  - Salah → shake + error message
  - 3x salah → cooldown 60 detik (localStorage timestamp)
  - Enter key juga trigger submit
```

---

## 🌿 COMPONENT: `CoverSection.tsx`

```
Section pertama setelah undangan terbuka. Harus impresif.

LAYOUT: min-h-screen relative overflow-hidden

BACKGROUND LAYERS (z-index dari bawah ke atas):
  1. Cover photo: next/image fill object-cover z-0
  2. Gradient overlay: absolute inset-0 z-10
     background: linear-gradient(
       to top,
       rgba(44,36,36,0.85) 0%,
       rgba(44,36,36,0.3) 50%,
       rgba(44,36,36,0.1) 100%
     )
  3. Botanical corner ornaments: absolute z-20, 4 sudut
     opacity-40, stroke white (bukan gold — agar kontras di foto gelap)

CONTENT (absolute inset-0 z-30 flex flex-col):

  TOP (pt-12 px-6 text-center):
    Badge: "Undangan Pernikahan"
    border border-white/40 text-white/80 text-xs tracking-widest
    uppercase px-4 py-1.5 inline-block

  CENTER (flex-1 flex items-center justify-center):
    (kosong atau optional quote singkat)

  BOTTOM (pb-16 px-6 text-center):
    - Opening bismillah/quote (xs, white/60, italic, mb-6):
      "Bismillahirrahmanirrahim"
    
    - Nama mempelai:
      "{brideName}" — Great Vibes, 3rem, text-white
      Botanical ornament "&" (SVG kecil, gold/white)
      "{groomName}" — Great Vibes, 3rem, text-white
    
    - Divider: thin white line dengan diamond center (SVG)
    
    - Tanggal: "Ahad, 21 Desember 2025"
      Cormorant Garamond, lg, white/90
    
    - Kota: "Jakarta, Indonesia"
      Plus Jakarta Sans, sm, white/70, tracking-wide
    
    - COUNTDOWN (mt-6):
      Flex row gap-3, justify-center
      4 kotak: HARI | JAM | MENIT | DETIK
      Setiap kotak:
        bg-white/15 backdrop-blur-sm px-3 py-2.5 rounded
        Angka: Cormorant Garamond bold, 1.75rem, white
        Label: Plus Jakarta Sans, 8px, white/60, uppercase, tracking-wider
      Jika sudah lewat: replace dengan "Pernikahan telah berlangsung 🎉"
                        Cormorant Garamond italic, lg, white

    - Scroll indicator (absolute bottom-6 left-1/2 -translate-x-1/2):
      Chevron down SVG, white/50
      CSS animation: bounce up-down 1.5s loop
      Text: "Gulir ke bawah" — 9px, white/40, tracking-widest, uppercase

COUNTDOWN LOGIC:
  useEffect(() => {
    const target = new Date(data.resepsiDate);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { setIsPast(true); clearInterval(interval); return; }
      setDays(Math.floor(diff / 86400000));
      setHours(Math.floor((diff % 86400000) / 3600000));
      setMinutes(Math.floor((diff % 3600000) / 60000));
      setSeconds(Math.floor((diff % 60000) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

ENTRANCE ANIMATION (staggered, setelah PasswordGate close):
  Badge: fadeIn delay 0.2s
  Names: fadeUp delay 0.4s
  Date: fadeUp delay 0.6s
  Countdown: fadeUp delay 0.8s
```

---

## 💑 COMPONENT: `MempelaiSection.tsx`

```
Section profil kedua mempelai.

BACKGROUND:
  bg-[--floral-cream]
  SVG botanical watermark centered (sangat faint, opacity 0.05)

LAYOUT: py-24 px-6 text-center

HEADER:
  FloralDivider variant="ornate"
  Eyebrow: "Mempelai" (xs, uppercase, tracking-widest, --floral-gold, mt-8)
  Quote: data.openingQuote
         Cormorant Garamond italic, base, --floral-text/80, max-w-xs mx-auto, leading-relaxed, mt-4
  Source: data.openingQuoteSource
          Plus Jakarta Sans, xs, --floral-muted, mt-2
  FloralDivider variant="simple" (mt-8)

MEMPELAI CARDS (flex flex-col gap-16 mt-12):

  Setiap card — BRIDE DULU, kemudian GROOM:
  
  FOTO:
    Container: relative w-48 h-48 mx-auto
    Botanical wreath SVG: absolute inset-0 w-full h-full (melingkari foto)
    Photo: next/image, rounded-full, object-cover, w-44 h-44
           absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    Ring: ring-4 ring-[--floral-blush] ring-offset-4 ring-offset-[--floral-cream]
  
  INFO (mt-6):
    Nama: Great Vibes, 2.25rem, --floral-gold
    Nama Lengkap: Cormorant Garamond italic, sm, --floral-muted, mt-1
    Divider: thin gold line (w-8 h-px bg-[--floral-gold] mx-auto my-4)
    "Putri/Putra dari:" — Plus Jakarta Sans, 9px, --floral-muted, uppercase, tracking-wider
    Nama Ayah: Plus Jakarta Sans, sm, --floral-text, font-medium, mt-1
    "dan" — xs, --floral-muted, my-0.5
    Nama Ibu: Plus Jakarta Sans, sm, --floral-text, font-medium

  ANTARA DUA CARD (hanya di lg):
    "&" dengan botanical leaf kiri-kanan, --floral-gold

FloralDivider variant="branch" (penutup section)
```

---

## 🕌 COMPONENT: `AkadResepsiSection.tsx`

```
Info waktu dan tempat acara.

BACKGROUND: bg-[--floral-ivory]

LAYOUT: py-24 px-6

HEADER:
  FloralDivider variant="branch"
  Title: "Waktu & Tempat" — Cormorant Garamond, 2rem, text-center, mt-8
  Subtitle: "Dengan segala kerendahan hati, kami memohon kehadiran Bapak/Ibu/Saudara/i"
            Plus Jakarta Sans, sm, --floral-muted, text-center, italic, max-w-xs mx-auto, mt-3

CARDS (flex flex-col gap-5 mt-12):

  Jika akadEnabled → render AkadCard
  Jika resepsiEnabled → render ResepsiCard

  Setiap card:
    bg-white border border-[--floral-blush] rounded-2xl p-8 text-center shadow-sm
    hover:shadow-md hover:-translate-y-1 transition-all duration-300

    - Icon SVG: masjid (akad) / venue/gedung (resepsi) — gold, 2rem, mx-auto, mb-4
    - Label: "AKAD NIKAH" / "RESEPSI PERNIKAHAN"
             Plus Jakarta Sans, 9px, uppercase, tracking-widest, --floral-gold
    - Gold line divider (w-12 h-px mx-auto my-4)
    - Hari & Tanggal: Cormorant Garamond, xl, --floral-text, font-semibold
                      Format: "Ahad, 21 Desember 2025"
    - Jam: Plus Jakarta Sans, sm, --floral-muted
           Format: "09.00 – selesai WIB"
    - Nama Venue: Cormorant Garamond italic, lg, --floral-text, mt-3
    - Alamat: Plus Jakarta Sans, sm, --floral-muted, leading-relaxed, max-w-xs mx-auto
    - Buttons row (flex gap-3 justify-center mt-6):
        "Lihat Peta" button:
          border border-[--floral-gold] text-[--floral-gold-deep]
          px-5 py-2.5 text-xs tracking-wide uppercase rounded
          hover:bg-[--floral-gold] hover:text-white transition-all
          → href ke mapsUrl target="_blank"
        "Simpan ke Kalender" button:
          text-xs text-[--floral-muted] underline underline-offset-2
          hover:text-[--floral-gold] transition-colors
          → onClick: generateICS() dan trigger download .ics file

ADD TO CALENDAR (generateICS function):
  Generate string .ics format:
    BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTART:{date in YYYYMMDDTHHmmss format}
    DTEND:{+2 jam}
    SUMMARY:{label} - {groomNickname} & {brideNickname}
    LOCATION:{venue}, {address}
    DESCRIPTION:Undangan pernikahan {groomName} & {brideName}
    END:VEVENT
    END:VCALENDAR
  Buat Blob → URL.createObjectURL → trigger <a> download

FloralDivider variant="ornate" (penutup section)
```

---

## 🖼️ COMPONENT: `GallerySection.tsx`

```
Grid foto prewedding dengan lightbox.
Hanya render jika data.galleryPhotos.length > 0

BACKGROUND:
  bg-[--floral-cream]
  Subtle grain texture: SVG filter feTurbulence overlay, opacity 0.025

HEADER:
  FloralDivider variant="branch"
  Title: "Galeri" — Cormorant Garamond, 2rem, text-center, mt-8

MASONRY GRID:
  columns-2 gap-2.5 mt-10
  Setiap item: break-inside-avoid mb-2.5 rounded-xl overflow-hidden
               relative group cursor-pointer

  Foto aspect ratio bervariasi — bukan semua square:
    index % 3 === 0 → aspect-[3/4]
    index % 3 === 1 → aspect-square
    index % 3 === 2 → aspect-[4/5]
  Ini membuat grid terasa natural dan editorial.

  Hover per foto:
    - next/image scale 1→1.05 transition-transform duration-500
    - Overlay: absolute inset-0 bg-[--floral-text]/25
               opacity-0 group-hover:opacity-100 transition-opacity
    - Icon expand: SVG center, white, opacity-0 group-hover:opacity-100

LIGHTBOX (state: selectedIndex | null):
  AnimatePresence untuk enter/exit
  Fixed inset-0 z-50 bg-[--floral-text]/92 flex flex-col

  HEADER:
    Flex justify-between items-center px-4 py-3
    "{selectedIndex+1} / {total}" — sm, white/60
    Close button: X icon, white, p-2

  IMAGE AREA (flex-1 flex items-center justify-center px-4):
    next/image object-contain max-h-[75vh] w-full
    Swipe gesture support (touch events: touchStart, touchEnd)
    Jika swipe left → next image, swipe right → prev image

  NAVIGATION:
    ChevronLeft/Right buttons (absolute left-2/right-2 top-1/2)
    bg-white/10 hover:bg-white/20 rounded-full p-2
    Hanya tampil jika lebih dari 1 foto

  DOTS (flex gap-2 justify-center pb-6):
    w-1.5 h-1.5 rounded-full
    Active: bg-white | Inactive: bg-white/30

  KEYBOARD: useEffect → addEventListener("keydown")
    ArrowLeft → prev, ArrowRight → next, Escape → close

FloralDivider variant="simple" (penutup section)
```

---

## 📝 COMPONENT: `RSVPSection.tsx`

```
Form konfirmasi kehadiran + feed ucapan realtime.

BACKGROUND: bg-[--floral-ivory]

HEADER:
  FloralDivider variant="ornate"
  Title: "Konfirmasi Kehadiran" — Cormorant Garamond, 2rem, text-center, mt-8
  Subtitle: "Kehadiran Anda adalah kebahagiaan kami"
            Cormorant Garamond italic, base, --floral-muted, text-center, mt-2

FORM (max-w-sm mx-auto mt-10 flex flex-col gap-6):

  FIELD 1 — Nama:
    Label: "Nama Lengkap" — Plus Jakarta Sans, xs, uppercase, tracking-wide, --floral-gold
    Input: type="text"
           Pre-filled: guestName jika ada
           Style: w-full border-b border-[--floral-blush] bg-transparent
                  py-3 text-sm --floral-text
                  focus:border-[--floral-gold] focus:outline-none transition-colors
                  placeholder="Nama lengkap Anda"

  FIELD 2 — Kehadiran:
    Label: "Konfirmasi Kehadiran"
    3 Radio buttons sebagai pill toggle (flex flex-col gap-2):
      "Dengan Senang Hati Hadir" → value: "hadir"
      "Mungkin Hadir" → value: "mungkin"
      "Mohon Maaf, Berhalangan" → value: "tidak_hadir"
    Style setiap pill:
      border border-[--floral-blush] rounded px-4 py-3 text-sm cursor-pointer
      text-left transition-all duration-200
      Selected: bg-[--floral-gold] border-[--floral-gold] text-white
      Unselected: text-[--floral-muted] hover:border-[--floral-gold]/50

  FIELD 3 — Jumlah Tamu (hanya tampil jika attendance === "hadir"):
    Label: "Jumlah Tamu yang Hadir"
    Custom stepper (tidak pakai <input type="number"> native):
      flex items-center gap-4 justify-center
      "−" button: w-10 h-10 border border-[--floral-blush] rounded text-lg
                  hover:border-[--floral-gold] disabled:opacity-30
      Angka: Cormorant Garamond, xl, --floral-text, min-w-[2rem] text-center
      "+" button: sama dengan minus
      Min: 1, Max: 5
    Animate mount/unmount dengan Framer Motion height animation

  FIELD 4 — Pesan:
    Label: "Ucapan & Doa (opsional)"
    Textarea: rows=3, same style as input
              placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
              resize-none

  SUBMIT BUTTON:
    "Kirim Konfirmasi"
    w-full bg-[--floral-gold] hover:bg-[--floral-gold-deep] text-white
    py-3.5 text-sm tracking-widest uppercase rounded transition-colors
    Loading: spinner inline + "Mengirim..."
    Disabled saat loading

  SUCCESS STATE (replace form):
    Animated: scale + fade in
    Botanical ornament kecil
    "✓ Terima kasih, {guestName}!"
    Cormorant Garamond, xl, --floral-gold
    "Sampai jumpa di hari bahagia kami 💌"
    Plus Jakarta Sans, sm, --floral-muted

SUBMIT HANDLER:
  fetch("/api/[slug]/rsvp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guestName, attendance, guestCount, message })
  })
  Validasi client-side: nama wajib, attendance wajib
  Error state: pesan error merah + tombol "Coba Lagi"

UCAPAN FEED (di bawah form, mt-16):
  Title: "Ucapan & Doa" — xs, uppercase, tracking-widest, --floral-muted, mb-6

  Realtime listener (Framer Motion AnimatePresence untuk entri baru):
    import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"
    Listen: weddings/{slug}/rsvp orderBy createdAt desc limit 10

  Setiap card entri:
    bg-white border border-[--floral-blush]/50 rounded-xl p-4
    flex gap-3 items-start mb-3
    Framer Motion: layout + fadeUp saat entri baru muncul

    Avatar: w-9 h-9 rounded-full bg-[--floral-gold]/20 flex items-center justify-center
            Inisial: Great Vibes, base, --floral-gold
    Info:
      Nama: Plus Jakarta Sans, sm, font-semibold, --floral-text
      Status badge:
        hadir: bg-sage-100 text-sage-700 | tidak_hadir: bg-rose-100 text-rose-600
        mungkin: bg-amber-100 text-amber-700
        text-xs px-2 py-0.5 rounded-full
      Pesan: Plus Jakarta Sans, xs, --floral-muted, italic, mt-1, leading-relaxed
      Waktu: xs, --floral-muted/60, mt-1
             Format: "2 jam yang lalu" (relative time)

  Jika RSVP kosong: placeholder "Jadilah yang pertama memberikan ucapan 💌"

FloralDivider variant="branch" (penutup section)
```

---

## 🎁 COMPONENT: `GiftSection.tsx`

```
Info hadiah digital. Render hanya jika data.giftEnabled === true

BACKGROUND: bg-[--floral-cream]

HEADER:
  FloralDivider variant="ornate"
  Title: "Hadiah Digital" — Cormorant Garamond, 2rem, text-center, mt-8
  Subtitle: "Bagi yang ingin memberikan tanda kasih,
             kami terima dengan penuh rasa syukur 🙏"
            Plus Jakarta Sans, sm, --floral-muted, text-center, italic, mt-3, max-w-xs mx-auto

REKENING BANK (jika bankAccounts.length > 0):
  Section label: "Transfer Bank" — xs, uppercase, tracking-widest, --floral-gold, mt-10, mb-4

  Setiap rekening:
    bg-white border border-[--floral-blush] rounded-xl p-5
    flex items-center gap-4 mb-3

    Logo placeholder:
      w-12 h-12 rounded-lg bg-[--floral-blush]/50 flex items-center justify-center
      Text: bankName singkatan (BCA, BRI, dll) — Plus Jakarta Sans, xs, font-bold, --floral-gold-deep

    Info:
      Bank name: Plus Jakarta Sans, sm, font-semibold, --floral-text
      Nomor: font-mono, sm, --floral-text, tracking-wide, mt-0.5
      Atas nama: xs, --floral-muted, mt-0.5

    Copy button (ml-auto):
      w-9 h-9 border border-[--floral-blush] rounded-lg flex items-center justify-center
      hover:border-[--floral-gold] transition-colors cursor-pointer
      Icon: Copy → berubah jadi Check setelah 2 detik
      onClick: navigator.clipboard.writeText(accountNumber)
               + toast "Nomor disalin!" (custom toast sederhana, slide-up dari bawah)

E-WALLET (jika ewallets.length > 0):
  Section label: "E-Wallet" — sama styling
  Flex row, overflow-x-auto, gap-3, pb-2 (scrollable horizontal)
  Setiap pill:
    bg-white border border-[--floral-blush] rounded-xl px-5 py-4 flex-shrink-0
    flex flex-col items-center gap-2
    Provider name: Plus Jakarta Sans, xs, font-semibold, --floral-text
    Nomor: font-mono, sm, --floral-text
    Copy button: icon kecil, tap → copy + toast

GIFT REGISTRY (jika giftRegistryUrl ada):
  Button: "Lihat Wish List kami →"
  border border-[--floral-gold] text-[--floral-gold-deep] w-full py-3 text-sm
  text-center rounded hover:bg-[--floral-gold] hover:text-white transition-all mt-6
  → open giftRegistryUrl new tab

KONFIRMASI TRANSFER:
  "Sudah transfer? Beritahu kami ❤️" — xs, --floral-muted, text-center, mt-6
  Link WhatsApp:
    "Konfirmasi via WhatsApp →" — underline, text-[--floral-gold], text-sm
    href: https://wa.me/[NOMOR]?text=Halo+kak%2C+saya+sudah+transfer+untuk+{groomNickname}+%26+{brideNickname}

FloralDivider variant="simple" (penutup section)
```

---

## 🎵 COMPONENT: `MusicPlayer.tsx`

```
Floating music player. Mount setelah OpeningOverlay close.

POSITION: fixed bottom-6 right-4 z-40

COLLAPSED STATE:
  Pill: bg-[--floral-ivory] border border-[--floral-blush]
        shadow-lg shadow-[--floral-blush]/40 rounded-full
        px-4 py-2.5 flex items-center gap-3

  - Vinyl disc SVG (w-7 h-7):
      Circles konsentris + garis groove
      CSS: animation spin-vinyl 4s linear infinite
           paused jika !isPlaying
  - Song title: Plus Jakarta Sans, xs, --floral-text, max-w-[100px] truncate
  - Play/Pause button: w-7 h-7 rounded-full bg-[--floral-gold]/10
                       flex items-center justify-center
                       Lucide Play/Pause icon, w-3.5 h-3.5, --floral-gold

BEHAVIOR:
  - audioRef = useRef<HTMLAudioElement>(null)
  - onMount: create Audio(data.musicUrl), audioRef.current = audio
  - Saat parent memanggil startMusic(): audio.play()
  - isPlaying state: toggle play/pause
  - Loop: audio.loop = true
  - Handle play() promise rejection (browser policy)

ENTRANCE ANIMATION:
  Framer Motion: initial { opacity: 0, y: 20, scale: 0.8 }
  animate: { opacity: 1, y: 0, scale: 1 }
  transition: { delay: 1.2, type: "spring", stiffness: 200 }

CSS (globals.css):
  @keyframes spin-vinyl {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .vinyl-spinning { animation: spin-vinyl 4s linear infinite; }
  .vinyl-paused { animation-play-state: paused; }
```

---

## 🌿 COMPONENT: `FloralDivider.tsx`

```typescript
// Reusable botanical SVG divider
// Semua SVG: stroke="#C9A96E" fill="none" stroke-width="0.8"

interface Props {
  variant?: "branch" | "simple" | "ornate";
  className?: string;
}

export default function FloralDivider({ variant = "branch", className = "" }: Props) {
  if (variant === "simple") {
    // Thin horizontal line dengan small diamond ornament di center
    // <line> kiri dan kanan + <polygon> diamond center
  }

  if (variant === "branch") {
    // Horizontal botanical branch dengan 2-3 bunga/daun di tengah
    // SVG path yang menggambarkan ranting tipis dengan ornamen bunga
  }

  if (variant === "ornate") {
    // Lebih elaborate: roses kiri-kanan, garis tengah, ornament center
    // Cocok untuk header section penting
  }

  // Width: 100%, Height: 40-60px, mx-auto, my-8
  // Semua dalam satu <svg> element dengan viewBox yang sesuai
}
```

---

## 🔗 API ROUTE: `/app/[slug]/rsvp/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    const { guestName, attendance, guestCount, message } = body;

    // Validasi server-side
    if (!guestName?.trim() || guestName.trim().length < 2) {
      return NextResponse.json({ error: "Nama tidak valid" }, { status: 400 });
    }
    if (!["hadir", "tidak_hadir", "mungkin"].includes(attendance)) {
      return NextResponse.json({ error: "Konfirmasi kehadiran tidak valid" }, { status: 400 });
    }

    // Cek wedding exists
    const weddingDoc = await adminDb.collection("weddings").doc(params.slug).get();
    if (!weddingDoc.exists) {
      return NextResponse.json({ error: "Undangan tidak ditemukan" }, { status: 404 });
    }

    // Rate limiting sederhana: cek RSVP dari IP yang sama dalam 5 menit
    // (skip untuk Sprint 1, implement di Sprint 7)

    // Write ke Firestore subcollection
    const rsvpRef = adminDb
      .collection("weddings")
      .doc(params.slug)
      .collection("rsvp")
      .doc();

    await rsvpRef.set({
      id: rsvpRef.id,
      weddingSlug: params.slug,
      guestName: guestName.trim(),
      attendance,
      guestCount: attendance === "hadir" ? (Number(guestCount) || 1) : 0,
      message: message?.trim() || "",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: rsvpRef.id });
  } catch (error) {
    console.error("[RSVP Error]", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
```

---

## 🎬 ANIMATION SYSTEM

### `/lib/animations.ts`
```typescript
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

// Penggunaan di setiap section:
// <motion.section
//   variants={staggerContainer}
//   initial="hidden"
//   whileInView="visible"
//   viewport={{ once: true, margin: "-80px" }}
// >
//   <motion.div variants={fadeUp}>content</motion.div>
// </motion.section>
```

### `globals.css` — Keyframes Tambahan
```css
@keyframes float-petal {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-18px) rotate(12deg); opacity: 0.55; }
}

@keyframes spin-vinyl {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-cta {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.float-1 { animation: float-petal 9s ease-in-out infinite; }
.float-2 { animation: float-petal 11s ease-in-out infinite 1.5s; }
.float-3 { animation: float-petal 8s ease-in-out infinite 3s; }
.float-4 { animation: float-petal 12s ease-in-out infinite 0.5s; }
.float-5 { animation: float-petal 10s ease-in-out infinite 2s; }
.float-6 { animation: float-petal 9s ease-in-out infinite 4s; }

.vinyl-spinning { animation: spin-vinyl 4s linear infinite; }
.vinyl-paused { animation-play-state: paused; }
.pulse-cta { animation: pulse-cta 2s ease-in-out infinite; }
```

---

## 📦 PACKAGES

```bash
npm install firebase firebase-admin framer-motion lucide-react
npm install -D @types/node

# next/image, next/font sudah built-in Next.js 14
# Tailwind sudah dari create-next-app --tailwind
```

---

## 🔐 FIRESTORE SECURITY RULES

```javascript
// Firebase Console → Firestore → Rules tab

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /weddings/{slug} {
      // Publik bisa baca undangan
      allow read: if true;
      // Write hanya via Admin SDK (server-side)
      allow write: if false;

      match /rsvp/{rsvpId} {
        // Publik bisa baca ucapan
        allow read: if true;
        // Publik bisa submit RSVP dengan validasi dasar
        allow create: if
          request.resource.data.keys().hasAll(["guestName", "attendance", "createdAt"]) &&
          request.resource.data.guestName is string &&
          request.resource.data.guestName.size() > 1 &&
          request.resource.data.guestName.size() < 100 &&
          request.resource.data.attendance in ["hadir", "tidak_hadir", "mungkin"];
        // Tidak bisa edit/hapus
        allow update, delete: if false;
      }
    }
  }
}
```

---

## ✅ DEFINITION OF DONE — Sprint 1

```
Core:
  [ ] /rizki-amira terbuka di browser
  [ ] Data terbaca dari Firestore (nama, tanggal, dll muncul)
  [ ] 404 jika slug tidak ada atau isActive=false
  [ ] OG meta tag tergenerate (preview WhatsApp share benar)

UX Flow:
  [ ] OpeningOverlay muncul pertama kali
  [ ] Klik "Buka Undangan" → overlay hilang dengan animasi smooth
  [ ] Jika passwordEnabled → PasswordGate muncul setelah overlay
  [ ] Password benar → undangan tampil dengan animasi
  [ ] Password salah → shake animation + error message
  [ ] 3x salah → cooldown message

Sections (semua tampil dan fungsional):
  [ ] Cover: foto background, nama, countdown realtime, scroll indicator
  [ ] Mempelai: foto dalam wreath SVG, info ortu terbaca
  [ ] Akad & Resepsi: info lengkap, tombol Maps buka Google Maps
  [ ] Add to Calendar: generate dan download file .ics
  [ ] Gallery: masonry grid muncul, klik buka lightbox
  [ ] Lightbox: swipe/nav prev-next, close dengan X atau backdrop
  [ ] RSVP: form submit sukses, data masuk Firestore subcollection
  [ ] RSVP feed: ucapan muncul realtime (onSnapshot) tanpa refresh
  [ ] Gift: copy nomor rekening berfungsi + toast konfirmasi
  [ ] Music: play/pause berfungsi, vinyl spinning animasi

Personalization:
  [ ] ?to=NamaTamu → nama muncul di OpeningOverlay dan pre-fill RSVP

Quality:
  [ ] Tidak ada horizontal scroll di mobile
  [ ] Semua animasi smooth (tidak ada layout shift / jank)
  [ ] Touch targets ≥ 44px untuk semua elemen interaktif
  [ ] Lighthouse mobile Performance > 80
```

---

## 🔁 ITERASI TIPS

| Masalah | Prompt Fix |
|---|---|
| Font tidak load | `"Use next/font/google to import Cormorant Garamond and Plus Jakarta Sans. Apply as CSS variables on :root in layout.tsx. Use Great Vibes for couple names only."` |
| Countdown tidak realtime | `"Fix countdown timer: use useEffect with setInterval every 1000ms. Calculate days/hours/minutes/seconds from target date. Clear interval on unmount. Show 'Selesai' if past."` |
| Audio tidak autoplay | `"Browser blocks autoplay. Call audio.play() directly inside the onClick handler of the 'Buka Undangan' button. Do not call it in useEffect."` |
| Firestore permission denied | `"Set Firestore rules: allow read: if true for weddings collection, allow create: if true with field validation for rsvp subcollection."` |
| RSVP tidak realtime | `"Use Firestore onSnapshot listener: const unsub = onSnapshot(query(collection(db, 'weddings', slug, 'rsvp'), orderBy('createdAt','desc'), limit(10)), callback). Call unsub() in useEffect cleanup."` |
| Lightbox tidak smooth | `"Add Framer Motion AnimatePresence to lightbox overlay. Use initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }} on the image container."` |
| SVG ornamen tidak muncul | `"All botanical SVG elements must be inline SVG in JSX, not img tags. Use stroke='#C9A96E' fill='none' strokeWidth='0.8'. Do not use external image files for decorative elements."` |
| Copy to clipboard tidak jalan di iOS | `"iOS Safari requires navigator.clipboard.writeText inside a user gesture handler. Wrap in try/catch and fallback to document.execCommand('copy') using a temporary textarea element."` |

---

*Sprint 1 — Digital Wedding Invitation | Next.js 14 App Router + Firebase + Framer Motion*
*Template: Floral | Database: Firestore | Storage: Firebase Storage | Deploy: Vercel*


---

# 🛡️ Sprint 2: Premium CMS Dashboard (Pengantin Platform)

# Sprint 2 — CMS Dashboard (Pengantin)
# Tech: Next.js 14 + TypeScript + Tailwind + Firebase Auth + Storage
> Copy prompt ini ke Antigravity

---

## 🧠 SYSTEM PROMPT

```
You are a senior full-stack engineer and UI/UX designer building a
production-grade CMS Dashboard for a digital wedding invitation platform.

Tech stack:
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (utility-first, no component libraries)
- Framer Motion (page transitions, animated inputs)
- Firebase (Auth + Firestore + Storage)

Design philosophy:
- Dashboard Theme: Dark editorial — charcoal (#110F0F) base, zinc card surfaces,
  amber-500 (#F59E0B) as the primary brand accent, white/80 text.
- Split-screen on desktop: Left 60% = form/table, Right 40% = live iPhone mockup iframe.
- Mobile: single column, live preview hidden behind a floating "Preview" tab button.
- Fonts: Inter or Plus Jakarta Sans for all dashboard UI.
- Every form input, button, table row must be fully functional with real Firestore reads/writes.

Write complete, working, production-ready code. No placeholders,
no TODOs, no simplified versions. Implement everything as specified.
```

---

## 📁 FILE STRUCTURE

```
/app
  /login
    page.tsx              ← Email+password login form (Firebase Auth)
  /register
    page.tsx              ← New couple registration form
  /dashboard
    layout.tsx            ← Auth guard + sidebar shell
    page.tsx              ← Overview: stats widgets + RSVP table + link generator
    /edit
      page.tsx            ← Multi-step wizard + live iframe preview
  /api
    /upload
      route.ts            ← Firebase Storage multipart upload endpoint

/components
  /dashboard
    Sidebar.tsx           ← Left nav: logo, menu links, logout button
    StatWidget.tsx        ← Reusable metric card (icon + number + label)
    RSVPTable.tsx         ← Sortable table of RSVP entries + delete action
    LinkGenerator.tsx     ← Guest name input → personalized URL + copy button
    IframePreview.tsx     ← iPhone chassis + iframe of /[slug]?preview=true
    WizardProgress.tsx    ← Step indicator bar (5 steps)
    /wizard
      StepIdentitas.tsx   ← Bride & groom names, nicknames, parents, photos
      StepAcara.tsx       ← Akad & resepsi date/time/venue/address/maps
      StepMedia.tsx       ← Cover photo, gallery upload (max 10), music
      StepHadiah.tsx      ← Bank accounts (add/remove), e-wallets, gift registry
      StepPengaturan.tsx  ← Password toggle+input, template picker, slug display

/lib
  auth.ts                 ← signIn, signUp, signOut, getCurrentUser helpers
  storage.ts              ← uploadFile(file, path) → download URL helper

/types
  dashboard.ts            ← DashboardUser interface
```

---

## 🔥 FIREBASE SETUP ADDITIONS

### Firebase Auth — Enable in Console
Enable **Email/Password** provider in Firebase Console → Authentication → Sign-in method.

### Firestore — Updated Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Wedding profiles: public read, owner-only write
    match /weddings/{slug} {
      allow read: if true;
      allow create: if request.auth != null
                   && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null
                            && resource.data.uid == request.auth.uid;

      // RSVP subcollection: public read+write (guests submit without login)
      match /rsvp/{rsvpId} {
        allow read: if true;
        allow write: if request.resource.data.guestName != null
                     && request.resource.data.guestName.size() >= 2
                     && request.resource.data.attendance in
                        ['hadir', 'tidak_hadir', 'mungkin'];
      }
    }
  }
}
```

### Firebase Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Only authenticated users can upload to their own folder
    match /weddings/{uid}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## 📐 TYPESCRIPT INTERFACES

### `/types/dashboard.ts`
```typescript
export interface DashboardUser {
  uid: string;
  email: string;
  displayName?: string;
  weddingSlug?: string;   // linked wedding document ID
  createdAt: string;
}
```

### `/types/wedding.ts` — Updated fields for Sprint 2
```typescript
// Add these fields to the existing WeddingData interface:
export interface WeddingData {
  // ... all Sprint 1 fields ...

  // NEW in Sprint 2:
  uid: string;              // Firebase Auth UID of the managing couple
  templateId: "floral" | "brush" | "modern";
}
```

---

## 🔑 LIB: `/lib/auth.ts`

```typescript
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function signIn(email: string, password: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const user = credential.user;

  // Create user profile document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName,
    createdAt: new Date().toISOString(),
  });

  return user;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserWeddingSlug(uid: string): Promise<string | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data().weddingSlug ?? null;
}
```

---

## 📦 LIB: `/lib/storage.ts`

```typescript
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload a file to Firebase Storage under weddings/{uid}/{path}
 * Returns the public download URL.
 */
export async function uploadFile(
  uid: string,
  file: File,
  path: string
): Promise<string> {
  const storageRef = ref(storage, `weddings/${uid}/${path}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

/**
 * Generate a unique filename with timestamp to avoid collisions.
 */
export function generateFileName(original: string): string {
  const ext = original.split(".").pop();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
}
```

---

## 🔐 PAGE: `/app/login/page.tsx`

```
Full-page centered login card. No sidebar. Clean editorial aesthetic.

LAYOUT: min-h-screen bg-[#0D0B0B] flex items-center justify-center px-4

CARD: bg-[#181616] border border-zinc-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl

CONTENT (flex-col gap-6):
  1. Logo/Brand (top center):
     SVG rose icon (gold, 32px) + text "RizuInvitation"
     Plus Jakarta Sans, sm, tracking-widest, zinc-400

  2. Heading:
     "Masuk ke Dashboard"
     Plus Jakarta Sans, xl, font-semibold, white

  3. Subtext:
     "Kelola undangan pernikahan Anda"
     text-sm text-zinc-400

  4. Form (flex-col gap-4):
     - Email input:
       label: "Email" (10px, uppercase, tracking-widest, amber-400)
       input: type="email", bg-[#221F1F] border border-zinc-800
              rounded-lg px-4 py-3 text-sm text-white w-full
              focus:border-amber-500 focus:outline-none transition-colors
              placeholder="email@anda.com"

     - Password input:
       label: "Kata Sandi"
       input: type="password", same styling
       Kanan: toggle show/hide (Eye icon, zinc-400, absolute right-3)

     - Error message (jika ada):
       text-rose-400 text-xs bg-rose-500/10 px-3 py-2 rounded-lg

     - Submit button:
       "Masuk" — bg-amber-500 hover:bg-amber-400 text-[#141212]
       font-bold py-3 rounded-xl w-full uppercase tracking-widest text-xs
       transition-all disabled:opacity-50
       Loading state: spinner + "Memuat..."

  5. Footer links:
     "Belum punya akun?" + link "Daftar di sini" → /register
     text-xs text-zinc-400

BEHAVIOR:
  - onSubmit: call signIn(email, password)
  - On success: router.push("/dashboard")
  - On error: display Firebase error message (invalid-credential, user-not-found, etc.)
              mapped to Indonesian: "Email atau kata sandi salah"
  - Form submit on Enter key
  - Disable form while loading
```

---

## 📝 PAGE: `/app/register/page.tsx`

```
Registration page for new couples. Same visual style as login.

LAYOUT: Same as login page

CARD CONTENT (flex-col gap-6):
  1. Brand same as login

  2. Heading: "Buat Akun Pengantin"
     Subtext: "Gratis. Tidak perlu kartu kredit."

  3. Form (flex-col gap-4):
     - Nama Lengkap:
       label: "Nama Lengkap"
       input: type="text", placeholder="cth: Rizki & Amira"

     - Slug URL:
       label: "URL Undangan Anda"
       Prefix display: "rizuinvitation.com/" (inline, zinc-500, non-editable)
       input: type="text", placeholder="rizki-amira"
       Validasi: lowercase only, a-z 0-9 hyphens, min 3 chars
       Realtime availability check: debounce 500ms → Firestore .get()
       Status indicator: ✓ green "Tersedia" | ✗ red "Sudah digunakan"

     - Email input

     - Password input (min 8 chars)

     - Confirm password input
       Error jika tidak cocok: "Kata sandi tidak cocok"

     - Submit: "Buat Akun & Mulai"

  4. Footer: "Sudah punya akun?" → /login

BEHAVIOR:
  onSubmit:
    1. Validate all fields
    2. Check slug availability one final time
    3. signUp(email, password, displayName)
    4. Create /weddings/{slug} document with uid + seed data from dummyWeddingData
    5. Update /users/{uid}.weddingSlug = slug
    6. router.push("/dashboard/edit") ← go directly to wizard
```

---

## 🏗️ LAYOUT: `/app/dashboard/layout.tsx`

```
Auth guard + persistent sidebar shell for all /dashboard/* routes.

BEHAVIOR:
  - Mount: call onAuthChange()
  - If no user → router.push("/login")
  - While checking: render full-page loading spinner

  - Load user's weddingSlug from Firestore /users/{uid}
  - Pass slug via React Context to all child components
    (so every page knows which wedding to read/write)

LAYOUT (after auth confirmed):
  flex min-h-screen bg-[#0D0B0B]

  LEFT: <Sidebar /> — fixed w-64, full height
  RIGHT: <main> flex-grow overflow-y-auto px-8 py-10

CONTEXT PROVIDER:
  Create DashboardContext with { user, slug, setSlug }
  Wrap children in this context inside the layout
```

### Context definition
```typescript
// /lib/dashboard-context.tsx
"use client";
import { createContext, useContext } from "react";
import { User } from "firebase/auth";

interface DashboardContextValue {
  user: User | null;
  slug: string;
}

export const DashboardContext = createContext<DashboardContextValue>({
  user: null,
  slug: "",
});

export const useDashboard = () => useContext(DashboardContext);
```

---

## 🗂️ COMPONENT: `Sidebar.tsx`

```
Fixed left navigation panel. Always visible on desktop. Drawer on mobile.

LAYOUT:
  w-64 min-h-screen bg-[#110F0F] border-r border-zinc-800/60
  flex flex-col px-4 py-6 gap-2

TOP (mb-8):
  SVG rose logo (24px, amber-500) + "Rizu" text
  Plus Jakarta Sans, sm, font-semibold, white

MENU ITEMS (flex-col gap-1):
  Each item: flex items-center gap-3 px-4 py-2.5 rounded-xl
             text-sm font-medium transition-colors
  Active:    bg-amber-500/10 text-amber-400
  Inactive:  text-zinc-400 hover:text-white hover:bg-zinc-800/50

  Items:
    - LayoutDashboard icon  "Ringkasan"      → /dashboard
    - Edit icon             "Edit Undangan"  → /dashboard/edit
    - Eye icon              "Lihat Undangan" → /{slug} (new tab, target="_blank")
    - Share2 icon           "Bagikan Link"   → /dashboard (scrolls to link generator)

BOTTOM (mt-auto):
  Divider: border-t border-zinc-800

  User info (flex items-center gap-3 px-4 py-3):
    Avatar circle: w-8 h-8 rounded-full bg-amber-500/20 text-amber-400
                   Initial: user.email[0].toUpperCase()
    Text:
      user.displayName (text-xs font-semibold white truncate)
      user.email (text-[10px] zinc-500 truncate)

  Logout button (flex items-center gap-2 px-4 py-2.5 mt-1):
    LogOut icon (14px, rose-400)
    "Keluar" (text-sm text-rose-400 hover:text-rose-300)
    onClick: signOut() → router.push("/login")
```

---

## 📊 PAGE: `/app/dashboard/page.tsx`

```
Overview dashboard. Shows RSVP analytics, wishes management table,
and personalized link generator.

DATA LOADING (useEffect):
  1. Get slug from DashboardContext
  2. getDocs(collection(db, "weddings", slug, "rsvp"))
  3. Calculate: hadir count, mungkin count, tidakHadir count
  4. totalPorsi = sum of guestCount where attendance === "hadir"

SECTIONS (flex-col gap-8 max-w-6xl mx-auto):

1. PAGE HEADER:
   h1: "Ringkasan Undangan" (font-serif text-3xl text-amber-50)
   p: "/{slug}" (text-sm text-zinc-400 font-mono)

2. STAT WIDGETS GRID (grid grid-cols-2 md:grid-cols-4 gap-4):
   Use <StatWidget> component for each:
   - Hadir:         value=stats.hadir,       icon=<UserCheck />,  color=emerald
   - Mungkin:       value=stats.mungkin,     icon=<HelpCircle />, color=amber
   - Berhalangan:   value=stats.tidakHadir,  icon=<UserX />,      color=rose
   - Total Porsi:   value=stats.totalPorsi,  icon=<UtensilsCrossed />, color=blue

3. LINK GENERATOR CARD (bg-[#181616] border border-zinc-800 rounded-2xl p-6):
   Header: Share2 icon + "Buat Link Undangan Personal"
   Subtext: "Nama tamu akan tampil di layar pembuka undangan."
   
   Input row (flex gap-3 mt-4):
     - text input: placeholder="Nama tamu (misal: Pak Budi Santoso)"
     - button "Buat Link": bg-amber-500, onClick → generateLink()
   
   Generated result (AnimatePresence, slide-in from below):
     - URL display: monospace, bg-[#221F1F] rounded-xl px-4 py-3
     - "Salin" button: amber-400, onClick → clipboard.writeText + toast
     - "WhatsApp" button: emerald-400
       href: "https://wa.me/?text=" + encodeURIComponent(
               `Assalamu'alaikum Bapak/Ibu ${guestName},\n\n` +
               `Kami mengundang kehadiran Anda di pernikahan kami.\n` +
               `Silakan buka undangan digital kami di:\n${generatedLink}`
             )
     - "Salin Semua" bulk mode: textarea of multiple names (one per line)
       Generates all links at once as a list

4. RSVP TABLE CARD (bg-[#181616] border border-zinc-800 rounded-2xl overflow-hidden):
   Header: MessageSquare icon + "Ucapan & Doa Tamu (N)"
   
   TABLE (w-full text-sm):
     Columns: No | Nama Tamu | Kehadiran | Porsi | Ucapan | Waktu | Hapus
     
     Each row:
       - No: number, zinc-500
       - Nama: font-semibold text-amber-100
       - Kehadiran: colored badge (emerald/amber/rose)
       - Porsi: number or "—" if not hadir
       - Ucapan: italic text-zinc-400, max-w-xs truncate, tooltip on hover
       - Waktu: relative time (getRelativeTime util)
       - Hapus: Trash2 icon button, rose-500, confirms with window.confirm()
     
     Empty state:
       Heart icon (animated pulse, rose-400) centered
       "Belum ada tamu yang mengonfirmasi kehadiran"
     
   Export button (top-right of card header):
     Download icon + "Export CSV"
     onClick: convert wishes[] to CSV string, trigger download
```

---

## 📋 COMPONENT: `StatWidget.tsx`

```typescript
interface StatWidgetProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "emerald" | "amber" | "rose" | "blue";
}

// Color map:
// emerald: bg-emerald-500/10 text-emerald-400 border-emerald-500/20
// amber:   bg-amber-500/10   text-amber-400   border-amber-500/20
// rose:    bg-rose-500/10    text-rose-400    border-rose-500/20
// blue:    bg-blue-500/10    text-blue-400    border-blue-500/20

// LAYOUT: bg-[#181616] border border-zinc-800 rounded-2xl p-5
//         flex items-center justify-between gap-4
// LEFT:   label (text-xs text-zinc-400), value (text-3xl font-bold text-white mt-1)
// RIGHT:  icon in colored circle (w-11 h-11 rounded-full flex items-center justify-center)
```

---

## ✏️ PAGE: `/app/dashboard/edit/page.tsx`

```
Split-screen wizard. Left = form, Right = live iPhone iframe.

LAYOUT: flex gap-6 h-[calc(100vh-5rem)] overflow-hidden

STATE:
  - activeStep: number (1-5), default 1
  - formData: Partial<WeddingData>, loaded from Firestore on mount
  - isSaving: boolean
  - slug from DashboardContext

DATA LOAD: getDoc(doc(db, "weddings", slug)) → setFormData(snap.data())

SAVE: setDoc(doc(db, "weddings", slug), formData, { merge: true })
  Success: amber slide-up toast "Perubahan disimpan ✓" (3s auto-dismiss)
  Error: rose toast

LEFT PANEL (w-full lg:w-3/5, flex flex-col gap-5, overflow-y-auto, pr-4):
  1. WizardProgress: 5 step indicator bar
     Active step: amber circle + label
     Completed: checkmark circle
     Future: zinc circle

  2. Step content card (bg-[#181616] border border-zinc-800 rounded-2xl p-6):
     step 1 → <StepIdentitas>
     step 2 → <StepAcara>
     step 3 → <StepMedia>
     step 4 → <StepHadiah>
     step 5 → <StepPengaturan>

  3. Navigation footer (flex justify-between):
     "← Sebelumnya" (zinc-400, disabled on step 1)
     "Langkah N dari 5" (zinc-500, text-xs, text-center)
     "Berikutnya →" (amber-500) | "Simpan Perubahan" on step 5

RIGHT PANEL (hidden lg:flex, w-2/5):
  Card: bg-[#181616] border border-zinc-800 rounded-2xl p-6 h-full
  "● Live Preview" label (pulsing green dot, zinc-400, tracking-widest, 10px)

  iPhone 14 chassis (w-[260px] h-[530px]):
    Outer: rounded-[44px] border-[10px] border-zinc-700 bg-zinc-900 overflow-hidden
    Dynamic Island: absolute top-2, w-24 h-6 bg-black rounded-full
    Home bar: absolute bottom-2, w-20 h-1 bg-zinc-600 rounded-full
    <iframe src={`/${slug}?preview=true`} className="w-full h-full border-none" />
    Note: ?preview=true skips OpeningOverlay and PasswordGate
```

---

## 🧑‍🤝‍🧑 WIZARD STEP 1: `StepIdentitas.tsx`

```
h2: "Profil Mempelai"
p: "Data ini tampil di halaman mempelai undangan Anda."

GROOM (section label "♂ Mempelai Pria", amber-400):
  grid grid-cols-2 gap-4:
    - "Nama Lengkap" → groomName
    - "Nama Panggilan" → groomNickname
    - "Nama Ayah" → groomFatherName  placeholder: "Bpk. Hendra Pratama"
    - "Nama Ibu" → groomMotherName   placeholder: "Ibu Sari Wulandari"
  - "Instagram (opsional)" → groomInstagram, prefix "@"

DIVIDER: border-t border-zinc-800/60

BRIDE (same 5 fields with bride prefix)

OPENING QUOTE:
  - Textarea "Kutipan/Ayat Pembuka" → openingQuote (rows=3, resize-none)
    placeholder: "Dan di antara tanda-tanda (kebesaran)-Nya..."
  - Input "Sumber" → openingQuoteSource, placeholder: "QS. Ar-Rum: 21"

INPUT STYLE (all steps):
  label: block text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5
  input: w-full bg-[#221F1F] border border-zinc-700 rounded-lg px-4 py-2.5
         text-sm text-white focus:border-amber-500 focus:outline-none
         transition-colors placeholder:text-zinc-600
```

---

## 📅 WIZARD STEP 2: `StepAcara.tsx`

```
h2: "Detail Acara"
p: "Atur tanggal, waktu, dan lokasi akad nikah dan resepsi."

AKAD (toggle "Tampilkan Akad Nikah" → akadEnabled):
  AnimatePresence height collapse when disabled
  When on:
    grid grid-cols-2 gap-4:
      - datetime-local → akadDate
      - "Nama Venue" → akadVenue
    - Textarea "Alamat" → akadAddress (rows=2)
    - "Google Maps URL" → akadMapsUrl + ExternalLink icon to test URL

DIVIDER

RESEPSI (same structure, toggle → resepsiEnabled):
  Same 4 fields with resepsi prefix

INFO BOX (amber, mt-4):
  "Tanggal ini digunakan untuk countdown timer di cover undangan."
  bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 text-xs text-amber-200/70
```

---

## 🖼️ WIZARD STEP 3: `StepMedia.tsx`

```
h2: "Foto & Musik"
p: "Unggah foto dan pilih musik latar undangan Anda."

COVER PHOTO:
  Preview: aspect-[3/4] max-w-[200px] rounded-2xl overflow-hidden
    If url: <img> | If empty: dashed border, ImagePlus icon, zinc-500
  Button "Ganti Foto Sampul":
    hidden <input type="file" accept="image/*">
    onChange: uploadFile(uid, file, `cover-${generateFileName}`) → update coverPhoto
    Upload state: spinner overlay on preview

MEMPELAI PHOTOS (grid grid-cols-2 gap-6):
  Same upload UI for groomPhoto and bridePhoto
  aspect-square, object-cover, object-top

GALLERY (max 10):
  Label + "Drag untuk urutkan ulang"
  grid grid-cols-3 gap-3:
    Each photo: aspect-square rounded-xl object-cover
      × button: top-right, bg-black/60, rose-400, removes from array
    Add cell (if < 10): dashed, Plus icon, accepts multiple files
    Each: uploadFile → append URL to galleryPhotos

MUSIC:
  Toggle → musicEnabled
  When on:
    - "Judul Lagu" → musicTitle, placeholder "Can't Help Falling in Love"
    - "URL MP3" → musicUrl, placeholder "https://..."
    - Button "Unggah MP3": input accept="audio/mpeg"
      onChange: uploadFile(uid, file, `music/${generateFileName}`) → musicUrl
    - <audio controls src={musicUrl}> preview if url exists
```

---

## 💳 WIZARD STEP 4: `StepHadiah.tsx`

```
h2: "Hadiah & Angpao Digital"
p: "Opsional. Isi jika ingin menerima hadiah dari tamu."

Toggle "Tampilkan Bagian Hadiah" → giftEnabled

BANK ACCOUNTS:
  Label "Rekening Bank" (amber-400)
  Each card (bg-[#221F1F] border border-zinc-700 rounded-xl p-4 relative):
    grid grid-cols-3 gap-3:
      - "Bank" → bankName (placeholder: BCA)
      - "Nomor Rekening" → accountNumber
      - "Atas Nama" → accountName
    × delete button: absolute top-3 right-3, rose-400
  "+ Tambah Rekening": dashed border, amber on hover
    onClick: append { bankName:"", accountNumber:"", accountName:"" }

E-WALLETS:
  Same pattern for { provider, number }
  Provider: text input with datalist suggestions: GoPay, OVO, Dana, ShopeePay, LinkAja
  "+ Tambah E-Wallet"

GIFT REGISTRY:
  "Link Wishlist (Opsional)" → giftRegistryUrl
  placeholder: "https://tokopedia.com/wishlist/..."
  ExternalLink icon to preview

NOTE: "Nomor ini ditampilkan dengan tombol salin otomatis kepada tamu."
  bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 text-xs text-zinc-400
```

---

## ⚙️ WIZARD STEP 5: `StepPengaturan.tsx`

```
h2: "Pengaturan Undangan"

URL SECTION:
  "URL Undangan Anda" label
  Display: bg-zinc-900 rounded-xl px-4 py-3 font-mono text-sm text-amber-200
    "rizuinvitation.com/{slug}"
  CopyIcon button beside → clipboard.writeText

PASSWORD GATE:
  Toggle "Aktifkan Kata Sandi Privat" → passwordEnabled
  When on (AnimatePresence):
    Input type="text" → password
    placeholder: "min. 6 karakter"
    Helper: "Bagikan ini kepada tamu saat mengirim undangan."

TEMPLATE SELECTOR:
  "Pilih Template Desain"
  grid grid-cols-2 md:grid-cols-3 gap-4:
    1. Floral: from-[#F5EFE8] to-[#E8D5C4], available
    2. Brush: from-[#1a1a1a] to-[#2d2d2d], badge "Segera Hadir" (disabled)
    3. Modern: from-[#f0f4ff] to-[#dce8ff], badge "Segera Hadir" (disabled)
  Selected: border-2 border-amber-500 shadow-amber-500/20 shadow-lg
  Not selected: border-2 border-zinc-800 hover:border-zinc-600

DANGER ZONE:
  Section: "Zona Berbahaya" (text-rose-400)
  Card: border border-rose-900/50 rounded-2xl p-5
  "Hapus Undangan" button: border border-rose-800 text-rose-400
  onClick: window.confirm() → deleteDoc → router.push("/dashboard")
  Warning: "Tindakan ini tidak dapat dibatalkan. Semua data tamu akan hilang."
```

---

## 📱 COMPONENT: `IframePreview.tsx`

```typescript
// Props: { slug: string }
// Renders iPhone chassis with iframe of /{slug}?preview=true

// IMPORTANT — Update WeddingInvitation.tsx (Sprint 1):
// Add preview mode detection:
//   const isPreview = typeof window !== "undefined"
//     && new URLSearchParams(window.location.search).has("preview");
// Then: isOverlayOpen defaults to !isPreview
//       isPasswordGateOpen defaults to !isPreview

// iPhone chassis:
// Container: w-[260px] h-[530px] relative mx-auto
// Outer: rounded-[44px] border-[10px] border-zinc-700 shadow-2xl bg-zinc-900 overflow-hidden
// Dynamic Island: absolute top-2, w-24 h-6 bg-black rounded-full, z-10, centered
// Home bar: absolute bottom-2, w-20 h-1 bg-zinc-600 rounded-full, centered
// iframe: w-full h-full border-none, title="Preview Undangan"
// pointer-events: allow scrolling, block clicks (pointer-events-none on wrapper overlay)
```

---

## 🔼 API: `/app/api/upload/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const uid = formData.get("uid") as string;
  const path = formData.get("path") as string;

  if (!file || !uid || !path) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File terlalu besar (maks 10MB)" }, { status: 400 });
  }

  const allowed = ["image/jpeg","image/png","image/webp","audio/mpeg","audio/mp3"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Tipe file tidak didukung" }, { status: 400 });
  }

  // Upload via client SDK from frontend instead if Admin Storage not configured:
  // Use uploadFile() from /lib/storage.ts on the client component directly.
  // This API route is the server-side alternative for larger files.

  return NextResponse.json({ message: "Use client-side uploadFile() from /lib/storage.ts" }, { status: 200 });
}
```

---

## 🏁 SPRINT 2 VERIFICATION PLAN

### Automated Checks
```bash
npm run build
```
Must exit code 0, zero TypeScript errors.

### Manual Verification Flow

1. **Auth Guard**: Open `/dashboard` incognito → must redirect to `/login`

2. **Registration Flow**:
   - Go to `/register`, fill form, slug "test-wedding"
   - Slug field shows "Tersedia" (green) in real-time
   - After submit: redirected to `/dashboard/edit`
   - Firebase Console: verify `/weddings/test-wedding` document created with `uid`

3. **Wizard Persistence**:
   - Step 1: change bride name → step 5: click "Simpan Perubahan"
   - Refresh `/dashboard/edit` → name must persist from Firestore

4. **Photo Upload**:
   - Step 3: upload a cover photo
   - Verify image appears in Firebase Storage Console under `weddings/{uid}/cover-*`
   - Verify `coverPhoto` URL updated in Firestore

5. **Live Preview**:
   - With `npm run dev` running, right panel iframe must render the invitation
   - No opening overlay and no password gate visible in preview

6. **Dashboard RSVP**:
   - Open `/{slug}` in a new tab, submit RSVP as a guest
   - Go to `/dashboard` → stat widget "Hadir" increments, entry appears in table
   - Click Trash icon → entry removed from Firestore and table

7. **Personalized Link Generator**:
   - Type "Pak Hendra Wijaya" → click "Buat Link"
   - Result: `http://localhost:3000/{slug}?to=Pak+Hendra+Wijaya`
   - Open that URL → overlay shows "Kepada Yth. Pak Hendra Wijaya"
   - Click WhatsApp button → opens wa.me with pre-filled invitation message

8. **CSV Export**:
   - Click "Export CSV" in dashboard
   - Downloaded file must contain correct headers and all RSVP rows



---

# 📣 E-Invitation Landing Page & Showcase Prompt Specification

# Wedding Invitation Web App — Full Implementation Prompt
> Copy prompt ini ke Antigravity, v0, Bolt, atau Lovable

---

## 🧠 SYSTEM CONTEXT (Paste sebagai System Prompt / Context)

```
You are a senior frontend engineer and UI/UX designer specializing in elegant,
conversion-optimized landing pages. Build a complete wedding invitation
service website in Bahasa Indonesia using Next.js 14 App Router + TypeScript +
Tailwind CSS + Framer Motion.

The site is for an Indonesian digital wedding invitation service.
Design language: romantic, luxurious, modern — soft golds, blush pinks,
ivory whites, with elegant serif + sans-serif font pairings.
Avoid generic AI aesthetics. Every section should feel intentionally designed.
```

---

## 🗂️ FILE STRUCTURE

```
/app
  layout.tsx              ← Navbar + Footer wrapper (global)
  page.tsx                ← Landing page (all sections)
  /template
    page.tsx              ← Template gallery page
    /[slug]/page.tsx      ← Template detail (future)

/components
  Navbar.tsx
  Hero.tsx
  TemplateShowcase.tsx
  Pricing.tsx
  Testimonials.tsx
  FAQ.tsx
  CTABanner.tsx
  Footer.tsx

/public
  /images/templates/
```

---

## ⚙️ TECH STACK & GLOBAL CONFIG

```
Framework   : Next.js 14 (App Router)
Language    : TypeScript
Styling     : Tailwind CSS (utility-first)
Animation   : Framer Motion
Icons       : Lucide React
Fonts       : Google Fonts
  - Playfair Display (headings, display text)
  - DM Sans (body, UI text)

Color Palette (CSS Variables):
  --color-primary    : #C9A96E  (warm gold)
  --color-secondary  : #E8D5C4  (blush)
  --color-accent     : #8B6F47  (deep gold)
  --color-background : #FDFAF7  (ivory white)
  --color-surface    : #F5EFE8  (soft cream)
  --color-text       : #2C2C2C  (near black)
  --color-muted      : #9A8878  (warm gray)
  --color-whatsapp   : #25D366  (WA green)

Global Behavior:
  - Mobile-first responsive (sm / md / lg / xl breakpoints)
  - Smooth scroll: scroll-behavior: smooth on <html>
  - All sections have Framer Motion fade-up entrance animations
    (initial: opacity 0, y: 40 → animate: opacity 1, y: 0)
    with staggered children (staggerChildren: 0.1)
  - Use viewport={{ once: true }} for all scroll animations
  - No external UI component libraries (shadcn, MUI, etc.)
  - All prices formatted: Rp X.XXX.XXX (Indonesian locale)
```

---

## 1️⃣ NAVBAR

```
Component: Navbar.tsx
Type: Sticky, full-width, z-index: 50

SCROLL BEHAVIOR:
- Over hero (scrollY < 80px):
    backdrop-blur-md bg-white/10 text-white border-b border-white/20
- After scroll (scrollY >= 80px):
    bg-white text-gray-800 shadow-sm border-b border-gray-100
- Transition: transition-all duration-300 ease-in-out

LAYOUT (flex, items-center, justify-between, px-6 lg:px-16, h-16):

LEFT — Logo:
  - Small floral SVG ornament (lotus or simple botanical line art)
  - Brand name in Playfair Display italic, 1.25rem
  - Color: gold when transparent, deep-gold when solid

CENTER — Nav Links (hidden on mobile, flex on md+):
  - "Produk"   → hover dropdown (see below)
  - "Template" → href="#template"  (smooth scroll)
  - "Paket"    → href="#paket"
  - "FAQ"      → href="#faq"
  - Link style: text-sm font-medium tracking-wide
    hover:text-[--color-primary] transition-colors duration-200
  - Active link: underline offset with gold color

PRODUK DROPDOWN (appears on hover, animated with Framer Motion):
  Trigger: "Produk" with ChevronDown icon (rotates 180° on open)
  Panel: absolute, white bg, rounded-xl, shadow-xl, p-4, w-80
  4 items, each with:
    - Icon (emoji or Lucide icon)
    - Title (font-semibold, text-sm)
    - Description (text-xs text-muted, 1 line)

  Items:
  [🎴] Undangan Digital
       "Undangan pernikahan berbasis web yang elegan"

  [📲] WA Blast Otomatis
       "Kirim ke ratusan tamu sekaligus dengan sekali klik"

  [🎁] E-Gift & E-Angpao
       "Terima hadiah dan angpao langsung secara digital"

  [💌] Personalized Invitation
       "Nama tamu muncul otomatis di setiap undangan"

RIGHT — WhatsApp CTA Button:
  - WhatsApp SVG icon (#25D366) + text "Pesan via WhatsApp"
  - Style: bg-green-500 hover:bg-green-600 text-white
           px-5 py-2.5 rounded-full text-sm font-medium
           transition-colors duration-200 flex items-center gap-2
  - href: https://wa.me/628XXXXXXXXX?text=Halo%20kak%2C%20saya%20tertarik%20dengan%20undangan%20digital.%20Boleh%20info%20lebih%20lanjut%3F

MOBILE NAVBAR (below md breakpoint):
  - Show only Logo (left) + Hamburger icon (right)
  - Hamburger: 3-line icon, animates to X on open (Framer Motion)
  - Drawer: slides down from navbar, white bg, full-width
  - Drawer contents (stacked vertically, py-4 px-6):
      Produk (expands sub-items on tap)
      Template
      Paket
      FAQ
      ── divider ──
      [WhatsApp Button] full-width, rounded-full, bg-green-500
  - Drawer closes on: link click, outside tap, scroll
```

---

## 2️⃣ HERO SECTION

```
Component: Hero.tsx
Style: Full-viewport height (min-h-screen), centered content

BACKGROUND:
  - Base: ivory (#FDFAF7)
  - Soft radial gradient overlay: from blush center to ivory edges
  - Botanical SVG decorations: 4 corner ornaments (line art style)
    top-left, top-right, bottom-left, bottom-right
    Opacity 0.15, pointer-events-none
  - Floating petals animation: 6-8 small SVG petals
    float slowly with CSS keyframes (translateY + rotate, 8-12s loops)
    Random positions, opacity 0.2-0.4

CONTENT (flex-col, items-center, text-center, gap-6, max-w-3xl, mx-auto):

  1. Badge (top):
     "✨ Dipercaya 500+ Pasangan di Indonesia"
     Style: text-xs font-medium tracking-widest uppercase
            border border-[--color-primary] text-[--color-primary]
            px-4 py-1.5 rounded-full bg-[--color-primary]/10

  2. Headline (H1):
     "Undangan Digital"  ← Playfair Display italic, 4rem lg:5rem
     "Pernikahan yang"
     "Berkesan"
     Gradient text: from-[#C9A96E] to-[#8B6F47]
     Line-height: 1.1

  3. Subheadline:
     "Buat momen spesialmu abadi dengan undangan digital elegan.
      Dikirim langsung ke WhatsApp tamu, penuh cinta, tanpa kertas."
     Style: text-lg text-[--color-muted] max-w-xl mx-auto leading-relaxed

  4. CTA Buttons (flex gap-4, flex-wrap justify-center):
     Primary: "Lihat Template →"
              bg-[--color-primary] hover:bg-[--color-accent] text-white
              px-8 py-3.5 rounded-full font-medium transition-all
              hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5
     Ghost:   "Hubungi Kami"
              border-2 border-[--color-primary] text-[--color-primary]
              px-8 py-3.5 rounded-full font-medium
              hover:bg-[--color-primary] hover:text-white transition-all
              href → WhatsApp link

  5. Statistics Bar (below buttons, mt-12):
     Flex row, 4 items with dividers between:
     [500+] Pasangan  |  [3] Template Premium  |  [4.9★] Rating  |  [24/7] Support
     Style: text-2xl font-bold text-[--color-accent] Playfair Display
            text-xs text-muted below each number, uppercase tracking-wide

ENTRANCE ANIMATION:
  Badge → delay 0s, Hero text → delay 0.2s,
  Sub → delay 0.3s, CTAs → delay 0.4s, Stats → delay 0.6s
  All: fadeUp (y: 30 → 0, opacity 0 → 1, duration 0.7)
```

---

## 3️⃣ TEMPLATE SHOWCASE

```
Component: TemplateShowcase.tsx
ID: id="template"

SECTION HEADER:
  Eyebrow: "PILIH TEMPLATE"  ← text-xs uppercase tracking-widest text-muted
  Title: "Temukan Gaya Undanganmu"  ← Playfair Display, 2.5rem
  Subtitle: "Setiap template dirancang oleh desainer profesional,
             siap dipersonalisasi untuk momen spesialmu"

LAYOUT:
  3-column grid (1 col mobile, 3 col lg+)
  Each card: rounded-2xl overflow-hidden shadow-md
             hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
             border border-[--color-secondary]/50 bg-white

TEMPLATE 1 — "Ivory Grace"
  Style tags: ["Minimalis", "Modern", "Timeless"]
  Palette preview: ivory, warm gray, gold
  Mood: Clean, simple, sophisticated
  Phone mockup: Show a simplified invitation inside phone frame SVG
    - Clean white bg
    - Gold divider lines
    - Playfair Display couple names: "Reza & Natasha"
    - Date: "21 Desember 2025"
    - Minimalist floral line art divider

TEMPLATE 2 — "Bloom Garden"
  Style tags: ["Floral", "Romantis", "Feminine"]
  Palette preview: blush pink, sage green, ivory
  Mood: Romantic, garden party, dreamy
  Phone mockup:
    - Watercolor floral header (SVG illustration)
    - Blush pink background sections
    - Rounded, soft typography
    - Couple names: "Dimas & Cantika"
    - Date: "14 Februari 2026"

TEMPLATE 3 — "Royal Crest"
  Style tags: ["Mewah", "Elegan", "Royal"]
  Palette preview: dark navy, forest green, gold foil
  Mood: Regal, dramatic, luxurious
  Phone mockup:
    - Dark navy/forest green background
    - Gold typography and ornaments
    - Bold serif fonts, formal layout
    - Couple names: "Farhan & Zahra"
    - Date: "7 Juni 2026"
    - Ornate crest divider

EACH CARD BOTTOM:
  - Template name in Playfair Display italic
  - Style tag pills (3 pills)
  - "Preview" button (ghost, opens modal)
  - "Pilih Template Ini →" button (primary gold)
    → scrolls to #paket section

PREVIEW MODAL:
  Full-screen overlay (backdrop-blur-sm bg-black/60)
  Centered card (max-w-sm, mx-auto) showing full scrollable invitation preview:
    - Cover: couple names, date, "Kepada Yth. Bapak/Ibu [Nama Tamu]"
    - Mempelai section: Bride & Groom photos (placeholder circles) + names
    - Akad & Resepsi info: date, time, venue name, Google Maps button
    - Gallery: 4 photo placeholders in masonry grid
    - RSVP form: name, attendance radio, message textarea, submit button
    - Gift info: Bank transfer + E-Angpao placeholder
  Close button (X) top-right
  Close on backdrop click
```

---

## 4️⃣ PRICING SECTION

```
Component: Pricing.tsx
ID: id="paket"
Background: bg-[--color-surface] (soft cream)

SECTION HEADER:
  Eyebrow: "PAKET HARGA"
  Title: "Pilih Paket yang Sesuai"
  Subtitle: "Semua paket sudah termasuk template premium dan revisi unlimited"

LAYOUT:
  3-column grid (1 col mobile, 3 col lg+), max-w-5xl mx-auto
  Middle card (Intimate) is elevated: scale-105, z-10,
    gold border (border-2 border-[--color-primary]),
    extra shadow-2xl

────────────────────────────────────────────────
PAKET 1 — "Starter"
────────────────────────────────────────────────
Price display:
  Rp 300.000
  No strikethrough, no badge

Features (✓ checkmark in gold, text-sm):
  ✓ 50 WA Blast (Otomatis)
  ✓ Unlimited Undangan (Kirim Manual)
  ✓ Unlimited Revisi
  ✓ Editable Premium Themes
  ✓ Split Invitation
  ✓ RSVP
  ✓ Personalized Invitation
  ✓ Background Music
  ✓ Dashboard User
  ✓ Customer Service Website

CTA: "Pilih Paket Starter"
     border-2 border-[--color-primary] text-[--color-primary]
     hover:bg-[--color-primary] hover:text-white rounded-full
     href: https://viding.co/register

────────────────────────────────────────────────
PAKET 2 — "Intimate" ← MOST POPULAR
────────────────────────────────────────────────
Top badge: "✨ PALING POPULER"
           bg-[--color-primary] text-white text-xs
           px-4 py-1 rounded-full, centered above card

Price display:
  Rp 740.000  ← line-through text-muted text-sm
  Rp 670.000  ← font-bold text-2xl text-[--color-accent]
  Promo badge: "HEMAT Rp 70.000" in small pill (green bg)

Features (all Starter features PLUS):
  ✓ 100 WA Blast (Otomatis)
  ✓ E-Gift (E-Angpao + Gift Registry)  ← NEW badge
  ✓ Password Digital Invitation          ← NEW badge
  ✓ Unlimited Undangan (Kirim Manual)
  ✓ Unlimited Revisi
  ✓ Editable Premium Themes
  ✓ Split Invitation
  ✓ RSVP
  ✓ Personalized Invitation
  ✓ Background Music
  ✓ Dashboard User
  ✓ Customer Service Website

CTA: "Pilih Paket Intimate"
     bg-[--color-primary] hover:bg-[--color-accent] text-white
     rounded-full shadow-lg hover:shadow-amber-200/50
     href: https://viding.co/register

────────────────────────────────────────────────
PAKET 3 — "Royal"
────────────────────────────────────────────────
Price display:
  Rp 900.000  ← line-through text-muted text-sm
  Rp 850.000  ← font-bold text-2xl text-[--color-accent]
  Promo badge: "HEMAT Rp 50.000"

Features (all Intimate features PLUS):
  ✓ 300 WA Blast (Otomatis)
  ✓ E-Gift (E-Angpao + Gift Registry)
  ✓ Password Digital Invitation
  ✓ Unlimited Undangan (Kirim Manual)
  ✓ Unlimited Revisi
  ✓ Editable Premium Themes
  ✓ Split Invitation
  ✓ RSVP
  ✓ Personalized Invitation
  ✓ Background Music
  ✓ Dashboard User
  ✓ Customer Service Website

CTA: "Pilih Paket Royal"
     border-2 border-[--color-primary] text-[--color-primary]
     hover:bg-[--color-primary] hover:text-white rounded-full
     href: https://viding.co/register

────────────────────────────────────────────────
BELOW CARDS — Feature Comparison Table:
  Simple table (hidden on mobile, visible on md+)
  Rows: all features | Columns: Starter / Intimate / Royal
  ✓ = gold check | ✗ = gray dash
  Sticky first column (feature name)
```

---

## 5️⃣ TESTIMONIALS

```
Component: Testimonials.tsx

SECTION HEADER:
  Title: "Dipercaya Ratusan Pasangan Bahagia ❤️"
  Subtitle: "Cerita nyata dari pasangan yang sudah mempercayakan momen spesial mereka"

LAYOUT:
  2-row infinite horizontal marquee (CSS animation, no JS library)
  Row 1: scrolls left → right (normal)
  Row 2: scrolls right → left (reverse)
  Gap between cards: 1.5rem
  Each card: w-80 flex-shrink-0, white bg, rounded-2xl,
             p-6, shadow-sm border border-[--color-secondary]/30

6 TESTIMONIAL CARDS (generate realistic Indonesian content):

Card 1:
  Stars: ⭐⭐⭐⭐⭐
  Quote: "Undangannya cantik banget! Semua tamu pada nanya buat di mana,
          langsung kami rekomendasiin. Prosesnya cepat dan CS-nya super responsif."
  Name: Rizki & Amira
  Date: Oktober 2024
  Template: Bloom Garden
  Package: Intimate

Card 2:
  Stars: ⭐⭐⭐⭐⭐
  Quote: "Fitur WA Blast-nya luar biasa, hemat waktu banget. 300 undangan
          terkirim dalam hitungan menit. Worth it banget paket Royal-nya!"
  Name: Farhan & Zahra
  Date: Desember 2024
  Template: Royal Crest
  Package: Royal

Card 3:
  Stars: ⭐⭐⭐⭐⭐
  Quote: "Suka banget sama desain Ivory Grace, simple tapi tetep elegan.
          Revisinya unlimited dan timnya sabar banget nemenin kita."
  Name: Dimas & Cantika
  Date: November 2024
  Template: Ivory Grace
  Package: Starter

Card 4:
  Stars: ⭐⭐⭐⭐⭐
  Quote: "E-angpao-nya jadi fitur favorit kami. Banyak tamu dari luar kota
          yang seneng bisa kasih angpao digital. Praktis banget!"
  Name: Bimo & Sekar
  Date: Januari 2025
  Template: Bloom Garden
  Package: Intimate

Card 5:
  Stars: ⭐⭐⭐⭐⭐
  Quote: "Pake fitur password biar undangan privat, keren banget konsepnya.
          Template Royal Crest-nya mewah, pas banget sama tema pernikahan kami."
  Name: Hendra & Nadia
  Date: Februari 2025
  Template: Royal Crest
  Package: Royal

Card 6:
  Stars: ⭐⭐⭐⭐⭐
  Quote: "Awalnya ragu, tapi setelah coba ternyata memuaskan. RSVP-nya
          langsung masuk dashboard, jadi gampang banget ngitung tamu yang hadir."
  Name: Aldi & Putri
  Date: Maret 2025
  Template: Ivory Grace
  Package: Starter

CARD FOOTER:
  Avatar: initials circle (pastel bg, 2-letter initials, font-semibold)
  Name: font-semibold text-sm
  Date: text-xs text-muted
  Template badge: "Template: Bloom Garden" pill (gold border, text-xs)
  Package badge: "Paket Intimate" pill (green bg, text-xs, text-white)

MARQUEE CSS:
  @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  @keyframes marquee-reverse { from { transform: translateX(-50%) } to { transform: translateX(0) } }
  animation: marquee 30s linear infinite
  Pause on hover: hover:animation-play-state: paused
```

---

## 6️⃣ FAQ SECTION

```
Component: FAQ.tsx
ID: id="faq"
Background: bg-[--color-background]

SECTION HEADER:
  Title: "Pertanyaan yang Sering Ditanyakan"
  Subtitle: "Masih ada yang mengganjal? Kami siap bantu lewat WhatsApp"

LAYOUT:
  Single column, max-w-2xl mx-auto
  8 accordion items
  Animated expand/collapse (Framer Motion AnimatePresence + height animation)
  Plus/Minus icon (rotates 45° on open)

ACCORDION ITEMS:

Q1: "Berapa lama proses pembuatan undangan digital?"
A1: "Proses pembuatan undangan biasanya memakan waktu 1-3 hari kerja setelah
     semua data dan foto diterima. Untuk request mendadak, kami juga
     menyediakan layanan fast-track dengan waktu pengerjaan 24 jam."

Q2: "Apakah bisa revisi setelah undangan selesai dibuat?"
A2: "Tentu! Semua paket sudah include Unlimited Revisi. Kamu bisa request
     perubahan teks, foto, warna, atau urutan konten kapan saja selama
     masa aktif undangan."

Q3: "Bagaimana cara kerja WA Blast Otomatis?"
A3: "WA Blast mengirimkan undangan secara otomatis ke daftar nomor tamu
     yang kamu upload. Setiap undangan sudah dilengkapi nama tamu masing-masing
     (Personalized). Kamu cukup upload file Excel berisi nomor dan nama tamu,
     sisanya kami yang handle."

Q4: "Apakah undangan bisa dibuka tanpa koneksi internet?"
A4: "Undangan digital kami berbasis web, sehingga membutuhkan koneksi internet
     untuk dibuka. Namun tampilannya sudah dioptimasi agar sangat ringan dan
     cepat dimuat bahkan dengan jaringan 4G standar sekalipun."

Q5: "Apa itu fitur Split Invitation?"
A5: "Split Invitation memungkinkan kamu membuat dua versi undangan yang berbeda
     dalam satu link — misalnya versi Akad Only dan versi Akad + Resepsi.
     Sistem akan otomatis menampilkan versi yang sesuai berdasarkan data tamu."

Q6: "Berapa lama masa aktif undangan digital?"
A6: "Masa aktif undangan adalah selama 12 bulan sejak tanggal aktivasi.
     Setelah itu kamu bisa memperpanjang dengan biaya yang sangat terjangkau,
     atau undangan akan otomatis diarsipkan."

Q7: "Apakah nama tamu bisa muncul otomatis di undangan?"
A7: "Ya! Fitur Personalized Invitation memastikan nama tamu muncul otomatis
     di bagian 'Kepada Yth.' setiap undangan yang dikirim. Tidak perlu
     edit manual satu per satu — cukup input data di dashboard."

Q8: "Bagaimana jika saya tidak puas dengan hasilnya?"
A8: "Kepuasan kamu adalah prioritas kami. Jika hasil tidak sesuai ekspektasi,
     tim kami akan merevisi tanpa batas hingga kamu benar-benar puas.
     Kami juga menyediakan Customer Service aktif via WhatsApp setiap hari."

STYLE:
  Each item: border-b border-[--color-secondary]/40 py-5
  Question: font-semibold text-base text-[--color-text] cursor-pointer
  Answer: text-sm text-[--color-muted] leading-relaxed pt-3
  Icon: +/× top-right, text-[--color-primary]

BELOW FAQ:
  Card: bg-[--color-primary]/10 border border-[--color-primary]/30
        rounded-2xl p-6 text-center mt-10
  Text: "Masih punya pertanyaan lain?"
  CTA button: "Tanya via WhatsApp →" → WhatsApp link (green button)
```

---

## 7️⃣ CTA BANNER

```
Component: CTABanner.tsx

BACKGROUND:
  Gradient: from-[#C9A96E] via-[#D4B483] to-[#E8C99A] (gold gradient)
  Subtle botanical SVG pattern overlay (opacity 0.08)
  OR dark variant: from-[#2C2C2C] to-[#4A3F35] with gold accents

CONTENT (text-center, py-24):
  Eyebrow: "MULAI SEKARANG" (white, uppercase, tracking-widest, text-xs)
  Headline: "Wujudkan Undangan Impianmu" (white, Playfair Display, 3rem)
  Subtext: "Bergabung dengan 500+ pasangan yang sudah mempercayakan
            momen spesial mereka bersama kami"
            (white/90, text-lg)
  CTA Button: "Pesan Sekarang ✨"
              bg-white text-[--color-accent] font-semibold
              px-10 py-4 rounded-full text-base
              hover:shadow-2xl hover:-translate-y-1 transition-all
              href: https://viding.co/register

Reassurance row (flex, gap-8, justify-center, mt-6):
  "✓ Proses Cepat"
  "✓ Harga Transparan"
  "✓ CS Responsif"
  Style: text-white/80 text-sm font-medium

FLOATING ELEMENTS:
  2-3 decorative rings/circles (absolute positioned, opacity 0.1)
  Soft blur effect on edges
```

---

## 8️⃣ FOOTER

```
Component: Footer.tsx
Background: bg-[#2C2C2C] (dark)
Text: white/ivory tones

TOP DIVIDER: Floral SVG wave/divider in [--color-secondary]/20

LAYOUT (grid, 4 columns on lg, 2 on md, 1 on mobile):

Col 1 — Brand:
  Logo (light version) + brand name
  Tagline: "Undangan digital untuk momen yang tak terlupakan"
  Social icons (gap-3, mt-4):
    Instagram → #  (pink hover)
    WhatsApp  → https://wa.me/628XXXXXXXXX  (green hover)
    TikTok    → #  (white hover)
  Icon style: w-9 h-9 rounded-full border border-white/20
              flex items-center justify-center hover:border-white/60

Col 2 — Navigasi:
  Heading: "Navigasi" (text-xs uppercase tracking-widest text-white/40 mb-4)
  Links: Beranda, Template, Paket, FAQ, Kontak
  Style: text-sm text-white/70 hover:text-white transition-colors, gap-2

Col 3 — Paket:
  Heading: "Paket"
  Links: Paket Starter, Paket Intimate, Paket Royal, Bandingkan Paket

Col 4 — Kontak:
  Heading: "Kontak"
  WhatsApp: 0812-XXXX-XXXX
  Email: hello@[brand].co.id
  Jam operasional: Setiap hari, 08.00 – 22.00 WIB

BOTTOM BAR (border-t border-white/10, mt-12, pt-6):
  Left: "© 2025 [Brand]. All rights reserved."
  Right: "Privacy Policy · Terms of Service"
  Style: text-xs text-white/40
```

---

## 🎬 ANIMATION GUIDELINES

```
All sections use Framer Motion:

1. Section entrance (on scroll into viewport):
   initial: { opacity: 0, y: 40 }
   animate: { opacity: 1, y: 0 }
   transition: { duration: 0.7, ease: "easeOut" }
   viewport: { once: true, margin: "-100px" }

2. Staggered children:
   Use variants with staggerChildren: 0.1

3. Pricing cards hover:
   whileHover: { y: -8, shadow increase }
   transition: { type: "spring", stiffness: 300 }

4. Navbar transition:
   useScroll or scroll event listener
   Conditional Tailwind class swap with transition-all duration-300

5. FAQ accordion:
   AnimatePresence + motion.div with
   initial: { height: 0, opacity: 0 }
   animate: { height: "auto", opacity: 1 }
   exit: { height: 0, opacity: 0 }

6. Testimonial marquee:
   Pure CSS keyframe animation (no Framer Motion needed)
   Pause on hover via CSS :hover selector

7. Template cards:
   whileHover: { y: -8 }
   Card overlay CTA appears on hover with opacity transition
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile (default / sm: 640px):
  - Single column layouts
  - Font sizes reduced (hero: 2.5rem, sections: 1.75rem)
  - Hamburger navbar
  - Pricing cards stacked vertically (Intimate card first)
  - Template cards in carousel (swipeable)
  - Stats bar: 2x2 grid

Tablet (md: 768px):
  - 2-column pricing
  - 2-column footer
  - Desktop navbar visible

Desktop (lg: 1024px+):
  - Full 3-column layouts
  - All animations active
  - Dropdown navbar hover
  - Comparison table visible
```

---

## 🔗 WHATSAPP LINK TEMPLATE

```
Base URL: https://wa.me/628XXXXXXXXX

Ganti 628XXXXXXXXX dengan nomor WA bisnis (format internasional, tanpa +)
Contoh: 6281234567890

Pre-filled messages per context:

Navbar CTA:
?text=Halo%20kak%2C%20saya%20tertarik%20dengan%20undangan%20digital.%20Boleh%20info%20lebih%20lanjut%3F

Paket Starter:
?text=Halo%20kak%2C%20saya%20tertarik%20dengan%20Paket%20Starter%20(Rp%20300.000).%20Bisa%20bantu%20proses%20pemesanan%3F

Paket Intimate:
?text=Halo%20kak%2C%20saya%20tertarik%20dengan%20Paket%20Intimate%20(Rp%20670.000).%20Bisa%20bantu%20proses%20pemesanan%3F

Paket Royal:
?text=Halo%20kak%2C%20saya%20tertarik%20dengan%20Paket%20Royal%20(Rp%20850.000).%20Bisa%20bantu%20proses%20pemesanan%3F

FAQ section:
?text=Halo%20kak%2C%20saya%20masih%20ada%20pertanyaan%20seputar%20undangan%20digital.%20Bisa%20dibantu%3F
```

---

## ✅ ITERASI TIPS (Prompt Tambahan)

| Masalah | Prompt Fix |
|---|---|
| Font kurang elegan | `"Replace body font with Cormorant Garamond, keep Playfair Display for headings. Increase letter-spacing on all caps labels."` |
| Warna terlalu flat | `"Add subtle gold gradient overlays and soft grain texture (SVG feTurbulence) to hero and CTA sections."` |
| Animasi kurang smooth | `"Tune all Framer Motion transitions: use spring physics (type: spring, damping: 20, stiffness: 100) instead of ease for card hovers."` |
| Mobile layout rusak | `"Audit mobile layout: stack all grids to 1 column below md, reduce all font sizes by 20%, ensure no horizontal overflow, fix navbar z-index on mobile drawer."` |
| Template preview kurang detail | `"Expand the template preview modal to show a full scrollable invitation page with 6 sections: Cover, Mempelai, Akad & Resepsi, Gallery, RSVP, Gift."` |
| SEO kurang | `"Add Next.js Metadata API to layout.tsx and page.tsx: title, description, OG image, canonical URL, and JSON-LD schema for LocalBusiness."` |

---

*Generated for Antigravity / v0 / Bolt / Lovable — Next.js 14 + TypeScript + Tailwind CSS + Framer Motion*

