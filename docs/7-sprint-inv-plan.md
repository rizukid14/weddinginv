🗺️ Big Picture Architecture
Pengantin → CMS (isi data) → Generate URL → Tamu buka link undangan
3 bagian utama:

Undangan — yang dilihat tamu (public)
CMS/Dashboard — pengantin isi data, upload foto, setting musik
Admin — kamu manage semua order


🏃 7 Sprint Roadmap

Sprint 1 — Foundation + Template: Floral
Durasi: 1-2 minggu
Goal: 1 undangan bisa dibuka di browser dengan data dummy
Tech Setup:
  - Next.js 14 App Router + TypeScript
  - Tailwind CSS + Framer Motion
  - Supabase (database + storage untuk foto & musik)
  - Vercel (deploy)

URL Structure:
  /[slug]              → undangan publik (contoh: /rizki-amira)
  /dashboard           → CMS pengantin
  /dashboard/edit      → form isi data
  /admin               → kamu manage semua

Database Schema (Supabase):
  Table: weddings
    - id, slug (unique), password, is_active
    - groom_name, bride_name
    - akad_date, akad_time, akad_venue, akad_maps_url
    - resepsi_date, resepsi_time, resepsi_venue, resepsi_maps_url
    - cover_photo, groom_photo, bride_photo
    - gallery_photos (array)
    - music_url, music_title
    - template_id
    - gift_bank_name, gift_account_number, gift_account_name
    - created_at

  Table: rsvp
    - id, wedding_id, guest_name, attendance, message, created_at

Fitur Sprint 1:
  ✅ Template Floral (full sections)
  ✅ Cover + countdown
  ✅ Section mempelai
  ✅ Section akad & resepsi + Google Maps embed
  ✅ Password gate (opsional per undangan)
  ✅ Background music player (autoplay on interact)
  ✅ RSVP form → simpan ke Supabase
  ✅ Personalized: /rizki-amira?to=Budi → "Kepada Yth. Budi"
  ✅ Mobile-first responsive

Sprint 2 — CMS Dashboard (Pengantin)
Durasi: 1-2 minggu
Goal: Pengantin bisa isi data sendiri tanpa kamu edit code
Fitur:
  ✅ Auth sederhana (magic link email via Supabase Auth)
  ✅ Form multi-step (wizard):
      Step 1: Identitas (nama, tanggal, slug URL)
      Step 2: Akad & Resepsi (lokasi, jam, maps link)
      Step 3: Upload foto (cover, mempelai, galeri — max 10)
      Step 4: Gift & Angpao (rekening, GoPay/OVO, optional)
      Step 5: Background music (upload MP3 atau link YouTube)
      Step 6: Setting (password on/off, template pilih)
  ✅ Preview live (iframe undangan di samping form)
  ✅ Copy link undangan
  ✅ RSVP dashboard (lihat siapa yang hadir)
  ✅ Pilih template (Sprint 1 hanya Floral tersedia)

Sprint 3 — Template: Brush + Modern
Durasi: 1 minggu
Goal: Nambah 2 template, pengantin bisa switch
Template Brush:
  Vibe: Hand-lettered, artistic, tinta hitam + cream
  Font: Satisfy (script) + Lato
  Warna: Off-white, charcoal, dusty rose accent
  Elemen: Brush stroke SVG, watercolor splash

Template Modern:
  Vibe: Clean, tipografi kuat, geometric, editorial
  Font: Syne (display) + Inter
  Warna: Pure white, near-black, single accent color (customizable)
  Elemen: Bold dividers, asymmetric layout, minimal ornament

Tech:
  - Template switching: query param ?template=brush
  - Atau pilih di dashboard → simpan ke DB
  - Setiap template = folder /templates/[name]/
    dengan komponen yang sama tapi styling berbeda

