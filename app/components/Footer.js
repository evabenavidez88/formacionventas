export default function Footer() {
  return (
    <footer style={{
      background: '#111', padding: '24px 6%',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
    }}>
      <span style={{ color: '#555', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }}>
        © 2025 Eva Benavidez · evabenavidez.com
      </span>
      <a href="https://wa.me/message/X2BA2P356X5DG1" target="_blank" rel="noopener noreferrer"
        style={{ color: '#555', fontSize: '12px', fontFamily: "'Montserrat', sans-serif" }}>
        WhatsApp →
      </a>
    </footer>
  );
}
