export default function Contenido() {
  const items = [
    { ico: '🧠', t: 'Cómo dejar de dudar al vender', d: 'Confianza y claridad en el momento clave.' },
    { ico: '👁', t: 'Detectar lo que el cliente necesita', d: 'Escucha activa y lectura del comportamiento.' },
    { ico: '💬', t: 'Comunicar valor sin justificar el precio', d: 'Tu propuesta con fuerza y sin disculpas.' },
    { ico: '🛡', t: 'Responder objeciones', d: '"Está caro" o "lo pienso" dejan de frenarte.' },
    { ico: '🎯', t: 'Cerrar con seguridad', d: 'Con método, sin presión, sin improvisar.' },
    { ico: '⚙️', t: 'Proceso mental', d: 'Reordenás cómo pensás y llevás cada venta.' },
  ];

  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div className="container">
        <div className="tc">
          <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#111' }}>Contenido</h2>
          <p style={{ color: '#666', fontSize: '15px' }}>
            Durante el entrenamiento vas a trabajar en
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 700, color: 'var(--lila)', marginTop: '6px' }}>
            Entrenamiento real aplicado a tus conversaciones.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginTop: '40px',
        }} className="cont-grid">
          {items.map((item, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--gris2)', borderRadius: '12px',
              padding: '28px 20px 24px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center', gap: '14px',
            }}>
              <div style={{
                width: '80px', height: '80px', background: 'var(--lila-lt)',
                borderRadius: '16px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '32px',
              }}>
                {item.ico}
              </div>
              <strong style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '13px', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
                {item.t}
              </strong>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5 }}>{item.d}</p>
            </div>
          ))}
        </div>

        <style jsx>{`
          @media (max-width: 860px) {
            .cont-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .cont-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
