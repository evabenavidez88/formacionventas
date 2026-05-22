'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GraciasPage() {
  useEffect(() => {
    if (typeof fbq !== 'undefined') fbq('track', 'Lead');
  }, []);

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
            ¡Recibimos tu inscripción!
          </h1>
          <p style={{ fontSize: '1rem', color: '#444', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            Te contactamos a la brevedad con los detalles de pago para confirmar tu lugar en el <strong>Entrenamiento de Neuroventa Digital</strong>.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Mientras tanto, podés sumarte al grupo de WhatsApp para estar al tanto de todo.
          </p>

          <a
            href="https://wa.me/message/X2BA2P356X5DG1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#25D366', color: '#fff',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: '0.95rem',
              padding: '14px 28px', borderRadius: '50px', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
            }}
          >
            💬 Escribinos por WhatsApp
          </a>

          <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '1rem' }}>
            🔒 Tus datos están seguros
          </p>

          <Link href="/" style={{ display: 'block', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--lila)', textDecoration: 'none', fontWeight: 600 }}>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
