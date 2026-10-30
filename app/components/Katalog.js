'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Utensils, Briefcase, Sparkles, Music, Terminal, LayoutGrid } from 'lucide-react';
import { templates, slugOf } from './templates-data';
import { PAKET, waMirip } from './pintuweb';

const KATEGORI = ['Semua', ...new Set(templates.map((t) => t.category))];
const USAHA = [
  { nama: 'Semua', ikon: LayoutGrid },
  { nama: 'Kuliner', ikon: Utensils },
  { nama: 'Jasa', ikon: Briefcase },
  { nama: 'Kreator', ikon: Sparkles },
  { nama: 'Musik', ikon: Music },
  { nama: 'Teknologi', ikon: Terminal },
];
const SLUGS = templates.map(slugOf);
const VARIAN = [320, 480, 640];
// srcset statis untuk <source> potret (varian dibuat scripts/gambar-varian.mjs; sama dengan app/gambar-loader.js)
const srcSet = (src) => VARIAN.map((w) => `${src.replace(/\.[^.]+$/, `-${w}.webp`)} ${w}w`).join(', ');
const diam = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Katalog({ kepala }) {
  const [cat, setCatRaw] = useState('Semua');
  const [usaha, setUsahaRaw] = useState('Semua');
  const [sorot, setSorot] = useState(null);
  const timer = useRef(null);

  /** Ganti saringan dengan View Transition bila peramban mendukung dan pengguna tidak meminta gerak minimal. */
  const ganti = (set, cur) => (v) => {
    if (v === cur) return;
    if (!document.startViewTransition || diam()) return set(v);
    document.startViewTransition(() => flushSync(() => set(v)));
  };
  const setCat = ganti(setCatRaw, cat);
  const setUsaha = ganti(setUsahaRaw, usaha);

  const list = templates.filter((t) => (cat === 'Semua' || t.category === cat) && (usaha === 'Semua' || t.usaha.includes(usaha)));

  /** #slug: setel saringan ke Semua bila perlu, gulir ke kartu (di bawah header lengket), sorot ±2 detik. */
  const kePilihan = useCallback((slug) => {
    flushSync(() => { setCatRaw('Semua'); setUsahaRaw('Semua'); });
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ block: 'start', behavior: diam() ? 'auto' : 'smooth' });
    el.querySelector('a.tautan-kartu')?.focus({ preventScroll: true });
    setSorot(slug);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSorot(null), 2400);
  }, []);

  useEffect(() => {
    const dariHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (SLUGS.includes(slug)) kePilihan(slug);
    };
    const klik = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      const slug = a?.getAttribute('href').slice(1);
      if (!slug || !SLUGS.includes(slug)) return;
      e.preventDefault();
      history.pushState(null, '', `#${slug}`);
      kePilihan(slug);
    };
    const t = setTimeout(dariHash, 80);
    window.addEventListener('hashchange', dariHash);
    document.addEventListener('click', klik);
    return () => { clearTimeout(t); clearTimeout(timer.current); window.removeEventListener('hashchange', dariHash); document.removeEventListener('click', klik); };
  }, [kePilihan]);

  const chip = (aktif) => `min-h-10 shrink-0 rounded-full border-2 border-ink px-4 text-sm font-bold transition ${aktif ? 'bg-ink text-kertas shadow-[3px_3px_0_rgba(91,61,245,0.6)]' : 'bg-white hover:bg-kuningx'}`;
  const baris = '-mx-4 flex w-[calc(100%+2rem)] min-w-0 gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0';
  const label = 'font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-mutedx';

  return (
    <>
      {kepala}
      {/* Ponsel: tiap baris chip bisa digeser (tidak menggeser halaman); layar lebar: membungkus */}
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 sm:gap-4">
        <div>
          <p id="lbl-usaha" className={`${label} mb-1.5`}>Untuk siapa</p>
          <div role="group" aria-labelledby="lbl-usaha" className={baris}>
            {USAHA.map(({ nama, ikon: Ikon }) => (
              <button key={nama} type="button" onClick={() => setUsaha(nama)} aria-pressed={usaha === nama} className={`${chip(usaha === nama)} inline-flex items-center gap-1.5`}>
                <Ikon size={15} aria-hidden="true" /> {nama}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p id="lbl-kat" className={`${label} mb-1.5`}>Kategori</p>
          <div role="group" aria-labelledby="lbl-kat" className={baris}>
            {KATEGORI.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className={chip(cat === c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-mutedx" aria-live="polite" role="status">Menampilkan {list.length} dari {templates.length} contoh</p>

      {list.length === 0 && (
        <div className="mt-6 rounded-3xl border-2 border-dashed border-ink/40 p-8 text-center">
          <p className="font-display text-base font-semibold">Belum ada contoh yang cocok.</p>
          <button type="button" onClick={() => { setCatRaw('Semua'); setUsahaRaw('Semua'); }} className="mt-4 min-h-10 rounded-full border-2 border-ink bg-kuningx px-5 text-sm font-bold">Tampilkan semua</button>
        </div>
      )}

      {/* Grid ponsel: dua kolom sejak layar ponsel supaya katalog tidak memanjang */}
      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-9 sm:mt-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
        {list.map((t) => {
          const slug = slugOf(t);
          const aktif = sorot === slug;
          return (
            <li key={t.name} id={slug} className={`group relative flex scroll-mt-24 flex-col ${aktif ? 'sorot' : ''}`} style={{ viewTransitionName: `bio-${slug}` }}>
              {aktif && <span aria-hidden="true" className="stiker-sorot absolute -top-3 start-2 z-20 rotate-[-6deg] rounded-full border-2 border-ink bg-kuningx px-3 py-1 font-display text-[11px] font-semibold shadow-[2px_2px_0_var(--color-ink)]">✦ Ini dia</span>}
              <div className="phone overflow-hidden p-1.5 sm:p-2">
                <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-white/25 sm:mb-1.5 sm:h-1.5 sm:w-16" aria-hidden="true" />
                <div className="relative aspect-[3/5] overflow-hidden rounded-[1.1rem] md:aspect-[4/5] sm:rounded-[1.35rem]">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={srcSet(t.potret)} sizes="(max-width: 639px) 46vw, 30vw" />
                    <Image
                      src={t.image}
                      alt={`Tampilan contoh ${t.name} di ponsel`}
                      fill
                      sizes="(max-width: 1023px) 30vw, 280px"
                      className="object-cover object-top"
                    />
                  </picture>
                  <span className="absolute right-2 top-2 rounded-full border-2 border-ink bg-kuningx px-2 py-0.5 text-[10px] font-bold sm:right-3 sm:top-3 sm:px-2.5">{t.category}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-1 flex-col px-0.5 sm:mt-4 sm:px-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className="font-display text-base font-semibold sm:text-xl">{t.name}</h3>
                  <span className="font-display text-[11px] text-ungu sm:text-xs">@{slug}</span>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-mutedx sm:mt-1.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">{t.description}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 sm:mt-3">
                  {t.terjual > 0 && <span className="rounded-full bg-ungu px-2.5 py-1 text-[11px] font-bold text-white">{t.terjual} terjual</span>}
                  {t.tags.map((tag) => (
                    <span key={tag} className="hidden rounded-full bg-ink/5 px-2.5 py-1 text-[11px] font-semibold text-ink/75 sm:inline-block">{tag}</span>
                  ))}
                </div>
                {/* Satu tautan per kartu; ::after membentang menutupi seluruh kartu */}
                <a href={t.url} target="_blank" rel="noopener noreferrer" className="tautan-kartu mt-auto inline-flex min-h-6 items-center self-start pt-3 gap-1 text-sm font-bold text-ungu underline-offset-4 after:absolute after:inset-0 after:rounded-[2rem] group-hover:underline sm:pt-4">
                  Lihat demo<span className="sr-only"> {t.name} (tab baru)</span> <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                {/* Pesan yang mirip: di atas tautan penutup kartu (z-10) */}
                <a href={waMirip(t.name, t.url)} target="_blank" rel="noopener noreferrer" className="relative z-10 mt-2.5 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-kuningx px-3 text-center text-[12px] font-bold leading-tight shadow-[2px_2px_0_var(--color-ink)] transition hover:translate-x-px hover:translate-y-px hover:shadow-none sm:self-start sm:px-4 sm:text-[13px]">
                  <MessageCircle size={14} aria-hidden="true" className="shrink-0" /> Pesan yang mirip<span className="sr-only"> dengan {t.name} lewat WhatsApp</span>
                </a>
                <p className="mt-1.5 text-[11px] font-semibold text-ink/70">mulai {PAKET.mulai} · {PAKET.waktu}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
