# KONSEP WEBSITE COMPANY PROFILE

# HRW SOUVENIR

## VERSI 2.0 — HARDGRAFT-INSPIRED REDESIGN

---

## 1. REFERENSI UTAMA

**https://www.hardgraft.com/**

Hardgraft adalah brand artisan leather goods dari Italia. Website mereka adalah standar terbaik untuk pendekatan **quiet luxury editorial** — tidak berteriak, tidak ramai, tetapi setiap piksel terasa dengan sengaja dipilih.

### Ciri khas Hardgraft yang harus diadopsi HRW:

* **Navbar sangat minimal** — hanya logo kiri + Menu/Search kanan. Transparan, tidak ada background.
* **Hero = satu gambar produk full-bleed, nyaris fullscreen** — tidak ada teks besar di atas gambar. Produk berbicara sendiri.
* **Heading lowercase / all-lowercase** — Hardgraft tidak menggunakan ALL CAPS. Huruf kecil terasa lebih manusiawi dan humble.
* **Typography: serif untuk hero headline** — kontras antara serif display dan sans-serif body menciptakan kedalaman editorial.
* **Scroll → produk ditampilkan satu per satu** secara vertikal, bukan grid ramai.
* **Full-bleed sections** — gambar dan section tertentu melebar hingga tepi browser, tanpa padding kiri-kanan.
* **Teks pendek, jeda banyak** — "Welcome to hardgraft... We try to be a quiet place with timeless designs."
* **Warna: natural, bumi, tidak mencolok** — krem, coklat, putih bersih, hitam. Tidak ada warna aksen yang kuat.
* **Footer sangat bersih** — logo, tagline pendek, copyright, beberapa link. Tidak ada tiga kolom besar.
* **Tidak ada animasi berlebihan** — hanya image hover zoom sangat halus. Tidak ada reveal clip-path atau stagger animation.
* **Product listing = foto besar + nama produk + harga** — sesederhana itu.
* **Brand story section = full-width, typography besar, teks italic/serif** — seperti membaca jurnal.

---

## 2. PERBEDAAN PENDEKATAN DARI VERSI SEBELUMNYA

