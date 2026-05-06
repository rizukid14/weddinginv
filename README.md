# 🌸 ENIX DESIGN - Premium Wedding Invitation & CMS Dashboard Platform

Welcome to **ENIX DESIGN**, a high-fidelity, ultra-premium digital wedding invitation and real-time management dashboard platform. Built with a luxurious editorial dark theme for couples (CMS) and a classic, graceful Rose Gold floral theme for invitees, the application delivers a seamless experience from guest invitation to RSVP analytics tracking.

---

## 🚀 Key Modules & Sprint Deliverables

### 🌸 Sprint 1: Premium Digital Invitation (Floral Rose Theme)
* **Luxurious Editorial Visuals**: Immersive editorial layout featuring elegant serif typography, smooth fade-in animations, dynamic floral dividers, and custom-styled interactive components.
* **Smart Countdown Timer**: Live ticking countdown block synchronized with timezone offsets showing days, hours, minutes, and seconds until the celebration.
* **Interactive Venue Cards**: Beautiful separate Akad & Resepsi event cards with integrated date-times, venue details, and direct one-click navigation links (Google Maps API).
* **High-Fidelity Photo Gallery**: Responsive pre-wedding image grid showing elegant lightbox views on click.
* **E-Gift & Virtual Registries**: Digital gift cards listing digital bank transfers, e-wallets, and registry wishlist URLs, complete with quick clipboard-copy functionality.
* **Real-time RSVP & Guest Book**: Elegant form enabling guests to submit confirmation responses, number of pax, and personal prayers directly to Firestore.
* **Sound Deck Floating Music Player**: Floating audio control card playing curated background instrumental scores with smooth play/pause animations.

### 🛡️ Sprint 2: Premium CMS Dashboard (Pengantin Platform)
* **Auth Guard Security Gates**: Session tracking and security gates protecting `/dashboard/*` layout views. Automatic route redirects if access is unauthorized.
* **Editorial Dark Mode Dashboard**: Charcoal `#0D0B0B` editorial workspace layout accented with sleek gold border gradients, amber controls, and typography.
* **Real-Time Analytics Stat widgets**: Analytical dashboard compiling real-time RSVP confirmations (Hadir, Mungkin, Berhalangan, Total Pax).
* **Split-Screen Step Wizard**:
  1. **Langkah 1 (Identitas)**: Groom & Bride metadata, parent names, profile photos, and opening Quranic/biblical citations.
  2. **Langkah 2 (Acara)**: Date-times, masjid/church/reception halls, and map links.
  3. **Langkah 3 (Media)**: Cover photos, photo gallery, and background background MP3 sound player upload configurations.
  4. **Langkah 4 (Hadiah)**: Dynamic digital wallets registry list and copyable bank accounts array.
  5. **Langkah 5 (Pengaturan)**: Password gates activation, theme customizers, and irreversible delete account safety bounds.
* **iPhone 14 Simulated Live Preview**: High-fidelity right-panel iPhone mockup holding a live, fully-interactive iframe of the invitation page, bypassed using client-only `?preview=true` hooks.
* **On-Save Live Reloading**: Built-in automatic reload cache-buster triggers refreshing the preview iframe with fresh Firestore updates in real-time on clicking "Simpan Perubahan".
* **Personalized Guest Link Generator**:
  * **Single**: Name input generating custom `to=Guest+Name` query links.
  * **Bulk**: Multi-line names input generating hundreds of unique URLs instantly.
  * **WhatsApp API Auto-drafting**: Direct click-to-trigger wa.me messages pre-filled with high-grade Indonesian invitation template copywriting and guest URL fields.
* **Real-time Wishes Moderation Table**: Paginated records list with single-click item deletions synchronizing analytics in real-time.
* **Excel-Compatible Exporter**: Single-click CSV files download for easy seating arrangement and guest-list coordination.

---

## 🛠️ Technology Stack
* **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* **Database & Auth**: [Firebase v10+](https://firebase.google.com/) (Cloud Firestore, Auth, Firebase Storage)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚙️ Local Setup and Configuration

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed on your machine.

### 2. Environment Variables (`.env.local`)
Create a `.env.local` file in the root directory and configure your client-side Firebase configurations:

```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyA0DpiW_69..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="rizuinvitation.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="rizuinvitation"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="rizuinvitation.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="345627929606"
NEXT_PUBLIC_FIREBASE_APP_ID="1:345627929606:web:..."
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-P2MPWCNQ50"
```

### 3. Firebase Security Rules
Paste the following security rules into your **Firebase Console -> Firestore Database -> Rules** tab to enable secure and flawless data synchronization:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profile matching rules
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Wedding document matching rules
    match /weddings/{slug} {
      allow read: if true;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }
    
    // RSVP collections matching rules
    match /weddings/{slug}/rsvp/{rsvpId} {
      allow read, create: if true;
      allow update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/weddings/$(slug)).data.uid == request.auth.uid;
    }
  }
}
```

### 4. Install Dependencies & Launch
```bash
# Install packages
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) inside your web browser to access the application.

---

## 📁 Architecture Directory Structure
```text
├── app/
│   ├── [slug]/             # Live digital wedding invitation (Sprint 1)
│   ├── dashboard/          # CMS dashboard protected layout paths (Sprint 2)
│   │   ├── edit/           # Split-screen step-by-step editor wizard
│   │   └── page.tsx        # Overview analytics, link creators, moderation tables
│   ├── login/              # Premium login view
│   └── register/           # Registration screen with real-time slug checkers
├── components/
│   ├── dashboard/          # Sidebar, simulated IframePreview, and wizard step panels
│   └── invitation/         # Section layout items (Cover, Mempelai, Gallery, RSVP, SoundDeck)
├── lib/
│   ├── dashboard-context.tsx # Auth sessions react context
│   ├── firebase.ts         # Firebase client config initializer
│   └── storage.ts          # Client storage asset uploads config
└── types/
    └── wedding.ts          # Invitation interface schemas
```

---

*Made with 💖 by **ENIX DESIGN** &copy; 2026. All rights reserved.*
