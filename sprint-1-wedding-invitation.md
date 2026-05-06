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
