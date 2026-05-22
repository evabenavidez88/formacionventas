export default function Transformacion() {
  const antes = [
    'Cada conversación empieza de cero',
    'Improvisás y justificás el precio',
    'Esperás que el cliente decida solo',
    'Las objeciones te frenan',
    'Cerrás con presión o no cerrás',
  ];
  const despues = [
    'Sabés qué decir en cada etapa de la venta',
    'Dejás de improvisar',
    'Guiás la conversación con seguridad',
    'Respondés objeciones con claridad y foco',
    'Cerrás sin sentir que estás presionando',
  ];

  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div className="container">
        <div className="tc">
          <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#111' }}>El cambio real</h2>
          <p style={{ color: '#666', fontSize: '15px' }}>
            Esto es lo que cambia cuando trabajás con un método claro
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '40px',
        }} className="tx-grid">
          {/* Antes */}
          <div style={{ background: '#fff', border: '1px solid var(--gris2)', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '16px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,.07)' }}>
              <div style={{ width: '56px', height: '56px', background: 'var(--lila-lt)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>😟</div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb' }}>
                Antes del entrenamiento
              </span>
            </div>
            {antes.map((txt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#222', lineHeight: 1.55 }}>
                <span style={{ color: '#ccc', fontWeight: 700, flexShrink: 0, fontSize: '15px' }}>✗</span>
                <span>{txt}</span>
              </div>
            ))}
          </div>

          {/* Después */}
          <div style={{ background: 'var(--lila-lt)', border: '1px solid var(--lila-md)', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '16px', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,.07)' }}>
              <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,.6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🚀</div>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--lila)' }}>
                Después del entrenamiento
              </span>
            </div>
            {despues.map((txt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px', fontSize: '14px', color: '#222', lineHeight: 1.55 }}>
                <span style={{ color: 'var(--turq)', fontWeight: 700, flexShrink: 0, fontSize: '15px' }}>✓</span>
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          textAlign: 'center', marginTop: '28px', padding: '20px 32px',
          background: 'var(--amarillo-lt)', borderRadius: '10px', borderLeft: '4px solid var(--amarillo)',
        }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '17px', fontWeight: 800, color: '#111', lineHeight: 1.5 }}>
            No se trata de vender más. Se trata de dejar de perder ventas.
          </p>
        </div>

        <style jsx>{`
          @media (max-width: 860px) {
            .tx-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
