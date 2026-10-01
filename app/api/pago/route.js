import { enPromo, LINKS_PAGO } from '../../config/entrenamiento';

// Redirige al link de Mercado Pago que corresponde al período vigente.
// La fecha se decide en el servidor, así el precio no depende del reloj del celular.
// $45.500 hasta el 28/10 23:59 ARG; $65.000 desde el 29/10 00:00 ARG.
// MP_LINK_PROMO / MP_LINK_COMPLETO (opcionales) reemplazan los links de config.
export const dynamic = 'force-dynamic';

export function GET() {
  const link = enPromo()
    ? process.env.MP_LINK_PROMO || LINKS_PAGO.promo
    : process.env.MP_LINK_COMPLETO || LINKS_PAGO.completo;
  return Response.redirect(link, 302);
}