Sprint 4 — Template: Retro + E-Gift
Durasi: 1-2 minggu
Goal: Nambah template Retro + fitur E-Gift lengkap
Template Retro:
  Vibe: 70s/90s aesthetic, groovy, fun, playful
  Font: Abril Fatface + DM Mono
  Warna: Mustard, terracotta, cream, olive green
  Elemen: Retro badge, wavy borders, grain texture overlay

E-Gift Fitur Lengkap:
  ✅ Transfer bank (multi-rekening)
  ✅ GoPay / OVO / Dana (QR code upload)
  ✅ Gift registry (wish list dengan link Tokopedia/Shopee)
  ✅ Konfirmasi gift → form upload bukti transfer
      → notif WhatsApp ke pengantin

Sprint 5 — Template: Culture + Spiritual
Durasi: 1-2 minggu
Goal: Cover segmen pernikahan adat & islami
Template Culture:
  Vibe: Batik, Javanese/Sundanese motif, traditional
  Font: Cardo + Noto Serif
  Warna: Deep brown, gold, cream, terracotta
  Elemen: Batik SVG pattern, wayang-inspired ornament

Template Spiritual:
  Vibe: Islami/religious, ayat Quran, bismillah opener
  Font: Amiri (arabic support) + Lato
  Warna: Hijau tua, gold, putih bersih
  Elemen: Islamic geometric pattern, ornate frame,
           ayat nikah section, kaligrafi placeholder

Fitur tambahan Sprint 5:
  ✅ Multi-language (Indonesia / English toggle)
  ✅ Ayat/quote section (customizable per template)
  ✅ Split invitation per tamu (Akad only vs Akad+Resepsi)
     → logic di DB per tamu atau per link

Sprint 6 — Template: Seasonal + WA Blast
Durasi: 1-2 minggu
Goal: Template terakhir + fitur kirim massal
Template Seasonal:
  Vibe: Berubah sesuai musim/momen (summer tropical,
        rainy romantic, festive). Default: Tropical Indonesia
  Font: Fraunces + Plus Jakarta Sans
  Warna: Teal, coral, lush green, sandy cream
  Elemen: Tropical botanicals, hibiscus, palm leaf SVG

WA Blast Fitur:
  ✅ Upload Excel/CSV daftar tamu (nama + nomor WA)
  ✅ Generate personalized link per tamu
     (undangan.co/rizki-amira?to=Nama+Tamu)
  ✅ Preview pesan WA sebelum kirim
  ✅ Kirim via WhatsApp Web API / Fonnte / WAblas
  ✅ Tracking: terkirim / dibuka / RSVP sudah/belum
  ✅ Limit blast sesuai paket (50/100/300)

Sprint 7 — Polish + Admin + Launch
Durasi: 1-2 minggu
Goal: Production-ready, kamu bisa manage semua order
Admin Panel (/admin):
  ✅ List semua wedding order
  ✅ Activate / deactivate undangan
  ✅ Set paket per user (Starter/Intimate/Royal)
  ✅ Monitor RSVP & blast usage
  ✅ Manual override data jika perlu

Polish:
  ✅ Loading skeleton per section
  ✅ OG image dinamis per undangan
     (untuk preview link saat share WA/IG)
  ✅ PWA (bisa "install" di HP tamu)
  ✅ Analytics per undangan (berapa kali dibuka)
  ✅ SEO meta per undangan

Launch Checklist:
  ✅ Custom domain (undangan.namabrand.com)
  ✅ Error monitoring (Sentry)
  ✅ Rate limiting RSVP (anti spam)
  ✅ Image optimization (next/image + Supabase CDN)
  ✅ Lighthouse score > 90

📊 Summary Timeline
SprintFokusOutput1Foundation + FloralUndangan bisa dibuka, semua fitur jalan2CMS DashboardPengantin isi data sendiri3Brush + Modern3 template tersedia4Retro + E-Gift4 template + gift lengkap5Culture + Spiritual6 template + split inv6Seasonal + WA Blast7 template + kirim massal7Polish + AdminProduction ready