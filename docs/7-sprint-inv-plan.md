# 🗺️ ENIX DESIGN - Sprint Roadmap & Deliverables Tracker

Welcome to the **ENIX DESIGN** development roadmap tracking board. This file tracks the milestones, architecture, and feature statuses across Sprint 1 (Invitation Theme v1) and Sprint 2 (CMS Dashboard).

---

## 📊 Sprint Milestones At-a-Glance

| Milestone / Sprint | Scope | Status | Completion Date |
| :--- | :--- | :---: | :--- |
| **Sprint 1** | Premium Rose Floral Wedding Invitation Front-end | `🟢 Selesai` | May 2026 |
| **Sprint 2** | Premium Editorial CMS Dashboard, Auth & Live Preview | `🟢 Selesai` | June 2026 |
| **Security & Tuning** | Sensitive Data Masking, Cache-Buster & Rebranding | `🟢 Selesai` | June 2026 |

---

## 🌸 Sprint 1: Premium Digital Invitation (Floral Rose Theme)
*Goal: Create an immersive, luxury-tier mobile-responsive digital invitation with elegant serif typography, fluid animations, and real-time interaction capabilities.*

- [x] **Cover & Opening Overlay** (`OpeningOverlay.tsx`)
  - [x] Full-screen centered hero invitation cover.
  - [x] Elegant "Kepada Yth. Nama Tamu" custom query parsing.
  - [x] "Buka Undangan" trigger button with fade-out transit.
- [x] **Smart Live Countdown Timer** (`CountdownTimer.tsx`)
  - [x] Ticking dynamic countdown blocks tracking Days, Hours, Minutes, Seconds.
- [x] **Mempelai Profile Showcase** (`MempelaiSection.tsx`)
  - [x] Elegant serif/sans typography pairs.
  - [x] Romantic parent and profile metadata display.
- [x] **Akad & Resepsi Layout Cards** (`AkadResepsiSection.tsx`)
  - [x] Dual grid display holding calendar event times.
  - [x] One-click calendar integrations (`.ics` generation rebranded to `enixdesign.com`).
  - [x] One-click Google Maps redirection links.
- [x] **Curated Sound Deck Player** (`MusicPlayer.tsx`)
  - [x] Floating, persistent play-pause background soundtrack console.
- [x] **Real-time RSVP Guestbook Form** (`RSVPSection.tsx`)
  - [x] Real-time Firebase Firestore guest prayer submission and Pax confirmation.

---

## 🛡️ Sprint 2: Premium CMS Dashboard (Pengantin Platform)
*Goal: Build an editorial dark-themed workspace enabling wedding couples to manage profiles, events, background media, registers, and passwords securely in real-time.*

- [x] **Session Gates & Access Guards** (`dashboard-context.tsx`)
  - [x] Client session check and automatic redirects.
  - [x] Seamless redirection to login page for unauthorized visitors.
- [x] **Editorial Dark Workspace Layout** (`Sidebar.tsx`, `page.tsx`)
  - [x] Sleek charcoal (`#0D0B0B`) dashboard cards accented with warm amber borders.
  - [x] User-profile dropdown panel and secure sign-out controls.
- [x] **Real-Time Analytics Metrics** (`StatWidget.tsx`)
  - [x] Dynamic stat cards tallying "Hadir", "Mungkin", "Berhalangan", and "Total Porsi" in real-time.
- [x] **Split-Screen Edit Wizard** (`edit/page.tsx`)
  - [x] **Langkah 1 (Identitas)**: Groom & Bride bio, parents, and Qur'an/bible opening quotes.
  - [x] **Langkah 2 (Acara)**: Date-time datetime pickers and Google Maps URL anchors.
  - [x] **Langkah 3 (Media)**: Custom cover image upload, photo gallery upload, and MP3 music upload.
  - [x] **Langkah 4 (Hadiah)**: Dynamic e-gift registries and virtual bank cards.
  - [x] **Langkah 5 (Pengaturan)**: Password gates, layout templates, and account deletion zones.
- [x] **iPhone 14 Simulated Live Preview** (`IframePreview.tsx`)
  - [x] Beautiful iPhone-chassis right panel with fully interactive scroll-and-tap iframe.
  - [x] Strict viewport constraints (`rounded-[32px] overflow-hidden`) to prevent layout bleeding.
  - [x] Cache-busting real-time refresh triggers on clicking "Simpan Perubahan".
- [x] **Tamu Link Generator & WhatsApp API Integrations** (`LinkGenerator.tsx`)
  - [x] Personalized guest URL builder (Single & Bulk lists).
  - [x] Auto-generated professional Indonesian invitation copying layout.
  - [x] Directly triggers pre-filled `wa.me` chat streams.
- [x] **Moderation Control Board** (`RSVPTable.tsx`)
  - [x] Real-time wishes and Pax tracking list with single-click deletes.
  - [x] CSV data export capabilities.

---

## 🔐 Security, Sanitization & Deployment Readiness
- [x] Move all hardcoded Firebase database configurations to client-side `.env.local` environments.
- [x] Document and configure strict database access rules in Firestore Security rules.
- [x] Exclude all local API key credentials from GitHub commits using `.gitignore`.
