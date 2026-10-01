import { enPromo, LINKS } from '../../config/entrenamiento';

// Redirige al link de Mercado Pago que corresponde al período vigente.
// La fecha se decide en el servidor, así el precio no depende del reloj del celular.
// Links (variables de entorno en Railway):
//   MP_LINK_PROMO    → link que cobra $45.500 (hasta el 28/10 23:59 ARG)
//   MP_LINK_COMPLETO → link que cobra $65.000 (desde el 29/10 00:00 ARG)
export const dynamic = 'force-dynamic';

export function GET() {
  const promo = enPromo();
  const link = promo ? process.env.MP_LINK_PROMO : process.env.MP_LINK_COMPLETO;
  if (!link) {
    console.error(`pago: falta ${promo ? 'MP_LINK_PROMO' : 'MP_LINK_COMPLETO'}; se deriva a WhatsApp`);
    return Response.redirect(LINKS.whatsapp, 302);
  }
  return Response.redirect(link, 302);
}
