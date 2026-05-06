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

