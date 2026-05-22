export default function Topbar() {
  return (
    <div style={{
      background: 'var(--lila)', color: '#fff', textAlign: 'center',
      fontSize: '11px', letterSpacing: '2px', fontWeight: 700,
      padding: '10px', textTransform: 'uppercase',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      Oferta hasta el <span style={{ color: 'var(--amarillo)' }}>4 de junio</span> — 30% OFF · Cupos limitados
    </div>
  );
}
