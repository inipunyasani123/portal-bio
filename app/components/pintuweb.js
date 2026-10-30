import HARGA from './harga.json';
// Tautan ke situs utama PintuWeb. Portal ini zona terpisah (basePath /link-in-bio) di domain yang sama, jadi
// semua tautan ke situs utama memakai URL absolut dan <a> biasa: next/link akan menempelkan basePath.
/** Harga & kontak dibaca dari ./harga.json (salinan https://www.pintuweb.id/harga.json, diambil scripts/ambil-harga.mjs saat build). */
const P = (slug) => HARGA.paket[slug];
const rp = (n) => (n >= 1e6 ? `Rp${String(n / 1e6).replace('.', ',')} juta` : `Rp${n / 1e3} ribu`);

export const PINTUWEB = 'https://www.pintuweb.id';

/** Kontak dari PintuWeb/app/lib/site.ts (WA_NUMBER, WA_DISPLAY). Ganti di sana = ganti di sini. */
export const WA_NUMBER = HARGA.wa.nomor;
export const WA_DISPLAY = HARGA.wa.tampil;
export const wa = (teks) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(teks)}`;

/** Jenis pesanan untuk pesan WhatsApp. */
export const JENIS = 'halaman link in bio';

/** Pesan WhatsApp untuk satu demo: "Pesan yang mirip". */
export const waMirip = (nama, url) => wa(`Halo PintuWeb, saya tertarik ${JENIS} seperti contoh ${nama} (${url}). Boleh minta info?`);

/**
 * Angka paket "link-in-bio" dari PintuWeb/app/lib/packages.ts (harga, waktu) dan RENEWAL_BIO_PER_YEAR.
 * Satu-satunya tempat angka bisnis di portal ini: hero, kartu, dan FAQ mengambil dari sini.
 */
export const PAKET = {
  nama: 'Link in Bio',
  mulai: rp(P('link-in-bio').mulai),
  sampai: rp(P('link-in-bio').sampai),
  waktu: P('link-in-bio').waktu,
  perpanjangan: 'Rp100–150 ribu per tahun',
};

/** Galeri yang tayang di www.pintuweb.id/<path> (lihat lib/portals.ts di PintuWeb). Urutan baku semua portal. */
export const GALERI = [
  { path: 'landing-page', label: 'Landing Page' },
  { path: 'toko-online', label: 'Toko Online' },
  { path: 'aplikasi-mobile', label: 'Aplikasi Mobile' },
  { path: 'menu-digital', label: 'Menu Digital' },
  { path: 'link-in-bio', label: 'Link in Bio' },
  { path: 'kontes-desain', label: 'Konsep Desain' },
  { path: 'undangan-digital', label: 'Undangan Digital' },
  { path: 'website-portofolio', label: 'Portofolio Pribadi' },
  { path: 'website-reservasi', label: 'Reservasi & Booking' },
  { path: 'website-properti', label: 'Properti' },
  { path: 'aplikasi-to-do', label: 'To-Do & Produktivitas' },
];

export const GALERI_LAIN = GALERI.filter((g) => g.path !== 'link-in-bio');

/** Paket harga (lib/packages.ts), halaman layanan, dan galeri demo PintuWeb untuk kategori ini. */
export const LANJUT = [
  { href: `${PINTUWEB}/paket#link-in-bio`, label: 'Harga paket Link in Bio' },
  { href: `${PINTUWEB}/services/link-in-bio`, label: 'Jasa pembuatan link in bio' },
  { href: `${PINTUWEB}/demo#linkinbio`, label: 'Semua demo PintuWeb' },
];

/** "Baca juga": artikel PintuWeb yang relevan dengan galeri ini. */
export const ARTIKEL = [
  { href: `${PINTUWEB}/artikel/website-vs-media-sosial`, label: 'Website vs media sosial untuk UMKM' },
];
