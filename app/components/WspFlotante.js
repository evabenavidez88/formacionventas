'use client';
import { useEffect, useState } from 'react';
import { IcoWhatsapp } from './Iconos';

// Aparece recién después de la primera pantalla, para no taparse con "Tengo una duda".
export default function WspFlotante({ href }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const ver = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    ver();
    window.addEventListener('scroll', ver, { passive: true });
    return () => window.removeEventListener('scroll', ver);
  }, []);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`wsp-float${visible ? ' visible' : ''}`} aria-hidden={!visible} tabIndex={visible ? 0 : -1}>
      <IcoWhatsapp /> WhatsApp
    </a>
  );
}
