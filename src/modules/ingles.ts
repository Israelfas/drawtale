// Bloque 3 — Inglés (módulo de Estefanía).
// Portado desde la app Angular independiente "modulo-ingles-angular":
// actividades filtrables, vocabulario con voz, quiz de 5 preguntas y
// progreso global (practicadas / puntos), persistido en localStorage.

import { $, cargarJson } from "../dom";
import { guardarStorage, leerStorage } from "../storage";
import type {
  ActividadIngles,
  PreguntaQuizIngles,
  ProgresoIngles,
  TemaVocabulario,
} from "../types";

const CLAVE_PROGRESO = "drawtale-progreso-ingles";

// Vocabulario por tema: el "tema" coincide con el "titulo" de cada
// actividad para poder cruzar cada actividad con su palabra en el detalle.
const TEMAS: TemaVocabulario[] = [
  { tema: "Animals", palabra: "Dragon", traduccion: "Dragón", emoji: "🐉" },
  { tema: "Colors", palabra: "Green", traduccion: "Verde", emoji: "🟢" },
  { tema: "Numbers", palabra: "Three", traduccion: "Tres", emoji: "3️⃣" },
  { tema: "Family", palabra: "Sister", traduccion: "Hermana", emoji: "👧" },
  { tema: "Food", palabra: "Apple", traduccion: "Manzana", emoji: "🍎" },
  { tema: "Body", palabra: "Hand", traduccion: "Mano", emoji: "✋" },
  { tema: "Nature", palabra: "Tree", traduccion: "Árbol", emoji: "🌳" },
];

const PREGUNTAS_QUIZ: PreguntaQuizIngles[] = [
  {
    pregunta: "How do you say «Manzana» in English?",
    opciones: ["Apple", "Dragon", "Tree", "Hand"],
    correcta: "Apple",
  },
  {
    pregunta: "What does «Sister» mean?",
    opciones: ["Hermana", "Hermano", "Madre", "Amiga"],
    correcta: "Hermana",
  },
  {
    pregunta: "How do you say «Verde» in English?",
    opciones: ["Green", "Blue", "Red", "Three"],
    correcta: "Green",
  },
  {
    pregunta: "What does «Dragon» mean?",
    opciones: ["Dragón", "Gato", "Árbol", "Mano"],
    correcta: "Dragón",
  },
  {
    pregunta: "How do you say «Tres» in English?",
    opciones: ["Three", "Tree", "Free", "Green"],
    correcta: "Three",
  },
];

// Equivalente al servicio "Voz" de Angular: pronuncia con voz del navegador.
function pronunciar(palabra: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  const pronunciacion = new SpeechSynthesisUtterance(palabra);
  pronunciacion.lang = "en-US";
  pronunciacion.pitch = 1.3; // tono agudo, ideal para niños
  pronunciacion.rate = 0.9; // un poco más lento para que sea claro
  window.speechSynthesis.cancel(); // corta lo anterior si seguía hablando
  window.speechSynthesis.speak(pronunciacion);
}

function cambiarPestana(pestanaActiva: string): void {
  const botones = document.querySelectorAll<HTMLButtonElement>("[data-ingles-tab]");
  const paneles = document.querySelectorAll<HTMLElement>("[data-ingles-panel]");

  for (const boton of botones) {
    boton.classList.toggle("activo", boton.dataset["inglesTab"] === pestanaActiva);
  }
  for (const panel of paneles) {
    panel.hidden = panel.dataset["inglesPanel"] !== pestanaActiva;
  }
}

