// Tautan ke situs utama PintuWeb. Portal ini zona terpisah (basePath /link-in-bio) di domain yang sama, jadi
// semua tautan ke situs utama memakai URL absolut dan <a> biasa: next/link akan menempelkan basePath.
export const PINTUWEB = 'https://www.pintuweb.id';

/** Kontak dari PintuWeb/app/lib/site.ts (WA_NUMBER, WA_DISPLAY). Ganti di sana = ganti di sini. */
export const WA_NUMBER = '6285190931399';
export const WA_DISPLAY = '+62 851 9093 1399';
export const wa = (teks) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(teks)}`;

/**
 * Angka paket "link-in-bio" dari PintuWeb/app/lib/packages.ts (harga, waktu) dan RENEWAL_BIO_PER_YEAR.
 * Satu-satunya tempat angka bisnis di portal ini: hero, kartu, dan FAQ mengambil dari sini.
 */
export const PAKET = {
  nama: 'Link in Bio',
  mulai: 'Rp125 ribu',
  sampai: 'Rp375 ribu',
  waktu: '1–2 hari kerja',
  perpanjangan: 'Rp100–150 ribu per tahun',
};

/** Galeri yang tayang di www.pintuweb.id/<path> (lihat lib/portals.ts di PintuWeb). */
export const GALERI = [
  { path: 'landing-page', label: 'Landing Page' },
  { path: 'link-in-bio', label: 'Link in Bio' },
  { path: 'kontes-desain', label: 'Kontes Desain' },
  { path: 'undangan-digital', label: 'Undangan Digital' },
  { path: 'website-portofolio', label: 'Website Portofolio' },
  { path: 'website-reservasi', label: 'Website Reservasi' },
  { path: 'website-properti', label: 'Website Properti' },
  { path: 'aplikasi-to-do', label: 'Aplikasi To-Do' },
  { path: 'toko-online', label: 'Toko Online' },
  { path: 'menu-digital', label: 'Menu Digital' },
];

export const GALERI_LAIN = GALERI.filter((g) => g.path !== 'link-in-bio');

/** Paket harga (lib/packages.ts), halaman layanan, dan galeri demo PintuWeb untuk kategori ini. */
export const LANJUT = [
  { href: `${PINTUWEB}/paket#link-in-bio`, label: 'Harga paket Link in Bio' },
  { href: `${PINTUWEB}/services/link-in-bio`, label: 'Jasa pembuatan link in bio' },
  { href: `${PINTUWEB}/demo#linkinbio`, label: 'Semua demo PintuWeb' },
];
