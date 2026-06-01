import { Resend } from 'resend';
import { Pool } from 'pg';

// Cutoff oferta 30% OFF: 4 de junio 23:59 ART = 5 de junio 02:59 UTC
const CUTOFF = new Date('2026-06-05T03:00:00Z');
const LINK_30OFF = 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=223667094-b3365f78-809e-4718-bf33-7eaef3f6bd1d';
const LINK_FULL  = 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=223667094-0ba1ef8d-8a67-40df-ba12-e25175a55977';

function getLinkPago() {
  return Date.now() < CUTOFF.getTime() ? LINK_30OFF : LINK_FULL;
}

let pool = null;
function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('railway.internal')
        ? false
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

let resend = null;
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

function buildAbandonedHtml(nombre) {
  const linkPago = getLinkPago();
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Tu lugar en Neuroventas todav&iacute;a est&aacute; disponible · Eva Benavidez</title>
</head>
<body style="margin:0;padding:0;background:#e8f7f6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#e8f7f6;padding:32px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.07);">
        <!-- HEADER TURQUESA -->
        <tr>
          <td style="background:#57BDB6;padding:36px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Entrenamiento &middot; Online en vivo</p>
            <h1 style="margin:10px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:26px;font-weight:800;color:#ffffff;line-height:1.3;">Neuroventa Digital</h1>
            <p style="margin:8px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.82);">3 d&iacute;as para hackear tu mente y vender diferente</p>
          </td>
        </tr>
        <!-- BADGE URGENCIA AMARILLO -->
        <tr>
          <td style="background:#F3D519;padding:14px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:800;color:#111111;letter-spacing:1px;text-transform:uppercase;">&#9888;&nbsp; Tu lugar todav&iacute;a est&aacute; disponible &mdash; los cupos son limitados</p>
          </td>
        </tr>
        <!-- CUERPO -->
        <tr>
          <td style="padding:44px 48px 32px;">
            <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#555555;">Hola <strong style="color:#111;">${nombre}</strong>,</p>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">Hace un rato estuviste a punto de sumarte al <strong>Entrenamiento en Neuroventa Digital</strong>.</p>
            <p style="margin:0 0 24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">Algo te fren&oacute;. Pasa.<br>Pero tu lugar <strong>todav&iacute;a est&aacute; disponible.</strong></p>
            <!-- BLOQUE REFLEXIÓN -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#e8f7f6;border-radius:8px;border-left:4px solid #57BDB6;margin:0 0 28px;">
              <tr>
                <td style="padding:20px 24px;">
                  <p style="margin:0 0 10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#333333;line-height:1.7;">Pens&aacute; en la &uacute;ltima vez que perdiste una venta.</p>
                  <p style="margin:0 0 10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#333333;line-height:1.7;">No porque tu producto fuera malo.<br>No porque el precio fuera alto.</p>
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#111111;font-weight:700;line-height:1.7;">Sino porque no sab&iacute;as exactamente qu&eacute; decir &mdash; o c&oacute;mo decirlo.</p>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">Eso tiene soluci&oacute;n. Y se llama <strong>m&eacute;todo.</strong></p>
            <p style="margin:0 0 14px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:800;color:#111111;">En estos 3 d&iacute;as vas a aprender a:</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
              <tr><td style="padding:7px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.5;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Guiar conversaciones que hoy se enfrían o se pierden</td></tr>
              <tr><td style="padding:7px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.5;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Comunicar valor sin justificar el precio</td></tr>
              <tr><td style="padding:7px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.5;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Responder objeciones sin ponerte a la defensiva</td></tr>
              <tr><td style="padding:7px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;line-height:1.5;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Cerrar con claridad &mdash; sin presionar, sin improvisar</td></tr>
            </table>
            <p style="margin:0 0 28px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#888888;font-style:italic;text-align:center;">No es teor&iacute;a. Es entrenamiento real aplicado a tu negocio.</p>
            <!-- FECHAS -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f5f3;border-radius:8px;border-left:4px solid #57BDB6;margin:0 0 28px;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#111111;">&#128197;&nbsp;<strong>Mi&eacute;rcoles 17 &middot; Jueves 18 &middot; Viernes 19 de Junio</strong></p>
                  <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#111111;">&#9200;&nbsp;<strong>19:00 a 21:00 hs</strong> &middot; Online en vivo</p>
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#111111;">&#128101;&nbsp;Cupos limitados &middot; Inscripciones hasta el <strong>martes 16 de junio</strong></p>
                </td>
              </tr>
            </table>
            <!-- BLOQUE PRECIO -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#57BDB6;border-radius:10px;margin:0 0 28px;">
              <tr>
                <td style="padding:28px 32px;text-align:center;">
                  <p style="margin:0 0 4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Inversi&oacute;n con 30% OFF</p>
                  <p style="margin:0 0 4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;color:rgba(255,255,255,0.45);text-decoration:line-through;">$65.000</p>
                  <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:48px;font-weight:800;color:#F3D519;line-height:1;">$45.500</p>
                  <p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.8);">3 cuotas sin inter&eacute;s de $15.167</p>
                  <a href="${linkPago}" target="_blank" style="display:inline-block;background:#F3D519;color:#111111;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:800;font-size:14px;text-decoration:none;padding:16px 40px;border-radius:6px;letter-spacing:0.5px;">
                    &#128073;&nbsp; QUIERO INSCRIBIRME CON EL 30% OFF
                  </a>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #eeebe8;margin:28px 0;">
            <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#111111;">&#128172; &iquest;Ten&eacute;s una duda antes de decidir?</p>
            <p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#666666;line-height:1.7;">Escribile directamente a Eva &mdash; te responde ella.</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <a href="https://wa.me/message/X2BA2P356X5DG1" target="_blank" style="display:inline-block;background:#ffffff;color:#57BDB6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:13px;text-decoration:none;padding:14px 36px;border-radius:6px;border:2px solid #57BDB6;">
                    &#128172;&nbsp; HABL&Aacute; CON EVA
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- FRASE CIERRE -->
        <tr>
          <td style="background:#e8f7f6;padding:28px 48px;text-align:center;border-top:1px solid #c8e8e6;">
            <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#3a9993;font-style:italic;">&ldquo;El precio de hoy no va a ser el precio de ma&ntilde;ana.&rdquo;</p>
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#88bdb9;">Eva Benavidez</p>
          </td>
        </tr>
        <!-- FIRMA -->
        <tr>
          <td style="padding:28px 48px 36px;text-align:center;">
            <p style="margin:0 0 4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:800;color:#111111;">Eva Benavidez</p>
            <p style="margin:0 0 12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#888888;">Neurocoach &middot; Consultora &middot; Formadora</p>
            <a href="https://evabenavidez.com" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#57BDB6;text-decoration:none;">evabenavidez.com</a>
          </td>
        </tr>
        <!-- FOOTER -->
        <tr>
          <td style="background:#111111;padding:18px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#666666;">&copy; 2026 Eva Benavidez &middot; evabenavidez.com &middot; C&oacute;rdoba, Argentina</p>
            <p style="margin:6px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#555555;">Recibiste este mail porque visitaste la p&aacute;gina del Entrenamiento en Neuroventa Digital.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export async function GET(request) {
  // Verificar clave secreta para proteger el endpoint
  const secret = request.nextUrl?.searchParams?.get('secret') ||
    new URL(request.url).searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET) {
    return Response.json({ error: 'No autorizado' }, { status: 401 });
  }

  const db = getPool();
  const resendClient = getResend();
  const now = new Date();
  const results = { r1: [], r2: [], errors: [] };

  try {
    // --- RECORDATORIO 1: entre 2 y 24 horas después del registro ---
    const r1 = await db.query(`
      SELECT * FROM leads_formacion
      WHERE pagado = false
        AND recordatorio_1 = false
        AND fecha <= NOW() - INTERVAL '2 hours'
        AND fecha > NOW() - INTERVAL '24 hours'
    `);

    for (const lead of r1.rows) {
      try {
        await resendClient.emails.send({
          from: 'Eva Benavidez <info@evabenavidez.com>',
          to: lead.email,
          subject: `${lead.nombre}, tu lugar en Neuroventas todavía está disponible`,
          html: buildAbandonedHtml(lead.nombre),
        });
        await db.query(
          'UPDATE leads_formacion SET recordatorio_1 = true WHERE id = $1',
          [lead.id]
        );
        results.r1.push(lead.email);
      } catch (e) {
        results.errors.push({ email: lead.email, r: 1, error: e.message });
      }
    }

    // --- RECORDATORIO 2: 12+ horas después del registro ---
    const r2 = await db.query(`
      SELECT * FROM leads_formacion
      WHERE pagado = false
        AND recordatorio_2 = false
        AND fecha <= NOW() - INTERVAL '12 hours'
    `);

    for (const lead of r2.rows) {
      try {
        await resendClient.emails.send({
          from: 'Eva Benavidez <info@evabenavidez.com>',
          to: lead.email,
          subject: `Último aviso — los cupos se están agotando, ${lead.nombre}`,
          html: buildAbandonedHtml(lead.nombre),
        });
        await db.query(
          'UPDATE leads_formacion SET recordatorio_2 = true WHERE id = $1',
          [lead.id]
        );
        results.r2.push(lead.email);
      } catch (e) {
        results.errors.push({ email: lead.email, r: 2, error: e.message });
      }
    }

    console.log('Cron abandoned:', results);
    return Response.json({ ok: true, ...results });

  } catch (e) {
    console.error('Cron error:', e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
