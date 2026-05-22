'use client';
import { useState, useEffect } from 'react';

function useCountdown(target) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    function calc() {
      const diff = new Date(target) - Date.now();
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0 });
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export default function Precio({ onCTA }) {
  const { d, h, m, s } = useCountdown('2025-06-04T23:59:59-03:00');

  const incluye = [
    '3 encuentros en vivo — 6 horas de entrenamiento',
    'Material y herramientas incluidas',
    'Acompañamiento real + práctica',
    'Acceso a grabaciones de los encuentros',
  ];

  return (
    <section className="sec" style={{ background: 'var(--gris)' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <div className="tc" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: '#111', marginBottom: '8px' }}>Inversión</h2>
          <p style={{ color: '#666', fontSize: '15px' }}>Sumate al entrenamiento</p>
        </div>

        {/* Countdown */}
        <div className="cdwn">
          {[['Días', d], ['Horas', h], ['Min', m], ['Seg', s]].map(([lbl, val]) => (
            <div className="cdb" key={lbl}>
              <div className="cdn">{String(val).padStart(2, '0')}</div>
              <div className="cdl">{lbl}</div>
            </div>
          ))}
        </div>

        {/* Precio card */}
        <div style={{
          background: '#fff', border: '1px solid var(--lila-md)',
          borderRadius: '16px', padding: '40px', textAlign: 'center', marginBottom: '16px',
        }}>
          <div style={{
            background: 'var(--amarillo)', color: '#111', fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px', fontWeight: 800, letterSpacing: '2px', padding: '5px 18px',
            borderRadius: '20px', display: 'inline-block', marginBottom: '16px', textTransform: 'uppercase',
          }}>
            30% OFF · hasta el 4/6
          </div>

          <div style={{ fontSize: '18px', color: '#ccc', textDecoration: 'line-through', fontFamily: "'Montserrat', sans-serif", marginBottom: '2px' }}>
            $65.000
          </div>
          <div style={{ fontSize: '58px', fontWeight: 800, color: 'var(--lila)', fontFamily: "'Montserrat', sans-serif", lineHeight: 1, marginBottom: '4px' }}>
            $45.500
          </div>
          <div style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
            3 cuotas sin interés de $15.167
          </div>

          <button className="btn-y-lg" style={{ width: '100%' }} onClick={onCTA}>
            Quiero inscribirme
          </button>

          <div style={{ borderTop: '1px solid var(--gris2)', paddingTop: '18px', marginTop: '20px', textAlign: 'left' }}>
            {incluye.map((txt, i) => (
              <div key={i} style={{ fontSize: '13px', color: '#555', padding: '5px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ color: 'var(--turq)', fontWeight: 700, fontSize: '15px' }}>✓</span>
                {txt}
              </div>
            ))}
          </div>
        </div>

        {/* Urgencia */}
        <div style={{
          background: '#fff', border: '1px solid var(--lila-md)', borderRadius: '10px', padding: '18px 24px', textAlign: 'center',
        }}>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            ⚠️ <span>Cupos limitados — no se repite la misma experiencia</span>
          </p>
          <p style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            📅 <span>Inicio: <strong style={{ color: '#111' }}>Miércoles 17 de Junio</strong></span>
          </p>
          <p style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
            📅 <span>Inscripciones hasta: <strong style={{ color: '#111' }}>Martes 16 de Junio</strong></span>
          </p>
        </div>
      </div>
    </section>
  );
}
