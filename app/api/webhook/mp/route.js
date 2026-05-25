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

async function sendConfirmationEmail(to, nombre) {
  return getResend().emails.send({
    from: 'Eva Benavidez <info@evabenavidez.com>',
    to,
    subject: '✅ Tu lugar está confirmado — Entrenamiento Neuroventa Digital',
    template: {
      id: 'neuroventa-digital-confirmation',
      variables: { nombre },
    },
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
