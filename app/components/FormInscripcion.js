'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IcoCandado } from './Iconos';

function validarEmail(e) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(e.trim());
}
function validarTexto(n) { return n.trim().length >= 2; }
function validarWhatsapp(n) {
  const digits = n.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}
function formatWhatsapp(val) {
  return val.replace(/[^\d\s+\-()]/g, '');
}

export default function FormInscripcion({ valor }) {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errNombre, setErrNombre] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errWhatsapp, setErrWhatsapp] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [yaRegistrado, setYaRegistrado] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setYaRegistrado(false);
    const eN = !validarTexto(nombre);
    const eE = !validarEmail(email);
    const eW = !validarWhatsapp(whatsapp);
    setErrNombre(eN); setErrEmail(eE); setErrWhatsapp(eW);
    if (eN || eE || eW) return;

    setEnviando(true);
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'InitiateCheckout', { value: valor, currency: 'ARS', content_name: 'Entrenamiento Neuroventa Digital + IA' });
      }
    } catch {}
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), whatsapp: whatsapp.trim() }),
      });
      if (res.status === 409) {
        // Email ya registrado: igual seguimos al pago
        setYaRegistrado(true);
        await new Promise((r) => setTimeout(r, 1800));
      }
    } catch (err) { console.log(err); }
    router.push('/gracias');
  }

  return (
    <form id="formulario" className="form-insc" onSubmit={handleSubmit} noValidate>
      <label className="campo">
        <span>Nombre</span>
        <input type="text" autoComplete="given-name" value={nombre}
          onChange={(e) => { setNombre(e.target.value); if (errNombre && validarTexto(e.target.value)) setErrNombre(false); }}
          onBlur={() => { if (nombre.trim() && !validarTexto(nombre)) setErrNombre(true); }}
          className={errNombre ? 'error' : ''} />
        {errNombre && <small>Ingresá tu nombre</small>}
      </label>

      <label className="campo">
        <span>Email</span>
        <input type="email" autoComplete="email" inputMode="email" value={email}
          onChange={(e) => { setEmail(e.target.value); if (errEmail && validarEmail(e.target.value)) setErrEmail(false); }}
          onBlur={() => { if (email.trim() && !validarEmail(email)) setErrEmail(true); }}
          className={errEmail ? 'error' : ''} />
        {errEmail && <small>Ingresá un email válido</small>}
      </label>

      <label className="campo">
        <span>WhatsApp</span>
        <div className={`tel${errWhatsapp ? ' error' : ''}`}>
          <em>AR +54</em>
          <input type="tel" placeholder="11 1234-5678" autoComplete="tel" inputMode="tel" value={whatsapp}
            onChange={(e) => { const v = formatWhatsapp(e.target.value); setWhatsapp(v); if (errWhatsapp && validarWhatsapp(v)) setErrWhatsapp(false); }}
            onBlur={() => { if (whatsapp.trim() && !validarWhatsapp(whatsapp)) setErrWhatsapp(true); }} />
        </div>
        {errWhatsapp && <small>Ingresá un número válido</small>}
      </label>

      {yaRegistrado && <div className="aviso-ok">Ya tenemos tus datos. Te llevamos al pago.</div>}

      <button type="submit" className="btn lg full" disabled={enviando}>
        {enviando ? 'Un momento…' : 'Quiero inscribirme'}
      </button>
      <p className="micro"><IcoCandado width={14} height={14} /> Completás tus datos y pagás en el siguiente paso. Tus datos están seguros.</p>
    </form>
  );
}
