import Image from 'next/image';

export default function SobreEva({ onCTA }) {
  const items = [
    'Experiencia real en negocios y ventas',
    'Coaching y neurocoaching',
    'Comprensión del comportamiento del cliente',
  ];

  return (
    <section className="sec" style={{ background: 'var(--gris)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '380px 1fr',
          gap: '60px', alignItems: 'center',
        }} className="qs-grid">
          {/* Foto */}
          <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src="/images/sobre-foto.jpg"
              alt="Eva Benavidez"
              width={380}
              height={520}
              style={{ width: '100%', height: '520px', objectFit: 'cover', objectPosition: 'center 10%' }}
            />
          </div>

          {/* Texto */}
          <div>
            <span className="tag">Quién te acompaña</span>
            <h2 style={{ fontSize: '28px', marginBottom: '16px', color: '#111' }}>
              Soy Eva Benavidez
            </h2>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.7, marginBottom: '20px' }}>
              Hace más de <strong>24 años</strong> acompaño a personas y equipos a mejorar cómo venden. Mi enfoque combina:
            </p>

            {items.map((txt, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 16px', background: '#fff', border: '1px solid var(--gris2)',
                borderRadius: '8px', borderLeft: '3px solid var(--turq)', marginBottom: '10px',
              }}>
                <span style={{ color: 'var(--turq)', fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: '13.5px', color: '#333' }}>{txt}</span>
              </div>
            ))}

            <div style={{
              borderLeft: '3px solid var(--amarillo)', padding: '14px 20px',
              background: 'var(--amarillo-lt)', borderRadius: '0 8px 8px 0', marginTop: '20px',
            }}>
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '14px', fontWeight: 600, fontStyle: 'italic', color: '#333', lineHeight: 1.6 }}>
                "El 90% de la venta es convicción y solo el 10% persuasión." — Eva Benavidez
              </p>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button className="btn-p" onClick={onCTA}>Quiero sumarme →</button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 860px) {
            .qs-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
