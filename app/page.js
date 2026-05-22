'use client';
import { useRef } from 'react';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Identificacion from './components/Identificacion';
import Transformacion from './components/Transformacion';
import Proceso from './components/Proceso';
import Contenido from './components/Contenido';
import SobreEva from './components/SobreEva';
import Testimonios from './components/Testimonios';
import Precio from './components/Precio';
import FormInscripcion from './components/FormInscripcion';
import Cierre from './components/Cierre';
import Footer from './components/Footer';

export default function Home() {
  const formRef = useRef(null);
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Topbar />
      <Navbar onCTA={scrollToForm} />
      <Hero onCTA={scrollToForm} />
      <Identificacion />
      <Transformacion />
      <Proceso onCTA={scrollToForm} />
      <Contenido />
      <SobreEva onCTA={scrollToForm} />
      <Testimonios />
      <Precio onCTA={scrollToForm} />
      <FormInscripcion ref={formRef} />
      <Cierre onCTA={scrollToForm} />
      <Footer />

      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/message/X2BA2P356X5DG1"
        target="_blank"
        rel="noopener noreferrer"
        className="wpp-float"
      >
        💬 WhatsApp
      </a>
    </>
  );
}
