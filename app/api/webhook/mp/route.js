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
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tu lugar está confirmado</title>
</head>
<body style="margin:0;padding:0;background:#f8f8f6;font-family:'Lato',Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">
    <div style="height:6px;background:linear-gradient(90deg,#7c4dff,#4dd0e1);"></div>
    <div style="padding:40px 40px 32px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:48px;margin-bottom:8px;">🎉</div>
        <h1 style="margin:0;font-size:24px;font-weight:800;color:#0a0a0a;font-family:'Montserrat',Arial,sans-serif;">
          ¡Tu lugar está confirmado, ${nombre}!
        </h1>
      </div>

      <p style="color:#444;font-size:16px;line-height:1.7;margin:0 0 20px;">
        Tu pago fue procesado exitosamente. Ya sos parte del
        <strong>Entrenamiento en Neuroventa Digital</strong> — nos vemos el <strong>miércoles 18 de junio</strong>.
      </p>

      <div style="background:#f3f0ff;border-left:4px solid #7c4dff;border-radius:8px;padding:16px 20px;margin:0 0 24px;">
        <p style="margin:0;font-size:14px;color:#444;"><strong>📅 Encuentros en vivo:</strong> 3 encuentros — 6 horas de entrenamiento</p>
        <p style="margin:8px 0 0;font-size:14px;color:#444;"><strong>📹 Grabaciones:</strong> Acceso a los encuentros grabados</p>
        <p style="margin:8px 0 0;font-size:14px;color:#444;"><strong>🛠 Material:</strong> Herramientas y recursos incluidos</p>
      </div>

      <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 8px;">
        En las próximas horas vas a recibir un mensaje por WhatsApp con el link de acceso y todos los detalles del entrenamiento.
      </p>

      <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 32px;">
        Si tenés alguna pregunta, respondé este mail y con gusto te ayudamos. ✨
      </p>

      <div style="text-align:center;">
        <p style="margin:0;font-size:14px;color:#888;">Con cariño,</p>
        <p style="margin:4px 0 0;font-size:16px;font-weight:700;color:#7c4dff;font-family:'Montserrat',Arial,sans-serif;">Eva Benavidez</p>
      </div>
    </div>
    <div style="background:#f8f8f6;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
      <p style="margin:0;font-size:12px;color:#aaa;">
        🔒 Este es un mail transaccional enviado por <a href="https://evabenavidez.com" style="color:#7c4dff;text-decoration:none;">evabenavidez.com</a>
      </p>
    </div>
  </div>
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
