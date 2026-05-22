'use client';
import { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation';

function validarEmail(e) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e);
}
function validarNombre(n) { return n.trim().length >= 2; }

const FormInscripcion = forwardRef(function FormInscripcion(props, ref) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errNombre, setErrNombre] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit() {
    setErrNombre(false);
    setErrEmail(false);
    let ok = true;
    if (!validarNombre(nombre)) { setErrNombre(true); ok = false; }
    if (!validarEmail(email)) { setErrEmail(true); ok = false; }
    if (!ok) return;

    setEnviando(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });
    } catch (e) { console.log(e); }
    router.push('/gracias');
  }

  return (
    <section ref={ref} style={{ background: 'var(--lila-lt)', borderTop: '1px solid var(--lila-md)', padding: '64px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          background: '#fff', borderRadius: '16px', padding: '40px',
          maxWidth: '480px', width: '100%',
          boxShadow: '0 4px 32px rgba(134,82,115,0.1)',
          border: '1px solid var(--lila-md)', borderTop: '4px solid var(--lila)',
        }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: '10px', fontWeight: 700,
            letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--lila)',
            padding: '5px 16px', borderRadius: '30px', display: 'inline-block',
            marginBottom: '18px', border: '1.5px solid var(--lila-md)',
          }}>
            Entrenamiento ✦ Junio 2025
          </span>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
            Reservá tu lugar
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>
            Completá tus datos y te contactamos con los detalles de pago.
          </p>

          <div style={{ marginBottom: '14px' }}>
            <input
              type="text"
              placeholder="Tu nombre"
              autoComplete="name"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              onBlur={() => { if (nombre.trim()) setErrNombre(!validarNombre(nombre)); }}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: `1.5px solid ${errNombre ? '#e74c3c' : 'var(--lila-md)'}`,
                fontSize: '15px', outline: 'none', fontFamily: "'Lato', sans-serif",
                background: '#fff', color: '#111', boxSizing: 'border-box',
              }}
            />
            {errNombre && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>Por favor ingresá tu nombre</span>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="email"
              placeholder="Tu email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => { if (email.trim()) setErrEmail(!validarEmail(email)); }}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: `1.5px solid ${errEmail ? '#e74c3c' : 'var(--lila-md)'}`,
                fontSize: '15px', outline: 'none', fontFamily: "'Lato', sans-serif",
                background: '#fff', color: '#111', boxSizing: 'border-box',
              }}
            />
            {errEmail && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>Ingresá un email válido</span>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={enviando}
            style={{
              width: '100%', padding: '15px', background: 'var(--amarillo)', color: '#111',
              border: 'none', borderRadius: '8px', fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '15px', cursor: enviando ? 'not-allowed' : 'pointer',
              opacity: enviando ? 0.7 : 1,
            }}
          >
            {enviando ? 'Enviando...' : '→ Quiero inscribirme'}
          </button>

          <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginTop: '14px' }}>
            🔒 Sin spam · Te contactamos a la brevedad
          </p>
          <p style={{ fontSize: '12px', color: 'var(--lila)', textAlign: 'center', marginTop: '6px', fontWeight: 700 }}>
            ⚠ Cupos limitados · Inicio Miércoles 17 de Junio
          </p>
        </div>
      </div>
    </section>
  );
});

export default FormInscripcion;
