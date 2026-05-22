'use client';
import Image from 'next/image';

export default function Hero({ onCTA }) {
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      minHeight: '600px', background: '#fff',
    }} className="hero-section">
      {/* Izquierda */}
      <div style={{ padding: '68px 5% 68px 6%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: '10px', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--lila)',
          border: '1.5px solid var(--lila-md)', background: 'var(--lila-lt)',
          borderRadius: '30px', padding: '5px 18px', display: 'inline-block', marginBottom: '18px',
        }}>
          Entrenamiento · Online en vivo · Junio 2025
        </div>

        <h1 style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 800, color: '#111',
          fontSize: '36px', lineHeight: 1.15, marginBottom: '6px',
        }}>
          Entrenamiento de <span style={{ color: 'var(--lila)' }}>Neuroventa Digital</span>
        </h1>

        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
          fontSize: '18px', color: '#555', marginBottom: '18px', lineHeight: 1.3,
        }}>
          3 días para hackear tu mente y vender diferente
        </p>

        <p style={{ fontSize: '15px', color: '#333', lineHeight: 1.8, marginBottom: '4px', fontWeight: 700 }}>
          Dejá de improvisar al vender y empezá a cerrar con claridad, foco y seguridad.
        </p>
        <p style={{ fontSize: '13.5px', color: '#888', lineHeight: 1.65, marginBottom: '20px' }}>
          Un entrenamiento práctico para aprender a guiar conversaciones y convertirlas en ventas.
        </p>

        <div style={{
          background: 'var(--gris)', borderRadius: '8px', padding: '14px 18px',
          marginBottom: '24px', borderLeft: '3px solid var(--lila)',
        }}>
          {[
            ['📅', 'Miércoles 17, Jueves 18 y Viernes 19 de Junio'],
            ['⏰', '19:00 a 21:00 hs — 2 horas por encuentro'],
            ['💻', 'Online en vivo · Cupos limitados'],
          ].map(([ico, txt]) => (
            <p key={txt} style={{ fontSize: '13px', color: '#444', marginBottom: '4px', display: 'flex', gap: '8px' }}>
              <span>{ico}</span><span>{txt}</span>
            </p>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn-y" onClick={onCTA}>Quiero inscribirme</button>
          <a href="https://wa.me/message/X2BA2P356X5DG1" target="_blank" rel="noopener noreferrer" className="btn-wpp">
            Tengo una duda →
          </a>
        </div>
      </div>

      {/* Derecha: foto */}
      <div style={{ overflow: 'hidden', background: 'var(--lila-lt)', position: 'relative' }}>
        <Image
          src="/images/hero-foto.jpg"
          alt="Eva Benavidez"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <div style={{
          position: 'absolute', bottom: '24px', left: '20px',
          background: 'rgba(134,82,115,.82)', color: '#fff', borderRadius: '8px',
          padding: '10px 16px', fontFamily: "'Montserrat', sans-serif",
          fontSize: '11px', fontWeight: 700, letterSpacing: '1px',
          textTransform: 'uppercase', lineHeight: 1.4,
        }}>
          Neuroventas ✦<br />Junio 2025
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .hero-section { grid-template-columns: 1fr !important; }
          .hero-section > div:last-child { height: 300px; }
          .hero-section > div:first-child { padding: 52px 5% !important; }
          h1 { font-size: 28px !important; }
        }
      `}</style>
    </section>
  );
}