export async function iniciarIngles(): Promise<void> {
  const actividades = await cargarJson<ActividadIngles[]>("/data/actividades-ingles.json");

  // ---------- Estado de progreso (persistido en localStorage) ----------
  const progreso = leerStorage<ProgresoIngles>(CLAVE_PROGRESO, {});

  function guardarProgreso(): void {
    guardarStorage(CLAVE_PROGRESO, progreso);
  }

  function registrarPractica(actividadId: string): void {
    const actual = progreso[actividadId];
    progreso[actividadId] = actual
      ? { practicada: true, intentos: actual.intentos + 1 }
      : { practicada: true, intentos: 1 };
    guardarProgreso();
    renderizarProgreso();
  }

  function totalPuntos(): number {
    return actividades.reduce((total, actividad) => {
      const item = progreso[actividad.id];
      return total + (item?.practicada ? actividad.puntos : 0);
    }, 0);
  }

  function totalPracticadas(): number {
    return Object.values(progreso).filter((item) => item.practicada).length;
  }

  // ---------- Pestañas ----------
  for (const boton of document.querySelectorAll<HTMLButtonElement>("[data-ingles-tab]")) {
    boton.addEventListener("click", () => cambiarPestana(boton.dataset["inglesTab"] ?? "actividades"));
  }

  // ---------- Bloque de actividades ----------
  const grid = $<HTMLDivElement>("#ingles-activities-grid");
  const vacio = $<HTMLParagraphElement>("#ingles-activities-empty");
  const filtro = $<HTMLInputElement>("#ingles-filtro");

  const detalle = $<HTMLElement>("#ingles-detail");
  const detalleMeta = $<HTMLSpanElement>("#ingles-detail-meta");
  const detalleTitulo = $<HTMLHeadingElement>("#ingles-detail-titulo");
  const detalleDescripcion = $<HTMLParagraphElement>("#ingles-detail-descripcion");
  const detalleObjetivo = $<HTMLParagraphElement>("#ingles-detail-objetivo");
  const detalleIntentos = $<HTMLSpanElement>("#ingles-detail-intentos");
  const detalleEmoji = $<HTMLSpanElement>("#ingles-detail-emoji");
  const detallePalabra = $<HTMLElement>("#ingles-detail-word");
  const detalleTraduccion = $<HTMLSpanElement>("#ingles-detail-translation");
  const detalleEscuchar = $<HTMLButtonElement>("#ingles-detail-listen");
  const detallePracticada = $<HTMLButtonElement>("#ingles-detail-practicada");
  const detalleIrQuiz = $<HTMLButtonElement>("#ingles-detail-ir-quiz");

  let actividadSeleccionadaId: string | null = null;

  function temaDe(actividad: ActividadIngles): TemaVocabulario | undefined {
    return TEMAS.find((t) => t.tema === actividad.titulo);
  }

  function mostrarDetalle(actividad: ActividadIngles): void {
    actividadSeleccionadaId = actividad.id;
    const tema = temaDe(actividad);

    detalleMeta.textContent = `${actividad.nivel} · ${actividad.puntos} pts`;
    detalleTitulo.textContent = actividad.titulo;
    detalleDescripcion.textContent = actividad.descripcion;
    detalleObjetivo.textContent = actividad.objetivo;
    detalleIntentos.textContent = String(progreso[actividad.id]?.intentos ?? 0);

    if (tema) {
      detalleEmoji.textContent = tema.emoji;
      detallePalabra.textContent = tema.palabra;
      detalleTraduccion.textContent = `— ${tema.traduccion}`;
    }

    detalle.hidden = false;
    detalle.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderizarActividades(): void {
    const texto = filtro.value.trim().toLowerCase();
    const filtradas = texto
      ? actividades.filter((a) =>
          `${a.titulo} ${a.descripcion} ${a.nivel}`.toLowerCase().includes(texto),
        )
      : actividades;

    grid.innerHTML = "";
    vacio.hidden = filtradas.length > 0;

    for (const actividad of filtradas) {
      const tarjeta = document.createElement("article");
      tarjeta.className = "card ingles-card";

      const meta = document.createElement("span");
      meta.className = "card__meta";
      meta.textContent = `${actividad.nivel} · ${actividad.puntos} pts`;

      const titulo = document.createElement("h3");
      titulo.textContent = actividad.titulo;

      const desc = document.createElement("p");
      desc.textContent = actividad.descripcion;

      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "ingles-card__boton";
      boton.textContent = progreso[actividad.id]?.practicada ? "✔ Practicada — ver de nuevo" : "Ver detalle";
      boton.addEventListener("click", () => mostrarDetalle(actividad));

      tarjeta.append(meta, titulo, desc, boton);
      grid.append(tarjeta);
    }
  }

  filtro.addEventListener("input", renderizarActividades);

  detalleEscuchar.addEventListener("click", () => {
    if (!actividadSeleccionadaId) return;
    const actividad = actividades.find((a) => a.id === actividadSeleccionadaId);
    const tema = actividad ? temaDe(actividad) : undefined;
    if (!tema) return;

    pronunciar(tema.palabra);
    detallePalabra.style.transform = "scale(1.15)";
    setTimeout(() => {
      detallePalabra.style.transform = "scale(1)";
    }, 200);
  });

  detallePracticada.addEventListener("click", () => {
    if (!actividadSeleccionadaId) return;
    registrarPractica(actividadSeleccionadaId);
    detalleIntentos.textContent = String(progreso[actividadSeleccionadaId]?.intentos ?? 0);
    renderizarActividades();
  });

  detalleIrQuiz.addEventListener("click", () => cambiarPestana("quiz"));

  // ---------- Bloque de quiz ----------
  const quizPregunta = $<HTMLParagraphElement>("#quiz-question-ingles");
  const quizOpciones = $<HTMLDivElement>("#quiz-options-ingles");
  const quizFeedback = $<HTMLParagraphElement>("#quiz-feedback-ingles");
  const quizProgreso = $<HTMLParagraphElement>("#quiz-progress-ingles");
  const quizEnCurso = $<HTMLDivElement>("#quiz-en-curso-ingles");
  const quizFinal = $<HTMLDivElement>("#quiz-final-ingles");
  const quizResultado = $<HTMLParagraphElement>("#quiz-resultado-ingles");
  const quizReiniciar = $<HTMLButtonElement>("#quiz-reiniciar-ingles");

  let indiceQuiz = 0;
  let aciertosQuiz = 0;

  function renderizarPreguntaQuiz(): void {
    const pregunta = PREGUNTAS_QUIZ[indiceQuiz];
    if (!pregunta) return;

    quizPregunta.textContent = pregunta.pregunta;
    quizFeedback.textContent = "";
    quizFeedback.className = "quizFeedback";
    quizProgreso.textContent = `Pregunta ${indiceQuiz + 1} de ${PREGUNTAS_QUIZ.length} · Aciertos: ${aciertosQuiz}`;

    quizOpciones.innerHTML = "";
    for (const opcion of pregunta.opciones) {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.textContent = opcion;
      boton.addEventListener("click", () => responderQuiz(opcion, pregunta.correcta));
      quizOpciones.append(boton);
    }
  }

  function responderQuiz(opcion: string, correcta: string): void {
    if (opcion === correcta) {
      aciertosQuiz += 1;
      quizFeedback.textContent = "✨ Awesome! You got it right! ✨";
      quizFeedback.className = "quizFeedback ok";
      setTimeout(siguientePreguntaQuiz, 900);
    } else {
      quizFeedback.textContent = "Oops! Try again, you can do it! 🖍️";
      quizFeedback.className = "quizFeedback error";
      void quizFeedback.offsetWidth; // fuerza reflow para reiniciar la animación
      quizFeedback.className = "quizFeedback error shake";
    }
    quizProgreso.textContent = `Pregunta ${indiceQuiz + 1} de ${PREGUNTAS_QUIZ.length} · Aciertos: ${aciertosQuiz}`;
  }

  function siguientePreguntaQuiz(): void {
    if (indiceQuiz + 1 >= PREGUNTAS_QUIZ.length) {
      terminarQuiz();
    } else {
      indiceQuiz += 1;
      renderizarPreguntaQuiz();
    }
  }

  function terminarQuiz(): void {
    quizEnCurso.hidden = true;
    quizFinal.hidden = false;
    quizResultado.textContent = `🏆 ${aciertosQuiz} / ${PREGUNTAS_QUIZ.length} correctas`;
  }

  function reiniciarQuiz(): void {
    indiceQuiz = 0;
    aciertosQuiz = 0;
    quizEnCurso.hidden = false;
    quizFinal.hidden = true;
    renderizarPreguntaQuiz();
  }

  quizReiniciar.addEventListener("click", reiniciarQuiz);

  // ---------- Bloque de progreso ----------
  const progresoPracticadas = $<HTMLSpanElement>("#progreso-ingles-practicadas");
  const progresoPuntos = $<HTMLSpanElement>("#progreso-ingles-puntos");
  const progresoLista = $<HTMLDivElement>("#progreso-ingles-lista");

  function renderizarProgreso(): void {
    progresoPracticadas.textContent = String(totalPracticadas());
    progresoPuntos.textContent = String(totalPuntos());

    progresoLista.innerHTML = "";
    for (const actividad of actividades) {
      const item = progreso[actividad.id];

      const fila = document.createElement("article");
      fila.className = "progreso-item";

      const info = document.createElement("div");
      const titulo = document.createElement("h3");
      titulo.textContent = actividad.titulo;
      const estado = document.createElement("p");
      estado.textContent = item?.practicada ? "Practicada" : "Pendiente";
      estado.className = item?.practicada ? "progreso-item__estado ok" : "progreso-item__estado";
      info.append(titulo, estado);

      const intentos = document.createElement("span");
      intentos.textContent = `${item?.intentos ?? 0} intentos`;

      fila.append(info, intentos);
      progresoLista.append(fila);
    }
  }

  // ---------- Inicialización ----------
  renderizarActividades();
  renderizarPreguntaQuiz();
  renderizarProgreso();
  cambiarPestana("actividades");
}
