import FormInscripcion from './components/FormInscripcion';
import WspFlotante from './components/WspFlotante';
import { CuentaRegresiva, RefrescoPromo } from './components/Vigencia';
import {
  IcoCalendario, IcoReloj, IcoPantalla, IcoCheck, IcoX, IcoChevron, IcoEscudo, IcoTarjeta,
  IcoInstagram, IcoLinkedin, IcoWhatsapp,
} from './components/Iconos';
import { FECHAS_TEXTO, HORARIO, FIN_PROMO, LINKS, precioVigente, formatoPesos } from './config/entrenamiento';

// El precio se decide en cada visita según la fecha (no queda fijo en el build).
export const dynamic = 'force-dynamic';

const TE_PASA = [
  { img: 'nf2-3.png', t: <>Te dejan en visto y no sabés si escribir de nuevo o esperar, <strong>y ahí se pierde la venta.</strong></> },
  { img: 'nf2-4.png', t: <>Te preguntan el precio por WhatsApp o redes y <strong>terminás escribiendo un párrafo entero para justificarlo.</strong></> },
  { img: 'nf2-5.png', t: <>Tenés el Instagram lleno de consultas, pero <strong>no sabés cuáles convertir en clientes reales.</strong></> },
  { img: 'nf2-6.png', t: <>Sabés vender cara a cara, pero <strong>por chat no sabés cómo sostener la conversación.</strong></> },
  { img: 'icono-canales.png', t: <>Probaste usar ChatGPT, pero te devuelve respuestas genéricas y <strong>tus canales siguen sin un proceso.</strong></> },
];

const DIAS = [
  { dia: 'Día 1', eje: 'Orden', sub: 'Tu proceso de venta, paso a paso.', txt: 'Armás tu proceso para que cada conversación parta del mismo lugar y no de cero.', ia: 'la usás para mapear tu proceso e integrar WhatsApp, Instagram y tus otros canales en un mismo camino.' },
  { dia: 'Día 2', eje: 'Foco', sub: 'Lo que mueve la decisión de tu cliente.', txt: 'Entendés qué siente y qué necesita tu cliente para decidir, y dejás de justificar el precio para comunicar valor.', ia: 'la usás para trabajar tu propuesta de valor y tus mensajes con tu voz, pensando en tu cliente.' },
  { dia: 'Día 3', eje: 'Seguimiento', sub: 'Sostener la conversación hasta el cierre.', txt: 'Practicás cómo retomar una conversación que se enfrió, responder objeciones y cerrar con método, no con presión.', ia: 'la usás para organizar tus seguimientos y no soltar ninguna conversación.' },
];

const ANTES = [
  'Respondés lo mismo a cada consulta, sin importar de dónde llegó.',
  'Te escriben "cuánto sale" y mandás el precio solo, sin contexto.',
  'Una objeción por chat ("está caro") te deja sin saber qué contestar.',
  'Te dejan en visto y no sabés si insistir o esperar.',
  'Dejás pasar el momento de proponer el cierre.',
  'Usás la IA a la deriva: respuestas genéricas y cada canal por su lado.',
];
const DESPUES = [
  'Adaptás tu respuesta según si llegó por WhatsApp, Instagram o recomendación.',
  'Mandás el precio acompañado de valor, no como un dato suelto.',
  'Respondés objeciones con una pregunta que reabre la conversación.',
  'Tenés un mensaje concreto para retomar sin sonar insistente.',
  'Proponés el cierre en el momento justo, sin perder el hilo.',
  'Usás la IA con tu método: un proceso claro en todos tus canales, con tu voz.',
];

// Testimonios en video. Eva envía nombre, rubro y frase de cada uno;
// mientras estén vacíos, el video se muestra sin pie.
const TESTIMONIOS = [
  { id: 'w7AyXQlWGhs', nombre: null, rubro: null, frase: null },
];

const INCLUYE = [
  { img: 'nf2-8.png', t: '3 encuentros en vivo (6 horas), con grabaciones.' },
  { img: 'nf2-9.png', t: 'Ebook de trabajo con el paso a paso de cada eje.' },
  { img: 'nf2-10.png', t: 'Guiones, checklists y plantillas de respuesta para WhatsApp e Instagram.' },
  { img: 'nf2-11.png', t: '2 o 3 casos reales trabajados en vivo.' },
  { img: 'nf2-12.png', t: 'Kit de IA para Neuroventa: aplicá el método con herramientas de IA gratuitas.' },
];

const FAQ = [
  ['¿Necesito saber usar IA o ser bueno con la tecnología?', 'No. Lo primero es el método; la IA se suma después y la trabajamos desde lo básico.'],
  ['¿Qué herramientas de IA usamos? ¿Tienen costo?', 'Herramientas de IA gratuitas y las que ya uses. No tienen costo.'],
  ['¿Sirve para mi rubro?', 'Sí, si vendés por WhatsApp o redes, ya sea un servicio o un producto. Trabajás el método sobre tu propio negocio.'],
  ['¿Y si no puedo estar en vivo algún día?', 'Tenés acceso a las grabaciones de los tres encuentros.'],
  ['¿Cuánto tiempo necesito para aplicarlo?', 'Son 3 encuentros de 2 horas, y lo empezás a aplicar en tus conversaciones desde el primer día.'],
  ['¿Cómo es el pago?', 'Con link de pago en 3 cuotas sin interés o por transferencia. Completás tus datos y pagás en el siguiente paso.'],
  ['¿Tiene garantía?', 'Sí. Si dentro de los 15 días desde el primer encuentro sentís que no es para vos, te devolvemos el 80% de tu inversión.'],
];

