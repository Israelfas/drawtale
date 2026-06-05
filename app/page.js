"use client";
import { useMemo, useState } from "react";
import Script from "next/script";
import styles from "./page.module.css";
import PipelineSection from '@/components/pipeline/PipelineSection';
import FormularioInteres from '@/components/formulario/FormularioInteres';
import FAQ from '@/components/faq/FAQ';
import Galeria from '@/components/galeria/Galeria';

const mathActivities = [
  { label: "Compra lista", detail: "Suma precios hasta 1000 y calcula el cambio." },
  { label: "Tablas relampago", detail: "Multiplicaciones del 1 al 10 contra reloj." },
  { label: "Reparte dulces", detail: "Divisiones simples con grupos iguales." },
  { label: "Pizza fraccionada", detail: "Mitad, cuarto y tercio con piezas visuales." },
];

const grammarCards = ["sustantivos", "verbos", "adjetivos", "tildes"];

const englishTopics = [
  "Animals",
  "Colors",
  "Numbers",
  "Family",
  "Food",
];

const faqItems = [
  {
    question: "Para que edad es DrawTale Edu?",
    answer: "DrawTale Edu esta pensado para niños de 5 a 10 años, con actividades visuales y retos cortos adaptados a esa etapa.",
  },
  {
    question: "Necesita internet?",
    answer: "Si, necesita internet para cargar la plataforma, subir dibujos y generar cuentos o actividades interactivas.",
  },
  {
    question: "Es seguro para niños?",
    answer: "Si. La experiencia esta diseñada para acompanamiento familiar o escolar, con contenido educativo y lenguaje apropiado para ninos.",
  },
  {
    question: "En que dispositivos funciona?",
    answer: "Funciona en computadoras, tablets y celulares modernos con navegador web actualizado.",
  },
];

