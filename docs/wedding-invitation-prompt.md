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
