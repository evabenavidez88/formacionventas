'use client';
import { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation';

function validarEmail(e) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e);
}
function validarTexto(n) { return n.trim().length >= 2; }
function validarWhatsapp(n) {
  const digits = n.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
function formatWhatsapp(val) {
  // Solo permite números, espacios, +, - y paréntesis
  return val.replace(/[^\d\s+\-()]/g, '');
}

const FormInscripcion = forwardRef(function FormInscripcion(props, ref) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [errNombre, setErrNombre] = useState(false);
  const [errApellido, setErrApellido] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [errWhatsapp, setErrWhatsapp] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [yaRegistrado, setYaRegistrado] = useState(false);

  async function handleSubmit() {
    setErrNombre(false);
    setErrApellido(false);
    setErrEmail(false);
    setYaRegistrado(false);
    setErrWhatsapp(false);
    let ok = true;
    if (!validarTexto(nombre)) { setErrNombre(true); ok = false; }
    if (!validarTexto(apellido)) { setErrApellido(true); ok = false; }
    if (!validarEmail(email)) { setErrEmail(true); ok = false; }
    if (!whatsapp.trim() || !validarWhatsapp(whatsapp)) { setErrWhatsapp(true); ok = false; }
    if (!ok) return;

    setEnviando(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), apellido: apellido.trim(), email, whatsapp: whatsapp.trim() }),
      });
      if (res.status === 409) {
        // Email ya registrado — igual seguimos al pago
        setYaRegistrado(true);
        await new Promise(r => setTimeout(r, 1800));
      }
    } catch (e) { console.log(e); }
    router.push('/gracias');
  }

  const inputStyle = (err) => ({
    width: '100%', padding: '12px 16px', borderRadius: '8px',
    border: `1.5px solid ${err ? '#e74c3c' : 'var(--lila-md)'}`,
    fontSize: '15px', outline: 'none', fontFamily: "'Lato', sans-serif",
    background: '#fff', color: '#111', boxSizing: 'border-box',
  });

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
            Entrenamiento ✦ Junio 2026
          </span>

          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
            Reservá tu lugar
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>
            Completá tus datos y a continuación vas a poder abonar tu inscripción.
          </p>

          {/* Nombre */}
          <div style={{ marginBottom: '14px' }}>
            <input type="text" placeholder="Nombre" autoComplete="given-name"
              value={nombre} onChange={e => setNombre(e.target.value)}
              onBlur={() => { if (nombre.trim()) setErrNombre(!validarTexto(nombre)); }}
              style={inputStyle(errNombre)}
            />
            {errNombre && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>Ingresá tu nombre</span>}
          </div>

          {/* Apellido */}
          <div style={{ marginBottom: '14px' }}>
            <input type="text" placeholder="Apellido" autoComplete="family-name"
              value={apellido} onChange={e => setApellido(e.target.value)}
              onBlur={() => { if (apellido.trim()) setErrApellido(!validarTexto(apellido)); }}
              style={inputStyle(errApellido)}
            />
            {errApellido && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>Ingresá tu apellido</span>}
          </div>

          {/* Email */}
          <div style={{ marginBottom: '14px' }}>
            <input type="email" placeholder="Email" autoComplete="email"
              value={email} onChange={e => setEmail(e.target.value)}
              onBlur={() => { if (email.trim()) setErrEmail(!validarEmail(email)); }}
              style={inputStyle(errEmail)}
            />
            {errEmail && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>Ingresá un email válido</span>}
          </div>

          {/* WhatsApp */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: '#888', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>WhatsApp</span>
              <span style={{ color: '#e74c3c', fontSize: '11px' }}>requerido</span>
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '15px', color: '#888', fontFamily: "'Lato', sans-serif",
                pointerEvents: 'none', userSelect: 'none',
              }}>🇦🇷 +54</span>
              <input
                type="tel"
                placeholder="11 1234-5678"
                autoComplete="tel"
                inputMode="numeric"
                value={whatsapp}
                onChange={e => setWhatsapp(formatWhatsapp(e.target.value))}
                onBlur={() => { if (whatsapp.trim()) setErrWhatsapp(!validarWhatsapp(whatsapp)); }}
                style={{
                  ...inputStyle(errWhatsapp),
                  paddingLeft: '80px',
                }}
              />
            </div>
            {errWhatsapp && <span style={{ fontSize: '12px', color: '#e74c3c', marginTop: '4px', display: 'block' }}>Ingresá un número válido</span>}
          </div>

          {yaRegistrado && (
            <div style={{
              background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px',
              padding: '10px 16px', marginBottom: '14px', fontSize: '13px', color: '#166534',
              fontWeight: 600, textAlign: 'center',
            }}>
              ✅ Ya estás registrada/o — te llevamos al pago ahora
            </div>
          )}

          <button
            onClick={handleSubmit} disabled={enviando}
            style={{
              width: '100%', padding: '15px', background: 'var(--amarillo)', color: '#111',
              border: 'none', borderRadius: '8px', fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800, fontSize: '15px', cursor: enviando ? 'not-allowed' : 'pointer',
              opacity: enviando ? 0.7 : 1,
            }}
          >
            {enviando ? 'Un momento...' : '→ Quiero inscribirme'}
          </button>

          <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginTop: '14px' }}>
            🔒 Tus datos están seguros · El pago es en el siguiente paso
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
