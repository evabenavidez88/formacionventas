'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// El link /api/pago redirige al cobro del período vigente (lo decide el servidor).
const LINK_PAGO = '/api/pago';

export default function GraciasCliente({ conDescuento }) {
  const [segundos, setSegundos] = useState(5);
  const linkPago = LINK_PAGO;

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
              Estás pagando con el <strong>30% OFF</strong>, válido hasta el 28/10
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
            Completar pago ahora
          </a>

          <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '16px' }}>
            Pago seguro a través de Mercado Pago
          </p>

          <Link href="/" style={{ display: 'block', marginTop: '1rem', fontSize: '0.8rem', color: '#aaa', textDecoration: 'none' }}>
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
