import { AtSign, ArrowDown, ArrowUpRight, MessageCircle, MousePointerClick, Rocket, Link2, Palette, Smartphone, BadgeCheck, ChevronDown } from 'lucide-react';
import Katalog from './components/Katalog';
import GaleriLain from './components/GaleriLain';
import BilahAksi from './components/BilahAksi';
import { templates, slugOf } from './components/templates-data';
import { LANJUT, ARTIKEL, GALERI_LAIN, PINTUWEB, PAKET, WA_DISPLAY, JENIS, wa } from './components/pintuweb';

const WA = wa(`Halo PintuWeb, saya tertarik ${JENIS}. Boleh minta info?`);
const N = templates.length;

const KENAPA = [
  { icon: Link2, title: 'Satu link untuk semua', desc: 'Instagram, TikTok, toko, dan portofolio ada di satu tempat.' },
  { icon: Palette, title: 'Gaya yang beda', desc: 'Bukan tampilan polos. Pilih yang cocok dengan karaktermu.' },
  { icon: Smartphone, title: 'Enak dibuka di HP', desc: 'Ringan, jadi cepat terbuka walau sinyal kecil.' },
  { icon: BadgeCheck, title: 'Milikmu sendiri', desc: `Tanpa langganan bulanan. Domain dan hosting tahun pertama sudah termasuk, lalu sekitar ${PAKET.perpanjangan}.` },
];

const LANGKAH = [
  { icon: MousePointerClick, no: '01', title: 'Pilih contoh', desc: `Lihat ${N} contoh, pilih yang paling cocok.` },
  { icon: MessageCircle, no: '02', title: 'Chat via WhatsApp', desc: 'Kirim nama contoh dan isi link-mu.' },
  { icon: Rocket, no: '03', title: `Online dalam ${PAKET.waktu}`, desc: 'Link siap kamu pasang di bio Instagram dan TikTok.' },
];

const TANYA = [
  { q: 'Apa itu link in bio?', a: 'Satu halaman berisi semua tautanmu, seperti Instagram, toko, dan menu. Kamu pasang satu link itu di bio Instagram atau TikTok.' },
  { q: 'Apa bedanya dengan Linktree gratis?', a: 'Desainnya dibuat sesuai gayamu, pakai domain sendiri, dan tanpa langganan bulanan. Tidak ada logo pihak lain.' },
  { q: 'Warna dan isinya bisa diganti?', a: 'Bisa. Warna, foto, urutan tautan, dan teks sapaan kami sesuaikan dengan usahamu.' },
  { q: 'Berapa lama pembuatannya?', a: `Biasanya ${PAKET.waktu} setelah isi tautan dan foto lengkap.` },
  { q: 'Berapa biayanya?', a: `${PAKET.mulai}–${PAKET.sampai} per halaman. Domain dan hosting tahun pertama sudah termasuk, lalu sekitar ${PAKET.perpanjangan}.` },
  { q: 'Bisa menambah tautan nanti?', a: 'Bisa. Kamu dapat panduan singkat, atau kirim perubahannya lewat WhatsApp dan kami ubahkan.' },
];

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: TANYA.map((t) => ({ '@type': 'Question', name: t.q, acceptedAnswer: { '@type': 'Answer', text: t.a } })),
};

function Logo({ kecil = false }) {
  return (
    <>
      {/* Logo pintu asli PintuWeb (367x512, tidak diubah). Di latar gelap diberi alas putih membulat. */}
      {kecil ? (
        <span className="grid shrink-0 place-items-center rounded-lg bg-white p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/link-in-bio/images/logo-pintuweb.png" alt="" width="22" height="30" className="h-[30px] w-auto" />
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/link-in-bio/images/logo-pintuweb.png" alt="" width="23" height="32" className="h-8 w-auto shrink-0" />
      )}
      <span className="flex flex-col text-left leading-none">
        PintuWeb{' '}
        <span className={`mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.18em] ${kecil ? 'text-kuningx' : 'text-ungu'}`}>Link in Bio</span>
      </span>
    </>
  );
}

