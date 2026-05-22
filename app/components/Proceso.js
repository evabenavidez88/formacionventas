export default function Proceso({ onCTA }) {
  const pasos = [
    { n: '1', t: 'Mapeás la mente de tu cliente', d: 'Entendés cómo decide, qué lo mueve y qué lo frena antes de comprar.' },
    { n: '2', t: 'Reprogramás tu mensaje', d: 'Pasás de improvisar a comunicar con propósito, valor y sin justificar precios.' },
    { n: '3', t: 'Activás el cierre', d: 'Respondés objeciones con claridad y cerrás sin presión, sin miedo, con método.' },
    { n: '4', t: 'Guiás conversaciones', d: 'Las que hoy se enfrían o se pierden dejan de escaparse.' },
    { n: '5', t: 'Trabajás con casos reales', d: 'No es teoría. Es entrenamiento aplicado a tu negocio.' },
  ];

  const formato = [
    { ico: '📅', t: '3 encuentros en vivo', d: 'Miér. 17, Jue. 18 y Vie. 19 de Junio' },
    { ico: '⏰', t: '19:00 a 21:00 hs (ARG)', d: '3 días — 2 horas por encuentro' },
    { ico: '💻', t: '100% online en vivo', d: 'Con acompañamiento y práctica real' },
    { ico: '📚', t: 'Material incluido', d: 'Herramientas para aplicar desde el día 1' },
    { ico: '👥', t: 'Cupos limitados', d: 'No se repite la misma experiencia' },
  ];

  return (
    <section className="sec" style={{ background: 'var(--gris)' }}>
      <div className="container">
        <div className="tc">
          <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#111' }}>El proceso</h2>
          <p style={{ color: '#666', fontSize: '15px' }}>
            No es un curso. Es un proceso. En tres encuentros en vivo vas a trabajar sobre lo que realmente pasa en tus conversaciones.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '52px',
          alignItems: 'start', marginTop: '44px',
        }} className="qe-grid">
          {/* Pasos */}
          <div>
            {pasos.map((p) => (
              <div key={p.n} style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '34px', height: '34px', minWidth: '34px', background: 'var(--lila)',
                  color: '#fff', borderRadius: '50%', fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {p.n}
                </div>
                <div>
                  <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '13.5px', fontWeight: 700, color: '#111', marginBottom: '2px' }}>
                    {p.t}
                  </strong>
                  <span style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{p.d}</span>
                </div>
              </div>
            ))}
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 700, color: 'var(--lila)', marginTop: '8px' }}>
              No es teoría. Entrenamiento real aplicado a tu negocio.
            </p>
          </div>

          {/* Formato */}
          <div style={{ background: 'var(--lila-lt)', borderRadius: '12px', padding: '28px', border: '1px solid var(--lila-md)' }}>
            <span className="tag" style={{ marginBottom: '20px' }}>Formato</span>
            {formato.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '20px', width: '28px', flexShrink: 0 }}>{f.ico}</span>
                <div>
                  <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 700, color: '#111' }}>{f.t}</strong>
                  <span style={{ fontSize: '12px', color: '#666' }}>{f.d}</span>
                </div>
              </div>
            ))}
            <button className="btn-y" style={{ width: '100%', textAlign: 'center', marginTop: '8px' }} onClick={onCTA}>
              Reservá tu lugar
            </button>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 860px) {
            .qe-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
