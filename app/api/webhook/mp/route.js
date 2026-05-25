import { Resend } from 'resend';
import { Pool } from 'pg';

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

async function getPayment(paymentId) {
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
  });
  if (!res.ok) throw new Error(`MP API error: ${res.status}`);
  return res.json();
}

async function getLeadByEmail(email) {
  const db = getPool();
  const result = await db.query(
    'SELECT * FROM leads_formacion WHERE email = $1',
    [email.toLowerCase()]
  );
  return result.rows[0] || null;
}

function buildEmailHtml(nombre) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Bienvenida al Entrenamiento · Eva Benavidez</title>
</head>
<body style="margin:0;padding:0;background:#f2ede9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2ede9;padding:32px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.07);">
        <!-- HEADER LILA -->
        <tr>
          <td style="background:#865273;padding:36px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);">Entrenamiento &middot; Online en vivo</p>
            <h1 style="margin:10px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:26px;font-weight:800;color:#ffffff;line-height:1.3;">Neuroventa Digital</h1>
            <p style="margin:8px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.75);">3 d&iacute;as para hackear tu mente y vender diferente</p>
          </td>
        </tr>
        <!-- BADGE CONFIRMADO -->
        <tr>
          <td style="background:#F3D519;padding:14px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:800;color:#111111;letter-spacing:1px;text-transform:uppercase;">&#10003;&nbsp; Tu lugar est&aacute; confirmado</p>
          </td>
        </tr>
        <!-- CUERPO PRINCIPAL -->
        <tr>
          <td style="padding:44px 48px 32px;">
            <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#555555;">Hola <strong style="color:#111;">${nombre}</strong>,</p>
            <h2 style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;color:#111111;line-height:1.3;">&#10024; &iexcl;Felicitaciones por sumarte a este entrenamiento!</h2>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">Tu pago fue recibido y tu lugar est&aacute; confirmado. Tomaste una decisi&oacute;n potente &mdash; en estos 3 d&iacute;as vas a trabajar con un m&eacute;todo claro para dejar de improvisar, guiar conversaciones y cerrar con seguridad.</p>
            <!-- FECHAS -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f5f3;border-radius:8px;border-left:4px solid #865273;margin:24px 0;">
              <tr>
                <td style="padding:18px 20px;">
                  <p style="margin:0 0 8px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#865273;">Tus fechas</p>
                  <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#111111;">&#128197;&nbsp; <strong>Mi&eacute;rcoles 17 &middot; Jueves 18 &middot; Viernes 19 de Junio</strong></p>
                  <p style="margin:0 0 6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#111111;">&#9200;&nbsp; <strong>19:00 a 21:00 hs</strong> &mdash; 2 horas por encuentro</p>
                  <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#111111;">&#128187;&nbsp; <strong>100% Online en vivo</strong></p>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #eeebe8;margin:28px 0;">
            <h3 style="margin:0 0 12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:17px;font-weight:800;color:#111111;">&#128073; &iquest;Qu&eacute; sigue ahora?</h3>
            <p style="margin:0 0 16px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">Solo te queda <strong>un paso antes del inicio</strong>: sum&aacute;rte al grupo oficial del entrenamiento. Ese es el canal donde vamos a estar en contacto.</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Recordatorio <strong>48 horas antes</strong> del primer encuentro</td></tr>
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Link de acceso a cada sesi&oacute;n en vivo</td></tr>
              <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#444444;"><span style="color:#57BDB6;font-weight:700;margin-right:8px;">&#10003;</span>Toda la informaci&oacute;n que necesit&aacute;s antes de arrancar</td></tr>
            </table>
            <p style="margin:0 0 24px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#888888;font-style:italic;">A partir de ahora nos comunicamos <strong style="color:#111;">solo por ese medio.</strong></p>
            <!-- BOTÓN GRUPO WHATSAPP -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px;">
              <tr>
                <td align="center">
                  <a href="https://chat.whatsapp.com/BjEF4Y4el4R1KLhLT5XYmD?mode=gi_t" target="_blank" style="display:inline-block;background:#865273;color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:800;font-size:14px;text-decoration:none;padding:16px 40px;border-radius:6px;letter-spacing:0.5px;">
                    &#128172;&nbsp; UNIRME AL GRUPO DE ENTRENAMIENTO
                  </a>
                </td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #eeebe8;margin:32px 0 28px;">
            <h3 style="margin:0 0 10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:16px;font-weight:800;color:#111111;">&#128172; &iquest;Ten&eacute;s alguna duda antes de empezar?</h3>
            <p style="margin:0 0 20px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;color:#444444;line-height:1.75;">Escribile directamente a Eva y te responde ella.</p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center">
                  <a href="https://wa.me/message/X2BA2P356X5DG1" target="_blank" style="display:inline-block;background:#ffffff;color:#865273;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:700;font-size:13px;text-decoration:none;padding:14px 36px;border-radius:6px;letter-spacing:0.5px;border:2px solid #865273;">
                    &#128172;&nbsp; ESCRIBIRLE A EVA
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- FRASE CIERRE -->
        <tr>
          <td style="background:#f7f5f3;padding:28px 48px;text-align:center;border-top:1px solid #eeebe8;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#865273;font-style:italic;">&ldquo;El 90% de la venta es convicci&oacute;n y solo el 10% persuasi&oacute;n.&rdquo;</p>
            <p style="margin:8px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#aaa;">&mdash; Eva Benavidez</p>
          </td>
        </tr>
        <!-- FIRMA -->
        <tr>
          <td style="padding:28px 48px 36px;text-align:center;">
            <p style="margin:0 0 4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:15px;font-weight:800;color:#111111;">Eva Benavidez</p>
            <p style="margin:0 0 12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#888888;">Neurocoach &middot; Consultora &middot; Formadora</p>
            <a href="https://evabenavidez.com" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:12px;color:#865273;text-decoration:none;">evabenavidez.com</a>
          </td>
        </tr>
        <!-- FOOTER -->
        <tr>
          <td style="background:#111111;padding:18px 40px;text-align:center;">
            <p style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#666666;">&copy; 2026 Eva Benavidez &middot; evabenavidez.com &middot; C&oacute;rdoba, Argentina</p>
            <p style="margin:6px 0 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#555555;">Recibiste este mail porque te inscribiste al Entrenamiento en Neuroventa Digital.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