export default function PortalBio() {
  return (
    <div id="top" className="min-h-screen">
      <a href="#konten" className="lewati">Lewati ke konten</a>
      {/* Jejak: portal ini bagian dari PintuWeb */}
      <nav aria-label="Jejak" className="relative z-50 bg-ink text-xs text-kertas">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-1.5 sm:px-6 lg:px-8">
          <a href={PINTUWEB} className="inline-flex min-h-8 items-center font-semibold underline-offset-4 hover:underline">PintuWeb</a>
          <span aria-hidden="true" className="opacity-60">/</span>
          <span aria-current="page">Link in Bio</span>
          <GaleriLain />
        </div>
      </nav>

      <header className="sticky top-0 z-40 border-b-2 border-ink bg-kertas/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-extrabold">
            <Logo />
          </a>
          <nav aria-label="Navigasi halaman" className="hidden items-center gap-6 text-sm font-bold text-ink/70 md:flex">
            <a href="#templates" className="transition hover:text-ungu">Contoh</a>
            <a href="#kenapa" className="transition hover:text-ungu">Kenapa</a>
            <a href="#cara" className="transition hover:text-ungu">Cara Pesan</a>
            <a href="#tanya" className="transition hover:text-ungu">FAQ</a>
          </nav>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-full border-2 border-ink bg-kuningx px-3 py-2 text-[13px] font-bold sm:text-sm shadow-[3px_3px_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--color-ink)] sm:px-5">
            Pesan link in bio
          </a>
        </div>
      </header>

      <main id="konten" tabIndex={-1}>
        {/* Hero */}
        <section id="hero" className="dots-bg relative overflow-hidden px-4 pb-8 pt-7 text-center sm:px-6 sm:pb-14 sm:pt-16">
          <div className="relative mx-auto max-w-4xl">
            <span className="naik hidden items-center gap-2 sm:inline-flex rounded-full border-2 border-ink bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide shadow-[3px_3px_0_var(--color-ink)]">
              ✦ {N} contoh · {N} gaya
            </span>
            <h1 className="font-display text-[2rem] font-extrabold leading-[1.05] min-[400px]:text-4xl sm:mt-7 sm:text-6xl md:text-7xl">
              Satu link.<br />Seribu <span className="text-ungu">kepribadian</span><span className="text-kuningx">.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-mutedx sm:mt-6 sm:text-lg">
              Link in bio adalah satu halaman berisi semua tautanmu, untuk dipasang di bio Instagram atau TikTok.
            </p>
            <div className="naik naik-2 mt-4 flex flex-col items-center gap-3 sm:mt-9 sm:gap-4">
              <a href="#templates" className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ungu px-7 py-3 font-display text-sm font-semibold text-white shadow-[4px_4px_0_var(--color-ink)] sm:px-8 sm:py-4 transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--color-ink)]">
                Lihat Contoh <ArrowDown size={16} aria-hidden="true" />
              </a>
              {/* Ringkasan paket: angka dari PAKET (PintuWeb packages.ts) */}
              <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-semibold text-ink/80">
                <span>Mulai <strong className="font-display text-ungu">{PAKET.mulai}</strong></span>
                <span aria-hidden="true" className="text-kuningx">✦</span>
                <span>{PAKET.waktu}</span>
                <span className="hidden sm:inline"><span aria-hidden="true" className="mr-2 text-kuningx">✦</span>domain & hosting tahun pertama</span>
              </p>
            </div>
            {/* Ponsel: strip demo yang bisa digeser; tiap item menaut ke #slug kartunya di katalog */}
            <nav aria-label="Pintasan demo" className="mt-5 md:hidden">
              <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-1 text-left [scrollbar-width:none]">
                {templates.map((t) => (
                  <li key={t.name} className="w-[76px] shrink-0 snap-start">
                    <a href={`#${slugOf(t)}`} className="group block">
                      <span className="phone block overflow-hidden !rounded-[0.9rem] !border-2 !shadow-[3px_3px_0_rgba(25,20,35,0.9)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.potret.replace(/\.webp$/, '-320.webp')} alt="" width="76" height="130" loading="lazy" className="aspect-[76/130] w-full object-cover object-top" />
                      </span>
                      <span className="mt-1.5 block truncate text-center font-display text-[11px] font-semibold">{t.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Marquee handle: dekorasi, isinya sudah ada di kartu */}
        <div className="marquee overflow-hidden border-y-2 border-ink bg-ungu py-2.5 text-white sm:py-3" aria-hidden="true">
          <div className="flex w-max animate-marquee-x">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center">
                {templates.map((t) => (
                  <span key={t.name} className="flex items-center gap-5 px-5 font-display text-base font-semibold sm:text-lg">
                    @{t.name.toLowerCase()} <span className="text-kuningx">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Katalog */}
        <section id="templates" aria-labelledby="judul-koleksi" className="scroll-mt-[60px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Katalog
              kepala={
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ungu">Contoh</p>
                  <h2 id="judul-koleksi" className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Pilih gaya yang kamu suka</h2>
                </div>
              }
            />
          </div>
        </section>

        {/* Kenapa link-in-bio */}
        <section id="kenapa" aria-labelledby="judul-kenapa" className="scroll-mt-[60px] border-t-2 border-ink bg-kertas px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="sm:text-center">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ungu">Kenapa perlu</p>
              <h2 id="judul-kenapa" className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Bio Instagram itu <span className="text-ungu">terbatas</span></h2>
              <p className="mt-3 max-w-xl text-mutedx sm:mx-auto sm:mt-4">Satu link bisa memuat semua yang ingin kamu tunjukkan.</p>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {KENAPA.map((k) => (
                <li key={k.title} className="flex items-start gap-4 rounded-2xl border-2 border-ink bg-white p-4 shadow-[4px_4px_0_var(--color-ink)] transition sm:block sm:rounded-3xl sm:p-6 sm:shadow-[5px_5px_0_var(--color-ink)] sm:hover:-translate-y-1 sm:hover:shadow-[7px_7px_0_rgba(91,61,245,0.7)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-ungu text-white sm:h-12 sm:w-12"><k.icon size={21} aria-hidden="true" /></span>
                  <div className="sm:mt-4">
                    <h3 className="font-display text-base font-semibold sm:text-lg">{k.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mutedx sm:mt-2">{k.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cara pesan */}
        <section id="cara" aria-labelledby="judul-cara" className="scroll-mt-[60px] border-t-2 border-ink bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="sm:text-center">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ungu">Cara pesan</p>
              <h2 id="judul-cara" className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Tiga langkah saja</h2>
            </div>
            <ol className="mt-8 grid gap-3 sm:mt-12 sm:gap-6 md:grid-cols-3">
              {LANGKAH.map((l) => (
                <li key={l.no} className="relative flex items-start gap-4 rounded-3xl border-2 border-ink bg-kertas p-4 shadow-[4px_4px_0_var(--color-ink)] sm:block sm:p-7 sm:shadow-[5px_5px_0_var(--color-ink)]">
                  <span data-no={l.no} className="absolute right-5 top-4 hidden font-display text-4xl font-extrabold text-ink/10 before:content-[attr(data-no)] sm:block" aria-hidden="true" />
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-kuningx sm:h-12 sm:w-12"><l.icon size={21} aria-hidden="true" /></span>
                  <div className="sm:mt-4">
                    <h3 className="font-display text-base font-semibold sm:text-lg"><span className="text-ungu sm:hidden">{l.no} · </span>{l.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-mutedx sm:mt-2">{l.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ: <details> bawaan, satu terbuka sekaligus (name) */}
        <section id="tanya" aria-labelledby="judul-tanya" className="scroll-mt-[60px] border-t-2 border-ink bg-kertas px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="sm:text-center">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-ungu">Tanya jawab</p>
              <h2 id="judul-tanya" className="mt-2 font-display text-3xl font-extrabold md:text-4xl">Yang sering <span className="text-ungu">ditanyakan</span></h2>
            </div>
            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              {TANYA.map((t, i) => (
                <details key={t.q} name="faq-bio" open={i === 0} className="tanya group rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_var(--color-ink)] open:shadow-[5px_5px_0_var(--color-ink)]">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-[15px] font-semibold leading-snug sm:text-base">{t.q}</span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition group-open:rotate-180 group-open:bg-kuningx" aria-hidden="true">
                      <ChevronDown size={15} />
                    </span>
                  </summary>
                  <div className="border-t-2 border-ink/10 px-5 py-4 sm:px-6">
                    <p className="text-sm leading-relaxed text-mutedx">{t.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t-2 border-ink bg-ink px-4 py-16 text-center text-kertas sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border-2 border-kertas/30 bg-ungu text-white sm:h-16 sm:w-16"><AtSign size={28} aria-hidden="true" /></span>
            <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              Bio-mu berhak <span className="text-kuningx">tampil beda</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-kertas/75">Konsultasi gratis. Ceritakan usahamu, kami bantu pilihkan contohnya.</p>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-kuningx px-9 py-4 font-display text-sm font-semibold text-ink transition hover:scale-[1.03] active:scale-95 sm:mt-9">
              <MessageCircle size={17} aria-hidden="true" /> Chat WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer id="kaki" className="border-t border-kertas/10 bg-ink px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-10 text-kertas/70 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <p className="flex items-center gap-2 font-display text-lg font-extrabold text-kertas"><Logo kecil /></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{N} contoh link in bio untuk kreator, musisi, usaha kecil, dan developer.</p>
          </div>
          <nav aria-labelledby="kaki-jelajahi" className="text-sm">
            <p id="kaki-jelajahi" className="font-display text-xs font-bold uppercase tracking-widest text-kuningx">Jelajahi</p>
            <ul className="mt-3 space-y-1">
              <li><a href="#templates" className="inline-block py-1 transition hover:text-kertas">Contoh</a></li>
              <li><a href="#kenapa" className="inline-block py-1 transition hover:text-kertas">Kenapa Link in Bio</a></li>
              <li><a href="#cara" className="inline-block py-1 transition hover:text-kertas">Cara Pesan</a></li>
              <li><a href="#tanya" className="inline-block py-1 transition hover:text-kertas">FAQ</a></li>
            </ul>
          </nav>
          <div className="text-sm">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-kuningx">Hubungi</p>
            <ul className="mt-3 space-y-1">
              <li><a href={WA} target="_blank" rel="noopener noreferrer" className="inline-block py-1 transition hover:text-kertas">WhatsApp <span className="whitespace-nowrap">{WA_DISPLAY}</span></a></li>
              <li><a href={PINTUWEB} className="inline-block py-1 transition hover:text-kertas">pintuweb.id</a></li>
            </ul>
          </div>
        </div>
        {/* Lanjut di PintuWeb: harga, layanan, semua demo, dan galeri lain di situs utama */}
        <nav aria-labelledby="lanjut-pintuweb" className="mx-auto mt-10 max-w-7xl border-t border-kertas/10 pt-8 text-sm">
          <p id="lanjut-pintuweb" className="font-display text-xs font-bold uppercase tracking-widest text-kuningx">Lanjut di PintuWeb</p>
          <ul className="mt-4 flex flex-wrap gap-2.5 sm:gap-3">
            {LANJUT.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border-2 border-kertas/30 px-4 text-xs font-bold text-kertas transition hover:border-kuningx hover:bg-kuningx hover:text-ink">
                  {l.label} <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-kertas/70">Baca juga</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {ARTIKEL.map((a) => (
              <li key={a.href}>
                <a href={a.href} className="inline-block py-1 underline decoration-kertas/25 underline-offset-4 transition hover:text-kertas hover:decoration-kuningx">{a.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-kertas/70">Galeri lain</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {GALERI_LAIN.map((g) => (
              <li key={g.path}>
                <a href={`${PINTUWEB}/${g.path}`} className="inline-block py-1 underline decoration-kertas/25 underline-offset-4 transition hover:text-kertas hover:decoration-kuningx">{g.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mx-auto mt-8 max-w-7xl border-t border-kertas/10 pt-5 text-xs text-kertas/70 sm:text-center">
          © {new Date().getFullYear()} PintuWeb · Galeri Link in Bio · {N} contoh.
        </p>
      </footer>
      <BilahAksi wa={WA} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
    </div>
  );
}
