export default function Identificacion({ onCTA }) {
  const items = [
    'Te cuesta hablar de precios y sentís incomodidad.',
    'Te dicen "lo voy a pensar" — y no vuelven.',
    'Sentís que improvisás en cada conversación.',
    'Sabés lo que hacés — pero no sabés cómo venderlo.',
  ];

  return (
    <section className="sec" style={{ background: 'var(--lila-lt)' }}>
      <div className="container">
        <div className="tc">
          <span className="tag">Neuroventas ✦ Junio 2025</span>
          <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#111' }}>
            Este entrenamiento es para vos si…
          </h2>
          <p style={{ color: '#666', fontSize: '15px' }}>¿Te sentís identificado/a?</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', margin: '36px 0',
        }} className="id-grid">
          {items.map((txt, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--gris2)', borderRadius: '12px',
              padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px',
              borderLeft: '3px solid var(--lila)',
            }}>
              <div style={{
                width: '48px', height: '48px', flexShrink: 0,
                background: 'var(--lila-lt)', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px',
              }}>
                {['💬', '⏳', '🎯', '🧩'][i]}
              </div>
              <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.5 }}>{txt}</p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'var(--lila)', borderRadius: '10px', padding: '28px 36px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: '18px',
            fontWeight: 700, color: '#fff', lineHeight: 1.5,
          }}>
            No es falta de capacidad. Es falta de{' '}
            <span style={{ color: 'var(--amarillo)' }}>método.</span>
          </p>
        </div>

        <style jsx>{`
          @media (max-width: 860px) {
            .id-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
