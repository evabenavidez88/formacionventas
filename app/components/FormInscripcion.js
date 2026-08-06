'use client';
import { useState } from 'react';
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

const ERROR_COLOR = '#C0374A';

export default function FormInscripcion() {
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
    padding: '14px 16px',
    border: `1px solid ${err ? ERROR_COLOR : 'var(--border)'}`,
    borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit',
    outline: 'none', width: '100%', boxSizing: 'border-box',
  });

  return (
    <section id="formulario" style={{ background: 'var(--white)' }}>
      <div className="wrap" style={{ maxWidth: '560px' }}>
        <div style={{ textAlign: 'center' }}>
          <span className="kicker">Entrenamiento ✦ Septiembre 2026</span>
        </div>
        <h2>Reservá tu lugar</h2>
        <p className="subhead">Completá tus datos y a continuación vas a poder abonar tu inscripción.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <input type="text" placeholder="Nombre" autoComplete="given-name"
          value={nombre} onChange={e => setNombre(e.target.value)}
          onBlur={() => { if (nombre.trim()) setErrNombre(!validarTexto(nombre)); }}
          style={inputStyle(errNombre)}
        />
        {errNombre && <span style={{ fontSize: '12px', color: ERROR_COLOR, marginTop: '4px', display: 'block' }}>Ingresá tu nombre</span>}
      </div>

      <div>
        <input type="text" placeholder="Apellido" autoComplete="family-name"
          value={apellido} onChange={e => setApellido(e.target.value)}
          onBlur={() => { if (apellido.trim()) setErrApellido(!validarTexto(apellido)); }}
          style={inputStyle(errApellido)}
        />
        {errApellido && <span style={{ fontSize: '12px', color: ERROR_COLOR, marginTop: '4px', display: 'block' }}>Ingresá tu apellido</span>}
      </div>

      <div>
        <input type="email" placeholder="Email" autoComplete="email"
          value={email} onChange={e => setEmail(e.target.value)}
          onBlur={() => { if (email.trim()) setErrEmail(!validarEmail(email)); }}
          style={inputStyle(errEmail)}
        />
        {errEmail && <span style={{ fontSize: '12px', color: ERROR_COLOR, marginTop: '4px', display: 'block' }}>Ingresá un email válido</span>}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--gray)', marginBottom: '6px' }}>
          <span>WhatsApp</span><span style={{ color: ERROR_COLOR }}>requerido</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '10px', padding: '14px 16px',
          border: `1px solid ${errWhatsapp ? ERROR_COLOR : 'var(--border)'}`,
        }}>
          <span style={{ color: 'var(--gray)', fontSize: '14px' }}>AR +54</span>
          <input
            type="tel"
            placeholder="11 1234-5678"
            autoComplete="tel"
            inputMode="numeric"
            value={whatsapp}
            onChange={e => setWhatsapp(formatWhatsapp(e.target.value))}
            onBlur={() => { if (whatsapp.trim()) setErrWhatsapp(!validarWhatsapp(whatsapp)); }}
            style={{ border: 'none', outline: 'none', fontSize: '15px', fontFamily: 'inherit', flex: 1 }}
          />
        </div>
        {errWhatsapp && <span style={{ fontSize: '12px', color: ERROR_COLOR, marginTop: '4px', display: 'block' }}>Ingresá un número válido</span>}
      </div>

      {yaRegistrado && (
        <div style={{
          background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '8px',
          padding: '10px 16px', fontSize: '13px', color: '#166534',
          fontWeight: 600, textAlign: 'center',
        }}>
          ✅ Ya estás registrada/o — te llevamos al pago ahora
        </div>
      )}

      <button
        className="btn lg"
        onClick={handleSubmit} disabled={enviando}
        style={{
          width: '100%', marginTop: '6px', border: 'none',
          cursor: enviando ? 'not-allowed' : 'pointer',
          opacity: enviando ? 0.7 : 1,
        }}
      >
        {enviando ? 'Un momento...' : 'Quiero inscribirme'}
      </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--gray-light)' }}>
          🔒 Tus datos están seguros. El pago es en el siguiente paso.
        </p>
        </div>
      </div>
    </section>
  );
}
