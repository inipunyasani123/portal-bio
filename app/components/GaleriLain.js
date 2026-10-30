'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GALERI_LAIN, PINTUWEB } from './pintuweb';

/** Tombol "Galeri lain" di bilah jejak: daftar 10 galeri lain. Esc/klik luar/Tab keluar menutup, fokus kembali ke tombol. */
export default function GaleriLain() {
  const [buka, setBuka] = useState(false);
  const akar = useRef(null);
  const tombol = useRef(null);

  useEffect(() => {
    if (!buka) return;
    const tutup = (balik) => { setBuka(false); if (balik) tombol.current?.focus(); };
    const onKey = (e) => { if (e.key === 'Escape') tutup(true); };
    const onKlik = (e) => { if (akar.current && !akar.current.contains(e.target)) tutup(false); };
    const onFokus = (e) => { if (akar.current && !akar.current.contains(e.target)) tutup(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onKlik);
    document.addEventListener('focusin', onFokus);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onKlik);
      document.removeEventListener('focusin', onFokus);
    };
  }, [buka]);

  return (
    <div ref={akar} className="relative ms-auto">
      <button
        ref={tombol}
        type="button"
        aria-expanded={buka}
        aria-controls="daftar-galeri-lain"
        onClick={() => setBuka((b) => !b)}
        className="inline-flex min-h-8 items-center gap-1 rounded-full border border-kertas/40 px-3 text-xs font-bold text-kertas transition hover:bg-kuningx hover:text-ink"
      >
        Galeri lain <ChevronDown size={13} aria-hidden="true" className={`transition ${buka ? 'rotate-180' : ''}`} />
      </button>
      {buka && (
        <ul id="daftar-galeri-lain" className="absolute end-0 top-full z-50 mt-2 w-60 rounded-2xl border-2 border-ink bg-kertas p-1.5 text-sm font-bold text-ink shadow-[4px_4px_0_var(--color-ungu)]">
          {GALERI_LAIN.map((g) => (
            <li key={g.path}>
              <a href={`${PINTUWEB}/${g.path}`} className="flex min-h-10 items-center rounded-xl px-3 transition hover:bg-kuningx">{g.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
