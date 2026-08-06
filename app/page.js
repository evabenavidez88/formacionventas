'use client';
import { useEffect } from 'react';
import FormInscripcion from './components/FormInscripcion';
import { BEFORE_FORM_HTML, AFTER_FORM_HTML } from './homeContent';

export default function Home() {
  useEffect(() => {
    const deadline = new Date('2026-08-24T23:59:59');
    const now = new Date();
    const diff = deadline - now;
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    const el = document.getElementById('countdown-days');
    if (el) el.textContent = days;
    const box = document.getElementById('countdown-box');
    if (box && days === 0) box.innerHTML = '⚠️ ¡Último día de promo!';
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: BEFORE_FORM_HTML }} />
      <FormInscripcion />
      <div dangerouslySetInnerHTML={{ __html: AFTER_FORM_HTML }} />
    </>
  );
}
