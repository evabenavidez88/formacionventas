// Configuración central del Entrenamiento Neuroventa Digital + IA.
// Todo lo que cambia con el tiempo (precio, fechas, links) se edita acá.

export const NOMBRE_PROGRAMA = 'Entrenamiento Neuroventa Digital + IA';
export const SITIO = 'https://neuroformacion.evabenavidez.com';

// Fechas de la nueva cohorte. Mientras sea null, la landing muestra [EVA ACTUALIZA]
// y los mails no muestran fechas. Ejemplo: 'Martes 3, miércoles 4 y jueves 5 de noviembre'
export const FECHAS = null;
export const FECHAS_TEXTO = FECHAS || '[EVA ACTUALIZA]';
export const HORARIO = '19:00 a 21:00 hs (ARG)';

// Fin de la promo: 28/10/2026 23:59:59 ARG (UTC-3) → desde 29/10/2026 00:00 ARG precio completo.
export const FIN_PROMO = new Date('2026-10-29T03:00:00Z');

export const PRECIOS = {
  promo: { total: 45500, cuota: 15167, anterior: 65000 },
  completo: { total: 65000, cuota: 21667 },
};

export const LINKS = {
  whatsapp: 'https://wa.link/8fvvoo',
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
