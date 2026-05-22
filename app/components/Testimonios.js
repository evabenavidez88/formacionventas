const testimonios = [
  { txt: 'Conocer mi arquetipo y mi dominancia cerebral me permitió interactuar de forma más productiva y asertiva.', au: 'María Ximena del Rosario Leiva', emp: "Pluto's" },
  { txt: 'Me sorprendió la cantidad de herramientas prácticas y las actividades para ponerlas en marcha.', au: 'Agustín Oronel', emp: "Pluto's" },
  { txt: 'Aprendí a pensar en cada venta como algo único y a evaluar mi forma de vender.', au: 'Carolina Chocobares', emp: "Pluto's" },
  { txt: 'Aprendí a leer al cliente, identificar sus necesidades y saber cómo cubrirlas.', au: 'Juan Martín Azar', emp: "Pluto's" },
  { txt: 'Me encantó la experiencia. Me llevo muchas herramientas para aplicar tanto en lo laboral como personal.', au: 'Valeria Españon', emp: "Pluto's Juguetería" },
  { txt: 'Este proceso me enseñó a observar más, no solo al cliente, sino también a mí misma.', au: 'Natalia Paola Canellada', emp: "Pluto's" },
  { txt: 'Lo que más destaco es entender que la venta es un proceso y no algo improvisado.', au: 'César Oronel', emp: "Pluto's" },
  { txt: 'Reconocer las necesidades del cliente y entender las dominancias cerebrales me ayudó a facilitar las ventas.', au: 'Lucas Molinatti', emp: 'Global EMR' },
  { txt: 'Valoro haber aprendido a ver diferentes perspectivas en cada situación.', au: 'Gastón Madalon', emp: 'Global EMR' },
  { txt: 'Poner mayor atención a las necesidades del cliente y hacer más preguntas fue fundamental.', au: 'Micaela Di Felice', emp: 'Global EMR' },
  { txt: 'Entender todas las etapas de una venta y aprender a interrogar mejor fueron aprendizajes clave.', au: 'Yamila Rocchietti', emp: "Pluto's" },
];

function TestimonialCard({ t }) {
  return (
    <div className="tst">
      <div className="st">★★★★★</div>
      <p>"{t.txt}"</p>
      <div className="au">{t.au}</div>
      <div className="emp">{t.emp}</div>
    </div>
  );
}

export default function Testimonios() {
  const duplicated = [...testimonios, ...testimonios];
  return (
    <section className="sec" style={{ background: '#fff' }}>
      <div style={{ maxWidth: '980px', margin: '0 auto', paddingLeft: '5%' }}>
        <div className="tc">
          <span className="tag">Testimonios</span>
          <h2 style={{ fontSize: '28px', marginBottom: '12px', color: '#111' }}>
            Lo que dicen quienes ya se entrenaron
          </h2>
        </div>
      </div>
      <div className="car-outer">
        <div className="car-track">
          {duplicated.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
