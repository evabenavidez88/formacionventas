// Configuración central del Entrenamiento Neuroventa Digital + IA.
// Todo lo que cambia con el tiempo (precio, fechas, links) se edita acá.

export const NOMBRE_PROGRAMA = 'Entrenamiento Neuroventa Digital + IA';
export const SITIO = 'https://neuroformacion.evabenavidez.com';

// Fechas de la cohorte. Si se deja en null, la landing muestra [EVA ACTUALIZA]
// y los mails no muestran fechas.
export const FECHAS = 'Martes 3, miércoles 4 y jueves 5 de noviembre';
export const FECHAS_TEXTO = FECHAS || '[EVA ACTUALIZA]';
export const HORARIO = '19:00 a 21:00 hs (ARG)';
// Clases de consulta en vivo (60 min) para co-crear el manual sobre casos reales.
export const CONSULTAS = 'Jueves 12 y 19 de noviembre';
export const CONSULTAS_HORARIO = '18:30 a 19:30 hs (ARG)';

// Links de pago de Mercado Pago. Usar SIEMPRE el link corto (mpago.la): cada visita genera
// una preferencia nueva. El link largo con pref_id vence a las pocas horas.
// Se pueden reemplazar sin tocar código con las variables MP_LINK_PROMO / MP_LINK_COMPLETO.
export const LINKS_PAGO = {
  promo: 'https://mpago.la/1Pwzpnz', // $62.300 · vence 6/11
  completo: 'https://mpago.la/2HwmF1U', // $89.000 · vence 6/11
};

// Fin de la promo: 28/10/2026 23:59:59 ARG (UTC-3) → desde 29/10/2026 00:00 ARG precio completo.
export const FIN_PROMO = new Date('2026-10-29T03:00:00Z');

export const PRECIOS = {
  promo: { total: 62300, cuota: 20767, anterior: 89000 },
  completo: { total: 89000, cuota: 29667 },
};

export const LINKS = {
  whatsapp: 'https://wa.me/543516098988?text=' + encodeURIComponent('Hola Eva, quiero sumarme a Neuroventa Digital.'),
  instagram: 'https://www.instagram.com/evabenavidez.negocios',
  linkedin: 'https://www.linkedin.com/in/benavidezevangelina/',
  sitio: 'https://evabenavidez.com',
};

// Hora actual. FECHA_SIMULADA (solo para pruebas locales, ej. 2026-10-29T03:00:00Z)
// permite verificar el cambio de precio sin esperar a la fecha real.
export function ahora() {
  const sim = process.env.FECHA_SIMULADA;
  return sim ? new Date(sim) : new Date();
}

export function enPromo(fecha = ahora()) {
  return fecha.getTime() < FIN_PROMO.getTime();
}

export function precioVigente(fecha = ahora()) {
  return enPromo(fecha) ? { promo: true, ...PRECIOS.promo } : { promo: false, ...PRECIOS.completo };
}

export function formatoPesos(n) {
  return '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
