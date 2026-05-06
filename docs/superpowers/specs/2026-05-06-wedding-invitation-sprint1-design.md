# Design Spec: Wedding Invitation Web App (Sprint 1 — Floral Template)

- **Date**: 2026-05-06
- **Status**: Approved by User
- **Author**: Antigravity
- **Target Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Firebase Client & Admin SDK

---

## 🗺️ Architectural Overview

This design is for Sprint 1 of a digital wedding invitation application. It is a premium web app built using **Next.js 14 App Router** optimized specifically for mobile viewports (`max-w-[430px]` centered in desktop browsers). 

### Firebase-First with Local Mock Fallback

To ensure immediate local testability and smooth developers' feedback loop, the application is designed to automatically detect if Firebase configuration is provided via environment variables.

```
                  ┌───────────────────────────────┐
                  │       getWeddingData()        │
                  └───────────────┬───────────────┘
                                  │
                  Is Firebase Config Available?
                    /                           \
                  YES                            NO
                  /                               \
     ┌────────────────────────┐       ┌────────────────────────┐
     │ Fetch from Firestore   │       │ Load Static High-      │
     │ via Firebase Admin SDK │       │ Fidelity Mock (Rizki-  │
     │                        │       │ Amira)                 │
     └────────────────────────┘       └────────────────────────┘
```

*   **Firebase Route**: Server-side rendering fetches the wedding profile from Firestore (`weddings/{slug}`) during page request. RSVPs are written directly to `weddings/{slug}/rsvp/{rsvpId}` and read in real-time.
*   **Fallback Route**: The application returns high-fidelity mock data for `/rizki-amira` and emulates real-time RSVP reads/writes utilizing `localStorage` and client-side memory. This ensures 100% interactive testing out-of-the-box.

---

## 🗂️ Project Structure

```
/app
  /[slug]
    page.tsx                  ← Entry page (fetches data from database/mock)
    loading.tsx               ← Skeleton page
    /rsvp
      route.ts                ← API Route for submitting RSVP data
  layout.tsx                  ← Global fonts + viewport setup
  globals.css                 ← CSS variable definitions and float animations

/components
  /invitation
    WeddingInvitation.tsx     ← Main parent client component managing active state
    OpeningOverlay.tsx        ← Autoplay helper and welcome screen
    PasswordGate.tsx          ← Privacy gate with 3x failed cooldown logic
    CoverSection.tsx          ← High-impact photo, title, and real-time countdown
    MempelaiSection.tsx       ← Bio and circular photos with botanical wreaths
    AkadResepsiSection.tsx    ← Detailed events with Maps and .ics calendar support
    GallerySection.tsx        ← Masonry grid and full-screen swipeable lightbox
    RSVPSection.tsx           ← Form + real-time ucapan wall feed
    GiftSection.tsx           ← Digital gifting registry, copy-to-clipboard, custom toast
    MusicPlayer.tsx           ← Floating vinyl-style audio player
  /ui
    FloralDivider.tsx         ← Inline SVGs representing thin botanical line drawings
    CountdownTimer.tsx        ← Live state counter ticking down

/lib
  firebase.ts                 ← Client SDK initialization
  firebase-admin.ts           ← Server-side Admin SDK initialization
  wedding.ts                  ← Data retrieval manager with dynamic fallback logic
  animations.ts               ← Framer Motion animation configurations

/types
  wedding.ts                  ← Strict TypeScript definitions
```

---

## 🎨 Theme & Visual Tokens

The **Floral Template** is styled to look like an editorial fine-art magazine.

### Color Palette (CSS Variables)
*   `--floral-ivory`: `#FDFAF7` (Main clean background)
*   `--floral-cream`: `#F5EFE8` (Warm depth container)
*   `--floral-blush`: `#E8D5C4` (Soft warm rose)
*   `--floral-rose`: `#D4A5A0` (Accent rose pink)
*   `--floral-dusty`: `#C49A8A` (Deep pink)
*   `--floral-gold`: `#C9A96E` (Warm primary gold accent)
*   `--floral-gold-deep`: `#8B6F47` (Contrast gold text)
*   --floral-sage: #8FAF8A
*   --floral-sage-dark: #5A7A55
*   `--floral-text`: `#2C2424` (Near-black brown, easy on the eyes)
*   `--floral-muted`: `#9A8070` (Warm descriptive gray)

### Typography
*   **Cursive/Display**: `Great Vibes` (Loaded from Google Fonts, used exclusively for couple names)
*   **Serif/Headings**: `Cormorant Garamond` (Elegant, traditional editorial headings)
*   **Sans-serif/Body & UI**: `Plus Jakarta Sans` (Clean, highly readable modern text)

---

## 🔒 Security & Client Protection Rules

1.  **Private Invitations**: If `passwordEnabled === true`, the application locks behind `PasswordGate.tsx`. The gate compares user input with the payload.
    *   3 failed attempts trigger a 60-second cooldown stored in `localStorage` to deter brute-forcing.
2.  **Firestore Rules**:
    *   `weddings/{slug}` is read-only for public access. No writes allowed from the client.
    *   `weddings/{slug}/rsvp/{rsvpId}` is write-only for clients with validated structures (checks if name length > 1, attendance matches enum, etc.). Real-time readings are enabled on a limited scope.

---

## 🎬 Custom Keyframe Animations

We will register the following animations directly inside `/app/globals.css`:
1.  `float-petal`: Slowly rises and swings background petals to give a sense of depth.
2.  `spin-vinyl`: Spins the music disk continuously when audio is active.
3.  `pulse-cta`: Slowly pulsates the button scale to draw user interaction on `OpeningOverlay`.

---

## 📝 Next Steps and Implementation Gate

We have received approval for Section 1, 2, and 3. This written spec serves as our blueprint.

To ensure consistency and quality, we will now proceed to the **Implementation Plan** via the `writing-plans` phase.
