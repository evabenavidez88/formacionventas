export default function Cierre({ onCTA }) {
  return (
    <section style={{ background: 'var(--lila)', padding: '80px 6%', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: "'Montserrat', sans-serif", color: '#fff',
        fontSize: '28px', fontWeight: 800, lineHeight: 1.35,
        maxWidth: '580px', margin: '0 auto 14px',
      }}>
        Si sabés lo que hacés, pero no sabés cómo venderlo… esto es lo que te falta.
      </h2>
      <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '15px', marginBottom: '32px' }}>
        3 encuentros en vivo para transformar cómo vendés.
      </p>
      <button className="btn-y-lg" onClick={onCTA}>Quiero inscribirme</button>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '22px', flexWrap: 'wrap' }}>
        {[
          { href: 'https://www.instagram.com/eva.benavidez/', label: 'Instagram' },
          { href: 'https://www.linkedin.com/in/evabenavidez/', label: 'LinkedIn' },
          { href: 'https://wa.me/message/X2BA2P356X5DG1', label: 'WhatsApp' },
        ].map(({ href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,.7)', fontSize: '12px',
            border: '1px solid rgba(255,255,255,.3)', padding: '8px 18px',
            borderRadius: '30px', fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
          }}>
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
