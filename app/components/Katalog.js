'use client';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { templates, slugOf } from './templates-data';

const KATEGORI = ['Semua', ...new Set(templates.map((t) => t.category))];

/** Ganti saringan dengan View Transition bila peramban mendukung dan pengguna tidak meminta gerak minimal. */
function useSaringan(awal) {
  const [nilai, setNilai] = useState(awal);
  const ganti = (v) => {
    if (v === nilai) return;
    const diam = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || diam) return setNilai(v);
    document.startViewTransition(() => flushSync(() => setNilai(v)));
  };
  return [nilai, ganti];
}

export default function Katalog({ kepala }) {
  const [cat, setCat] = useSaringan('Semua');
  const list = cat === 'Semua' ? templates : templates.filter((t) => t.category === cat);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-5">
        {kepala}
        {/* Ponsel: satu baris chip yang bisa digeser (tidak menggeser halaman); layar lebar: membungkus */}
        <div role="group" aria-label="Saring menurut kategori" className="-mx-4 flex w-[calc(100%+2rem)] min-w-0 gap-2 overflow-x-auto px-4 py-1 [scrollbar-width:none] sm:mx-0 sm:w-auto sm:flex-wrap sm:overflow-visible sm:px-0">
          {KATEGORI.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`min-h-10 shrink-0 rounded-full border-2 border-ink px-4 text-sm font-bold transition ${cat === c ? 'bg-ink text-kertas shadow-[3px_3px_0_rgba(91,61,245,0.6)]' : 'bg-white hover:bg-kuningx'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">{list.length} template ditampilkan</p>
      </div>

      {/* Grid ponsel: dua kolom sejak layar ponsel supaya katalog tidak memanjang */}
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 sm:mt-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
        {list.map((t) => {
          const slug = slugOf(t);
          return (
            <li key={t.name} className="group relative flex flex-col" style={{ viewTransitionName: `bio-${slug}` }}>
              <div className="phone overflow-hidden p-1.5 sm:p-2">
                <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-white/25 sm:mb-1.5 sm:h-1.5 sm:w-16" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem] sm:rounded-[1.35rem]">
                  <Image
                    src={t.image}
                    alt={`Tampilan template ${t.name} di ponsel`}
                    fill
                    sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 280px"
                    className="object-cover object-top"
                  />
                  <span className="absolute right-2 top-2 rounded-full border-2 border-ink bg-kuningx px-2 py-0.5 text-[10px] font-bold sm:right-3 sm:top-3 sm:px-2.5">{t.category}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-1 flex-col px-0.5 sm:mt-4 sm:px-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <h3 className="font-display text-base font-semibold sm:text-xl">{t.name}</h3>
                  <span className="font-display text-[11px] text-ungu sm:text-xs">@{slug}</span>
                </div>
                <p className="mt-1 line-clamp-3 text-[13px] leading-snug text-mutedx sm:mt-1.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">{t.description}</p>
                <p className="mt-2 hidden font-mono text-[11px] text-ink/70 sm:block">/{t.halaman.map((h) => <span key={h}> · {h}</span>)}</p>
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
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