async function sendConfirmationEmail(to, nombre) {
  return getResend().emails.send({
    from: 'Eva Benavidez <info@evabenavidez.com>',
    to,
    subject: '✅ Tu lugar está confirmado — Entrenamiento Neuroventa Digital',
    html: buildEmailHtml(nombre),
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // MP envía notificaciones de distintos tipos — solo procesamos pagos
    if (body.type !== 'payment') {
      return Response.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return Response.json({ error: 'Sin payment ID' }, { status: 400 });
    }

    // Obtenemos el pago completo desde MP
    const payment = await getPayment(paymentId);

    // Solo procesamos pagos aprobados
    if (payment.status !== 'approved') {
      console.log(`Pago ${paymentId} no aprobado: ${payment.status}`);
      return Response.json({ ok: true, status: payment.status });
    }

    const payerEmail = payment.payer?.email;
    if (!payerEmail) {
      console.error('Sin email del pagador en el pago:', paymentId);
      return Response.json({ error: 'Sin email' }, { status: 400 });
    }

    // Buscamos el nombre en nuestra base por el email del pagador
    const lead = await getLeadByEmail(payerEmail);
    const nombre = lead?.nombre || payment.payer?.first_name || 'alumno/a';

    // Enviamos el mail de confirmación
    const emailResult = await sendConfirmationEmail(payerEmail, nombre);
    console.log(`Mail enviado a ${payerEmail}:`, emailResult);

    return Response.json({ ok: true, email: payerEmail });
  } catch (e) {
    console.error('Webhook error:', e);
    return Response.json({ error: e.message }, { status: 500 });
  }
}
