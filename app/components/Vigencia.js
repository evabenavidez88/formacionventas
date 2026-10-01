'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Cuenta regresiva real hasta el fin de la promo (28/10 23:59 ARG).
// Al vencer desaparece y la página se vuelve a pedir al servidor con el precio completo.
export function CuentaRegresiva({ finMs }) {
  const router = useRouter();
  const [resto, setResto] = useState(null);

  useEffect(() => {
    const tick = () => {
      const r = finMs - Date.now();
      setResto(r);
      if (r <= 0) { clearInterval(id); router.refresh(); }
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [finMs, router]);

  if (resto === null || resto <= 0) return null;
  const s = Math.floor(resto / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const seg = s % 60;
  const dos = (n) => String(n).padStart(2, '0');
  return (
    <div className="cuenta" role="timer" aria-live="off">
      <span className="cuenta-label">El descuento termina en</span>
      <span className="cuenta-num">
        <b>{d}</b>{d === 1 ? ' día' : ' días'} <b>{dos(h)}</b>h <b>{dos(m)}</b>m <b>{dos(seg)}</b>s
      </span>
    </div>
  );
}

// Si la página quedó abierta al cambiar de período, la refresca sola.
export function RefrescoPromo({ finMs, promo }) {
  const router = useRouter();
  useEffect(() => {
    if (!promo) return;
    const falta = finMs - Date.now();
    if (falta <= 0) { router.refresh(); return; }
    if (falta > 2_147_000_000) return; // setTimeout no admite más de ~24 días
    const t = setTimeout(() => router.refresh(), falta + 500);
    return () => clearTimeout(t);
  }, [finMs, promo, router]);
  return null;
}
