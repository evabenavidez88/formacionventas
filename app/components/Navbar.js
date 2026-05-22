'use client';
import Image from 'next/image';

export default function Navbar({ onCTA }) {
  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid var(--gris2)',
      padding: '14px 6%', display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', position: 'sticky', top: 0, zIndex: 99,
    }}>
      <Image src="/images/logo.png" alt="Eva Benavidez" width={120} height={48} style={{ objectFit: 'contain' }} />
      <button className="btn-p" onClick={onCTA}>Me sumo →</button>
    </nav>
  );
}
