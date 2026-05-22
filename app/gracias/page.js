'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Cutoff: 4 de junio 23:59 ART (UTC-3) = 5 de junio 02:59 UTC
const CUTOFF = new Date('2025-06-05T03:00:00Z');
const LINK_30OFF = 'https://mpago.la/1Aichrk';
const LINK_FULL  = 'https://mpago.la/24VkqZM';

function getLinkPago() {
  return Date.now() < CUTOFF.getTime() ? LINK_30OFF : LINK_FULL;
}

function getTieneDescuento() {
  return Date.now() < CUTOFF.getTime();
}

export default function GraciasPage() {
  const [segundos, setSegundos] = useState(5);
  const linkPago = getLinkPago();
  const conDescuento = getTieneDescuento();

  useEffect(() => {
    // Pixel
    if (typeof fbq !== 'undefined') fbq('track', 'Lead');

    // Countdown y redirect automático
    const interval = setInterval(() => {
      setSegundos(s => {
        if (s <= 1) {
          clearInterval(interval);
          window.location.href = linkPago;
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [linkPago]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f8f6', display: 'flex', flexDirection: 'column', fontFamily: "'Lato', sans-serif" }}>
      <div style={{ height: '5px', background: 'var(--lila)', width: '100%' }} />

      <nav style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Link href="/">
          <Image src="/images/logo.png" alt="Eva Benavidez" width={120} height={48} style={{ objectFit: 'contain' }} />
        </Link>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '3rem 2.5rem',
          maxWidth: '520px', width: '100%', textAlign: 'center',
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)', borderTop: '5px solid var(--lila)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>

          <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.75rem', fontWeight: 800, color: '#0a0a0a', marginBottom: '1rem' }}>
            ¡Ya casi estás adentro!
          </h1>

          <p style={{ fontSize: '1rem', color: '#444', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            Registramos tus datos correctamente. <strong>El último paso es completar el pago</strong> para confirmar tu lugar en el entrenamiento.
          </p>

          {conDescuento && (
            <div style={{
              background: 'var(--amarillo-lt)', border: '1px solid var(--amarillo)',
              borderRadius: '10px', padding: '10px 18px', margin: '16px 0',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '13px', color: '#111',
            }}>
              🎁 Estás pagando con el <strong>30% OFF</strong> — válido hasta el 4 de junio
            </div>
          )}

          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '24px' }}>
            Serás redirigido automáticamente en <strong style={{ color: 'var(--lila)', fontSize: '1.1rem' }}>{segundos}s</strong>…
          </p>

          <a
            href={linkPago}
            style={{
              display: 'block', padding: '16px 28px',
              background: 'var(--amarillo)', color: '#111',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '1rem',
              borderRadius: '8px', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(243,213,25,0.4)',
            }}
          >
            → Completar pago ahora
          </a>

          <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '16px' }}>
            🔒 Pago seguro a través de Mercado Pago
          </p>

          <Link href="/" style={{ display: 'block', marginTop: '1rem', fontSize: '0.8rem', color: '#aaa', textDecoration: 'none' }}>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
