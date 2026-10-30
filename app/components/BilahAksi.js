'use client';
import { useEffect, useState } from 'react';
import { MessageCircle, LayoutGrid } from 'lucide-react';

/**
 * Bilah aksi lengket untuk ponsel (< 768 px): muncul setelah hero (#hero) lewat, hilang saat footer terlihat.
 * `wa` = tautan WhatsApp berisi pesan sesuai jenis portal.
 */
export default function BilahAksi({ wa }) {
  const [heroLewat, setHeroLewat] = useState(false);
  const [footer, setFooter] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const kaki = document.getElementById('kaki');
    if (!hero || !kaki) return;
    const a = new IntersectionObserver(([e]) => setHeroLewat(!e.isIntersecting && e.boundingClientRect.bottom < 0), { threshold: 0 });
    const b = new IntersectionObserver(([e]) => setFooter(e.isIntersecting), { threshold: 0 });
    a.observe(hero); b.observe(kaki);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);

  const tampil = heroLewat && !footer;
  return (
    <div
      aria-hidden={!tampil}
      className={`fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-kertas/95 px-3 pt-2.5 backdrop-blur md:hidden ${tampil ? 'translate-y-0' : 'invisible translate-y-full'}`}
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))', transition: 'transform .25s ease, visibility .25s' }}
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href="#templates" className="inline-flex min-h-11 flex-[0.8] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-ink bg-white px-3 font-display text-[11px] font-semibold shadow-[3px_3px_0_var(--color-ink)]">
          <LayoutGrid size={15} aria-hidden="true" /> Lihat demo
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-ink bg-kuningx px-3 font-display text-[11px] font-semibold shadow-[3px_3px_0_var(--color-ink)]">
          <MessageCircle size={15} aria-hidden="true" /> Pesan via WhatsApp
        </a>
      </div>
    </div>
  );
}