export default function Home() {
  const [drawingName, setDrawingName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [answer, setAnswer] = useState("");

  const generatedStory = useMemo(() => {
    const subject = drawingName ? "tu dibujo" : "un dibujo misterioso";
    return `En ${subject}, una pequena exploradora llamada Lila encuentra una puerta brillante escondida entre formas y colores. Al abrirla, descubre un valle donde las nubes guardan mapas, las flores cuentan chistes y cada estrella aprende una palabra nueva antes de dormir. Lila nota que algo falta: el rio de ideas se ha quedado quieto. Entonces usa tres pistas del dibujo para inventar una solucion: un camino, un amigo y una luz. Con paciencia, combina las formas, escucha al viento y descubre que el rio vuelve a moverse cuando alguien comparte una historia. Desde ese dia, cada vez que Lila dibuja, el valle despierta con una aventura distinta.`;
  }, [drawingName]);

  function handleDrawingUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      setDrawingName("");
      setPreviewUrl("");
      return;
    }
    setDrawingName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  }

  return (
    <main className={styles.page}>

      {/* HERO */}
      <header className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Drawtale Edu</p>
          <h1 id="page-title">Aula interactiva para niños de 5 a 10 años</h1>
          <p>
            Tres bloques de aprendizaje conectan matematicas, lengua e ingles
            con retos breves, visuales y una experiencia creativa basada en dibujos.
          </p>
        </div>
        <div className={styles.heroPanel} aria-label="Resumen de progreso">
          <span>3 bloques</span>
          <strong>Aprender, crear y comprobar</strong>
          <div className={styles.progressGrid}>
            <span style={{ "--level": "82%" }}>Mat</span>
            <span style={{ "--level": "94%" }}>IA</span>
            <span style={{ "--level": "76%" }}>Eng</span>
          </div>
        </div>
      </header>

      {/* PROBLEMA */}
      <section className={styles.problemBand} aria-labelledby="problem-title">
        <div>
          <p className={styles.kicker}>Problema identificado</p>
          <h2 id="problem-title">Practicar en casa suele sentirse repetitivo y poco conectado con la creatividad.</h2>
        </div>
        <p>
          Ayudamos a niños de 5 a 10 años y a sus familias a reforzar matematicas,
          lengua y ciencias con actividades visuales y cuentos creados desde sus
          propios dibujos, para aumentar practica, comprension y motivacion semanal.
        </p>
      </section>

      {/* BLOQUE 1 — MATEMÁTICAS */}
      <section className={styles.block} aria-labelledby="math-title">
        <div className={styles.blockHeader}>
          <p className={styles.kicker}>Bloque 1</p>
          <h2 id="math-title">Matematicas</h2>
          <p>Operaciones hasta 1000, tablas, divisiones y fracciones basicas.</p>
        </div>
        <div className={styles.mathLayout}>
          <div className={styles.timerGame}>
            <div className={styles.timerTop}>
              <span>Reto con temporizador</span>
              <strong>01:30</strong>
            </div>
            <p className={styles.equation}>248 + 375 = ?</p>
            <div className={styles.answerRow}>
              <button>613</button>
              <button className={styles.correct}>623</button>
              <button>633</button>
            </div>
          </div>
          <div className={styles.activityGrid}>
            {mathActivities.map((activity) => (
              <article className={styles.card} key={activity.label}>
                <h3>{activity.label}</h3>
                <p>{activity.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 2 — LENGUA CON IA */}
      <section className={`${styles.block} ${styles.languageBlock}`} aria-labelledby="language-title">
        <div className={styles.blockHeader}>
          <p className={styles.kicker}>Bloque 2</p>
          <h2 id="language-title">Lengua con IA creativa</h2>
          <p>
            Lectura comprensiva, gramatica, ortografia y escritura creativa a partir
            de dibujos subidos por el nino.
          </p>
        </div>
        <div className={styles.languageLayout}>
          <div className={styles.uploadPanel}>
            <label className={styles.uploadBox}>
              <span>Subir dibujo JPG o PNG</span>
              <input type="file" accept="image/png,image/jpeg" onChange={handleDrawingUpload} />
            </label>
            {previewUrl ? (
              <img className={styles.preview} src={previewUrl} alt="Vista previa del dibujo subido" />
            ) : (
              <div className={styles.previewPlaceholder}>Vista previa del dibujo</div>
            )}
            <div className={styles.techStack}>
              <span>Vision IA</span>
              <span>Cuento 200-300 palabras</span>
              <span>3-4 imagenes</span>
              <span>Preguntas</span>
            </div>
          </div>
          <div className={styles.storyPanel}>
            <p className={styles.storyLabel}>Cuento generado</p>
            <h3>{drawingName || "Dibujo sin subir todavia"}</h3>
            <p>{generatedStory}</p>
            <div className={styles.storyImages} aria-label="Imagenes generadas de ejemplo">
              <span>Escena 1</span>
              <span>Escena 2</span>
              <span>Escena 3</span>
              <span>Escena 4</span>
            </div>
            <fieldset className={styles.questionBox}>
              <legend>Comprension lectora</legend>
              <label htmlFor="answer">Que hizo Lila para resolver el problema?</label>
              <textarea
                id="answer"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Escribe tu respuesta..."
              />
            </fieldset>
          </div>
        </div>
        <div className={styles.grammarStrip}>
          {grammarCards.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* BLOQUE 3 — INGLÉS */}
      <section className={styles.block} aria-labelledby="english-title">
        <div className={styles.blockHeader}>
          <p className={styles.kicker}>Bloque 3</p>
          <h2 id="english-title">Ingles</h2>
          <p>Vocabulario, frases y pronunciacion generados desde el dibujo del nino.</p>
        </div>
        <div className={styles.scienceLayout}>
          <div className={styles.labPanel}>
            <span>Palabra del dibujo</span>
            <h3>Dragon — Dragon</h3>
            <div className={styles.matterDemo}>
              <span>Noun</span>
              <span>Adjective</span>
              <span>Verb</span>
            </div>
          </div>
          <div className={styles.topicList}>
            {englishTopics.map((topic) => (
              <button key={topic}>{topic}</button>
            ))}
          </div>
          <div className={styles.quizPanel}>
            <span>Quiz en ingles</span>
            <p>What color is the dragon in the drawing?</p>
            <button>Green</button>
            <button>Blue</button>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.blockHeader}>
          <p className={styles.kicker}>FAQ</p>
          <h2 id="faq-title">Preguntas frecuentes</h2>
        </div>

        <div className={styles.faqList} data-faq-list>
          {faqItems.map((item, index) => {
            const answerId = `faq-answer-${index}`;

            return (
              <article className={styles.faqItem} key={item.question}>
                <button
                  className={styles.faqQuestion}
                  type="button"
                  aria-expanded="false"
                  aria-controls={answerId}
                  data-faq-toggle
                >
                  <span>{item.question}</span>
                  <span className={styles.faqIcon} aria-hidden="true">+</span>
                </button>
                <p id={answerId} className={styles.faqAnswer} data-faq-answer hidden>
                  {item.answer}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Drawtale Edu</span>
        <span>Landing del Hito 1: vision del producto y modulos del equipo.</span>
        <span>Landing del Hito 2: Landing mejorada con JS puro: formulario funcional, FAQ interactivo, captura de interés</span>
      </footer>
      <Script src="/js/faq.js" strategy="afterInteractive" />
    </main>
  );
}