function Boton() {
  return <a href="#inscripcion" className="btn lg">Quiero inscribirme</a>;
}

export default function Home() {
  const precio = precioVigente();
  const finMs = FIN_PROMO.getTime();

  return (
    <>
      <RefrescoPromo finMs={finMs} promo={precio.promo} />
      {precio.promo && <div className="promo-bar">Precio de lanzamiento con 30% OFF hasta el 28/10</div>}

      <header>
        <div className="marca">
          <img src="/images/nf2/nf2-1.png" alt="" width="38" height="34" />
          <div className="logo">Neuroventa Digital + IA</div>
        </div>
        <a href="#inscripcion" className="btn">Quiero inscribirme</a>
      </header>

      {/* 1 · HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="kicker">Entrenamiento · Neuroventa Digital + IA · Online en vivo</span>
            <h1>Te faltan ventas por no tener un método para WhatsApp y redes.</h1>
            <p className="lead">Aprendé mi método para ordenar tus conversaciones de venta y a usar la IA como aliada para diseñar tu proceso e integrar tus canales, sin perder lo humano.</p>
            <ul className="meta-list">
              <li><IcoCalendario /><span>{FECHAS_TEXTO}</span></li>
              <li><IcoReloj /><span>{HORARIO}</span></li>
              <li><IcoPantalla /><span>Online en vivo</span></li>
            </ul>
            <div className="hero-ctas">
              <Boton />
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="link-wsp">Tengo una duda →</a>
            </div>
          </div>
          <div className="hero-photo">
            <img src="/images/nf2/nf2-2-recorte.jpg" alt="Eva Benavidez" width="560" height="700" fetchPriority="high" />
          </div>
        </div>
      </section>

      {/* 2 · ¿TE PASA ESTO? */}
      <section>
        <div className="wrap">
          <h2>Este entrenamiento es para vos si…</h2>
          <div className="card-grid-2 te-pasa">
            {TE_PASA.map((i) => (
              <div className="id-card" key={i.img}>
                <img className="id-icon" src={`/images/nf2/${i.img}`} alt="" width="64" height="64" loading="lazy" />
                <span className="id-text">{i.t}</span>
              </div>
            ))}
          </div>
          <div className="callout">No es falta de capacidad. Es falta de <span className="accent">método</span>.</div>
          <div className="centro"><Boton /></div>
        </div>
      </section>

      {/* 3 · POR QUÉ PASA */}
      <section className="por-que">
        <div className="wrap angosto">
          <h2>Detrás de cada mensaje hay una persona decidiendo.</h2>
          <p>Por chat no ves su cara ni lo que siente. Sin entender cómo decide, respondés a ciegas.</p>
          <p>La IA ayuda, pero no conoce a tu cliente como vos.</p>
          <p className="remate">Primero orden. Después, IA.</p>
        </div>
      </section>

      {/* 4 · MÉTODO DÍA POR DÍA */}
      <section style={{ background: 'var(--white)' }}>
        <div className="wrap">
          <h2>Método de venta digital: tres dimensiones, tres días</h2>
          <div className="metodo-img">
            <img src="/images/nf2/nf2-7.jpg" alt="Modelo de venta digital: Orden, Foco y Seguimiento" width="1920" height="1080" loading="lazy" />
          </div>
          <div className="process-grid">
            {DIAS.map((d) => (
              <div className="process-card" key={d.eje}>
                <div className="day">{d.dia} · {d.eje}</div>
                <h3>{d.sub}</h3>
                <p className="desc">{d.txt}</p>
                <p className="linea-ia"><strong>+ IA:</strong> {d.ia}</p>
              </div>
            ))}
          </div>
          <p className="process-close">Salís con las tres dimensiones trabajadas sobre tu propio negocio, no en teoría.</p>
          <div className="centro"><Boton /></div>
        </div>
      </section>

      {/* 5 · ANTES Y DESPUÉS */}
      <section style={{ background: 'var(--wine-light)' }}>
        <div className="wrap">
          <h2>Lo que cambia cuando vendés con método</h2>
          <div className="change-grid">
            <div className="change-card">
              <div className="change-head"><span>Antes del entrenamiento</span></div>
              <ul>{ANTES.map((t) => <li key={t}><span className="mark x"><IcoX width={12} height={12} /></span>{t}</li>)}</ul>
            </div>
            <div className="change-card after">
              <div className="change-head"><span>Después del entrenamiento</span></div>
              <ul>{DESPUES.map((t) => <li key={t}><span className="mark check"><IcoCheck width={12} height={12} /></span>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · TESTIMONIOS EN VIDEO */}
      <section>
        <div className="wrap">
          <h2>No te lo cuento yo. Te lo cuentan ellos.</h2>
          <p className="subhead">Escuchá en primera persona cómo el método cambió la forma de vender de quienes ya se entrenaron.</p>
          <div className="testimonios">
            {TESTIMONIOS.map((v) => (
              <figure className="testimonio" key={v.id}>
                <div className="video-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title="Testimonios Neuroventa Digital"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                {v.nombre && (
                  <figcaption>
                    {v.frase && <q>{v.frase}</q>}
                    <span>{v.nombre}{v.rubro ? ` · ${v.rubro}` : ''}</span>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · QUÉ INCLUYE */}
      <section style={{ background: 'var(--white)' }}>
        <div className="wrap angosto">
          <h2>Qué te llevás</h2>
          <ul className="incluye">
            {INCLUYE.map((i) => (
              <li key={i.img}><img src={`/images/nf2/${i.img}`} alt="" width="48" height="48" loading="lazy" /><span>{i.t}</span></li>
            ))}
          </ul>
          <div className="centro"><Boton /></div>
        </div>
      </section>

      {/* 8 · EVA */}
      <section>
        <div className="wrap">
          <div className="eva-grid">
            <div className="eva-video">
              <iframe
                src="https://www.youtube.com/embed/dfZOWzIh_d4"
                title="Soy Eva Benavidez"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div>
              <h2 className="izq">Soy Eva Benavidez</h2>
              <div className="stat-row">
                <div className="stat"><div className="num">+20</div><div className="label">años de trayectoria</div></div>
                <div className="stat"><div className="num">+1500</div><div className="label">personas formadas</div></div>
                <div className="stat"><div className="num">+25</div><div className="label">empresas con casos de éxito</div></div>
              </div>
              <p className="eva-txt">Hace más de 20 años acompaño a personas y equipos a vender con claridad y método. Integro neurociencia, coaching y agilidad, con una mirada humana del negocio. Hoy integro la IA en cómo acompaño a equipos comerciales.</p>
              <div className="quote-box">&ldquo;El 90% de la venta es convicción y solo el 10% persuasión.&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 · INVERSIÓN + INSCRIPCIÓN */}
      <section id="inscripcion" className="inscripcion">
        <div className="wrap">
          <h2>Sumate al Entrenamiento Neuroventa Digital + IA</h2>
          <div className="insc-grid">
            <div className="price-card">
              {precio.promo ? (
                <>
                  <div className="price-old">Antes <s>{formatoPesos(precio.anterior)}</s></div>
                  <div className="price-new"><span className="price-ahora">Ahora</span> {formatoPesos(precio.total)}</div>
                  <div className="price-installments">o 3 cuotas sin interés de {formatoPesos(precio.cuota)}</div>
                  <p className="price-vence">Precio con descuento hasta el 28/10.</p>
                  <CuentaRegresiva finMs={finMs} />
                </>
              ) : (
                <>
                  <div className="price-new">{formatoPesos(precio.total)}</div>
                  <div className="price-installments">o 3 cuotas sin interés de {formatoPesos(precio.cuota)}</div>
                </>
              )}
              <ul className="price-info">
                <li><IcoTarjeta /><span>Pagás con link de pago en cuotas o por transferencia.</span></li>
                <li><IcoEscudo /><span>Garantía de 15 días: si dentro de los 15 días desde el primer encuentro sentís que no es para vos, te devolvemos el 80% de tu inversión.</span></li>
              </ul>
              <ul className="price-list">
                <li>3 encuentros en vivo</li>
                <li>Material y herramientas</li>
                <li>Acompañamiento y práctica</li>
                <li>Grabaciones</li>
              </ul>
              <p className="price-fechas"><IcoCalendario width={16} height={16} /> {FECHAS_TEXTO} · {HORARIO}</p>
            </div>
            <div className="form-card">
              <FormInscripcion valor={precio.total} />
            </div>
          </div>
        </div>
      </section>

      {/* 10 · PREGUNTAS FRECUENTES */}
      <section style={{ background: 'var(--white)' }}>
        <div className="wrap angosto">
          <h2>Preguntas frecuentes</h2>
          <div className="faq">
            {FAQ.map(([p, r]) => (
              <details key={p}>
                <summary>{p}<IcoChevron /></summary>
                <p>{r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11 · CIERRE */}
      <section className="cierre">
        <div className="wrap">
          <h2>Con orden y dirección, todo se logra.</h2>
          <p>Primero tu método. Después, la IA lo multiplica en cada canal.</p>
          <Boton />
        </div>
      </section>

      <footer>
        <div className="redes">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IcoInstagram /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IcoLinkedin /></a>
          <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IcoWhatsapp /></a>
        </div>
        <p>© 2026 Eva Benavidez · Coach &amp; Consultora · <a href={LINKS.sitio}>evabenavidez.com</a></p>
      </footer>

      <WspFlotante href={LINKS.whatsapp} />
    </>
  );
}