| Aspek | Versi Lama | Versi Baru (Hardgraft-like) |
|---|---|---|
| Navbar | Transparan + scroll solid | Super minimal, transparan permanen, hanya icon |
| Hero | Video + text overlay kiri | Full-bleed foto produk, teks di bawah |
| Typography | Outfit (sans) semua | Playfair/serif untuk headline, Inter untuk body |
| Heading | ALL CAPS | Lowercase / sentence case |
| Layout section | Bergantian grid dua kolom | Vertikal scroll, full-bleed, editorial |
| Animasi | Clip-path reveal, stagger | Tidak ada. Hanya image hover scale halus |
| Warna | DADAD2 + Navy + Gold | Off-white/cream (#F7F4EF) + near-black + tidak ada gold accent mencolok |
| Section background | Bergantian 5 warna berbeda | Hampir semua off-white/white, hanya 1-2 section dark |
| Product grid | 2-col, aspect-ratio 4:5 | Asimetris editorial — 1 besar + 2 kecil, atau full-bleed |
| CTA button | Solid navy + gold | Underline text link, atau outline halus |
| Section headers | Divider bar + heading | Langsung heading, tidak ada ornamen |
| Footer | 3 kolom | Single column, minimal |

---

## 3. KONSEP UTAMA

> **"A quiet place."**

Website HRW versi baru harus terasa seperti memasuki sebuah studio atau workshop yang tenang. Tidak ada teriakan promo. Tidak ada banner. Hanya produk, cerita, dan hubungan yang jujur dengan pengunjung.

Seperti kata Hardgraft:
> *"We try to be a quiet place with timeless designs."*

HRW versi-nya:
> **"Dibuat bersama, untuk setiap cerita."** — disampaikan dengan tenang, bukan dengan headline besar.

---

## 4. TYPOGRAFI

### Heading / Display
**Playfair Display** — Serif klasik, elegan, tidak sombong.
- Font weight: 400 (regular), 700 untuk emphasis
- Penggunaan: Hero tagline, section intro besar, brand story
- Style: italic untuk kutipan dan subheading tertentu

### Body
**Inter** — Sans-serif bersih, mudah dibaca.
- Font weight: 300 (light), 400 (regular)
- Penggunaan: Deskripsi, navigasi, label, metadata

### Skala
- Display: 4rem–6rem (tapi dipakai sparingly)
- Section heading: 1.5rem–2rem max
- Body: 0.9rem–1rem
- Label/meta: 0.75rem, letter-spacing lebar

### Prinsip
- **Lowercase lebih banyak daripada ALL CAPS**
- Teks pendek, jeda besar antar paragraf
- Line-height longgar: 1.8–2.0 untuk body
- Maksimum 60-65 karakter per baris (measure)

---

## 5. COLOR PALETTE

### Background utama
`#F7F4EF` — Off-white hangat, bukan putih steril

### Near-black
`#1A1A1A` — Hampir hitam, bukan navy

### Section gelap (hanya 1-2 section)
`#2A2825` — Coklat gelap/charcoal hangat

### Text muted
`#8A8680` — Abu hangat

### Border
`rgba(26,26,26,0.08)` — Sangat tipis, nyaris tidak terlihat

### Tidak ada gold accent mencolok.
Jika perlu accent, gunakan `#C4A882` (caramel/leather tone) secara sangat terbatas — hanya underline atau thin rule.

---

## 6. NAVBAR

```
[logo]                    [menu icon / text]
```

- Transparan permanen — tidak berubah saat scroll
- Logo kiri: hanya logo HRW (tidak perlu "Souvenir" text)
- Kanan: text "Menu" atau hamburger icon saja
- Tidak ada inline navigation links
- Mobile: identik dengan desktop — fullscreen overlay saat menu dibuka
- Font: Inter, 0.75rem, letter-spacing 0.15em, uppercase

---

## 7. HERO SECTION

### Pendekatan Hardgraft:
Hero bukan tentang branding. Hero adalah tentang **produk**.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│                                                  │
│         [FOTO PRODUK PENUH — edge to edge]       │
│                                                  │
│                                                  │
└──────────────────────────────────────────────────┘
  Tote Bag Custom                          — HRW
  Souvenir & Merchandise
```

- Gambar produk full-bleed, 90vh–100vh
- Teks di BAWAH gambar (bukan overlay), font kecil
- Tidak ada CTA button besar di hero
- Nama produk + kategori + tahun — seperti caption foto
- Scroll indicator: panah kecil atau teks "Scroll"

---

## 8. BRAND STORY SECTION

Seperti Hardgraft's welcome text — satu paragraf panjang, serif italic, centered, full width.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   "Welcome to HRW. We make souvenirs and         │
│    merchandise together with local artisans      │
│    and craftspeople. Every order is a small      │
│    story of collaboration."                      │
│                                                  │
│                  — Dibuat Bersama                │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Typography: Playfair Display Italic, 1.5rem–2rem
- Centered, max-width 700px
- Padding vertikal besar (120px–160px)
- Background: `#F7F4EF`

---

## 9. PRODUCT SHOWCASE

Tidak menggunakan grid seragam. Menggunakan layout asimetris editorial:

### Layout A — Full bleed single product
```
┌──────────────────────────────────────────────────┐
│                                                  │
│      [FOTO PRODUK FULL WIDTH, 70vh]              │
│                                                  │
└──────────────────────────────────────────────────┘
  Tote Bag Custom                    Custom Merch
```

### Layout B — Dua kolom asimetris
```
┌────────────────────────┬─────────────────────────┐
│                        │                         │
│  [Foto besar, 60vw]    │  [Foto kecil + teks]    │
│                        │                         │
└────────────────────────┴─────────────────────────┘
```

### Layout C — Strip horizontal
```
┌──────────────────────────────────────────────────┐
│  [foto]   [foto]   [foto]   — scroll horizontal  │
└──────────────────────────────────────────────────┘
```

Setiap item hanya: foto + nama produk + kategori. Tanpa harga, tanpa border card, tanpa shadow.

---

## 10. COLLABORATION / MADE TOGETHER

Bukan diagram flow. Ini adalah **brand story section** dengan foto dan teks.

```
┌──────────────────────────────────────────────────┐
│                                                  │
│   [Full-bleed foto proses: tangan, produk,       │
│    material, workshop]                           │
│                                                  │
└──────────────────────────────────────────────────┘

  One Order. Many Hands.

  Sebuah produk tidak selalu dibuat oleh satu
  tangan. HRW bekerja bersama penjahit, pengrajin,
  dan percetakan lokal.

  "Satu pesanan, lebih banyak pihak yang tumbuh."
```

- Foto full-bleed di atas
- Teks di bawah, rata kiri, max-width 600px
- Padding besar, tidak ada card atau box

---

## 11. PROCESS SECTION

Minimal, horizontal, typography saja. Tidak ada lingkaran bernomor.

```
  from idea to product

  Talk →  Create →  Make →  Check →  Deliver
```

- Teks kecil, horizontal flow
- Separator: tanda panah `→` atau titik `·`
- Background: section gelap `#2A2825`, teks terang
- Tidak ada ilustrasi atau ikon

---

## 12. ABOUT SECTION

Dua kolom lebar, editorial:

```
┌──────────────────┬───────────────────────────────┐
│                  │                               │
│  [Foto produk    │  About HRW                    │
│   atau logo      │                               │
│   besar]         │  HRW Souvenir adalah usaha    │
│                  │  kreatif...                   │
│                  │                               │
│                  │  Vision ——————                │
│                  │  Menjadi brand souvenir...    │
│                  │                               │
└──────────────────┴───────────────────────────────┘
```

Tidak ada value cards. Values ditampilkan sebagai list horizontal sederhana di bawah teks.

---

## 13. CTA SECTION

Satu blok besar, gelap, text saja:

```
┌──────────────────────────────────────────────────┐
│                                                  │
│                                                  │
│    Punya kebutuhan souvenir?                     │
│    Mari bicarakan.                               │
│                                                  │
│    → Konsultasi Pesanan                          │
│                                                  │
│                                                  │
└──────────────────────────────────────────────────┘
```

- Background: `#2A2825`
- Heading: Playfair, 3rem–4rem, lowercase
- CTA: bukan button, tapi text link dengan arrow `→`
- Padding vertikal: 160px

---

## 14. FOOTER

Super minimal, seperti Hardgraft:

```
┌──────────────────────────────────────────────────┐
│  [logo]                                          │
│  Dibuat Bersama, Untuk Setiap Cerita.            │
│                                                  │
│  WhatsApp · Instagram · Email · Indonesia        │
│                                                  │
│  © 2026 HRW Souvenir                            │
└──────────────────────────────────────────────────┘
```

- Single column, centered atau rata kiri
- Tidak ada multi-kolom footer
- Font sangat kecil, muted

---

## 15. INTERACTION & ANIMATION

### Yang ADA:
- Hover pada gambar: scale `1.02`, transisi 0.6s ease-out
- Hover pada link: opacity turun sedikit atau underline muncul
- Scroll: tidak ada animasi reveal. Konten langsung terlihat.
- Image loading: native lazy-load saja

### Yang TIDAK ADA:
- Tidak ada clip-path reveal
- Tidak ada stagger animation
- Tidak ada translateY reveal
- Tidak ada preloader
- Tidak ada IntersectionObserver untuk animasi
- Tidak ada parallax

### Filosofi:
> **Website yang baik tidak perlu banyak animasi untuk terasa premium. Premium = kecepatan + ketenangan + foto bagus.**

---

## 16. RESPONSIVE

### Desktop (≥1024px)
- Full layout editorial
- Full-bleed sections
- Sidebar/split sections

### Mobile (≤768px)
- Stack vertikal
- Gambar tetap full-width, bukan dalam container
- Navbar: logo + hamburger
- Font scale turun proportional
- Tidak ada horizontal scroll

---

## 17. STRUKTUR HALAMAN FINAL

1. **Navbar** — minimal, transparan
2. **Hero** — foto produk full-bleed + caption kecil
3. **Brand Intro** — satu paragraf serif italic besar, centered
4. **Products** — layout asimetris editorial, gambar besar
5. **Made Together** — foto full-bleed + story text
6. **Process** — strip gelap, text horizontal
7. **Projects / Portfolio** — grid asimetris foto
8. **About** — dua kolom, teks + visual
9. **CTA** — blok gelap, teks besar, text-link CTA
10. **Footer** — minimal, single column

---

## 18. CORE MESSAGE (TIDAK BERUBAH)

**HRW SOUVENIR**
**DIBUAT BERSAMA, UNTUK SETIAP CERITA.**
**CREATE — COLLABORATE — GROW**

Yang berubah hanya cara menyampaikannya: lebih tenang, lebih dalam, lebih editorial.
