'use client';
import { useState } from 'react';
import { IcoPlay } from './Iconos';

// Muestra solo una miniatura liviana; el reproductor de YouTube se carga al tocarla.
export default function VideoLiviano({ id, titulo }) {
  const [activo, setActivo] = useState(false);
  if (activo) {
    return (
      <div className="video-lite">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`}
          title={titulo}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }
  return (
    <button type="button" className="video-lite" onClick={() => setActivo(true)} aria-label={`Reproducir: ${titulo}`}>
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
      <span className="video-play"><IcoPlay /></span>
    </button>
  );
}
