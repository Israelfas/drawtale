// Bloque 1 — Matemáticas (módulo de Robert García).
// Reto contra reloj: preguntas generadas al azar, validación del input en
// tiempo real, puntaje en vivo y mejor puntaje persistido en localStorage.

import { $, cargarJson } from "../dom";
import { guardarStorage, leerStorage } from "../storage";
import type { Actividad, RecordMatematicas } from "../types";

const DURACION_SEGUNDOS = 90;
const CLAVE_RECORD = "drawtale-record-matematicas";
const SOLO_ENTEROS = /^\d+$/;

interface Pregunta {
  texto: string;
  resultado: number;
}

function entreAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generarPregunta(): Pregunta {
  const tipo = entreAleatorio(0, 2);
  if (tipo === 0) {
    // Suma con resultado hasta 1000
    const a = entreAleatorio(100, 600);
    const b = entreAleatorio(50, 400);
    return { texto: `${a} + ${b} = ?`, resultado: a + b };
  }
  if (tipo === 1) {
    // Resta sin negativos
    const a = entreAleatorio(300, 999);
    const b = entreAleatorio(10, 299);
    return { texto: `${a} − ${b} = ?`, resultado: a - b };
  }
  // Tablas del 1 al 10
  const a = entreAleatorio(2, 10);
  const b = entreAleatorio(2, 10);
  return { texto: `${a} × ${b} = ?`, resultado: a * b };
}

function formatearTiempo(totalSegundos: number): string {
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

async function renderizarActividades(): Promise<void> {
  const grid = $<HTMLDivElement>("#activity-grid");
  const actividades = await cargarJson<Actividad[]>("/data/actividades.json");

  for (const actividad of actividades) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card";

    const titulo = document.createElement("h3");
    titulo.textContent = actividad.label;

    const detalle = document.createElement("p");
    detalle.textContent = actividad.detail;

    tarjeta.append(titulo, detalle);
    grid.append(tarjeta);
  }
}

export async function iniciarMatematicas(): Promise<void> {
  await renderizarActividades();

  const timerEl = $<HTMLElement>("#math-timer");
  const preguntaEl = $<HTMLParagraphElement>("#math-question");
  const formulario = $<HTMLFormElement>("#math-form");
  const input = $<HTMLInputElement>("#math-answer");
  const botonComprobar = $<HTMLButtonElement>("#math-check");
  const feedback = $<HTMLParagraphElement>("#math-feedback");
  const puntajeEl = $<HTMLElement>("#math-score");
  const mejorEl = $<HTMLElement>("#math-best");
  const botonComenzar = $<HTMLButtonElement>("#math-start");

  let preguntaActual: Pregunta | null = null;
  let puntaje = 0;
  let segundosRestantes = DURACION_SEGUNDOS;
  let intervalo: number | null = null;

  const record = leerStorage<RecordMatematicas>(CLAVE_RECORD, {
    mejorPuntaje: 0,
    fecha: "",
  });
  mejorEl.textContent = String(record.mejorPuntaje);

  function mostrarFeedback(mensaje: string, tipo: "ok" | "error" | "info"): void {
    feedback.textContent = mensaje;
    feedback.className = `mathFeedback ${tipo}`;
  }

  function siguientePregunta(): void {
    preguntaActual = generarPregunta();
    preguntaEl.textContent = preguntaActual.texto;
    input.value = "";
    input.classList.remove("ok", "error");
    input.focus();
  }

  function terminarReto(): void {
    if (intervalo !== null) {
      window.clearInterval(intervalo);
      intervalo = null;
    }
    preguntaActual = null;
    input.disabled = true;
    botonComprobar.disabled = true;
    botonComenzar.disabled = false;
    botonComenzar.textContent = "Jugar otra vez";
    preguntaEl.textContent = "¡Tiempo!";

    if (puntaje > record.mejorPuntaje) {
      record.mejorPuntaje = puntaje;
      record.fecha = new Date().toISOString();
      guardarStorage(CLAVE_RECORD, record);
      mejorEl.textContent = String(record.mejorPuntaje);
      mostrarFeedback(`🏆 ¡Nuevo récord: ${puntaje} aciertos!`, "ok");
    } else {
      mostrarFeedback(`Terminaste con ${puntaje} aciertos.`, "info");
    }
  }

  // Validación en tiempo real: solo se aceptan números enteros.
  input.addEventListener("input", () => {
    const valor = input.value.trim();
    if (valor === "") {
      input.classList.remove("ok", "error");
      botonComprobar.disabled = true;
      mostrarFeedback("", "info");
      return;
    }
    if (!SOLO_ENTEROS.test(valor)) {
      input.classList.remove("ok");
      input.classList.add("error");
      botonComprobar.disabled = true;
      mostrarFeedback("Escribe solo números, sin letras ni espacios.", "error");
      return;
    }
    input.classList.remove("error");
    input.classList.add("ok");
    botonComprobar.disabled = false;
    mostrarFeedback("", "info");
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (preguntaActual === null) {
      return;
    }
    const valor = input.value.trim();
    if (!SOLO_ENTEROS.test(valor)) {
      return;
    }
    if (Number(valor) === preguntaActual.resultado) {
      puntaje += 1;
      puntajeEl.textContent = String(puntaje);
      mostrarFeedback("✔ ¡Correcto!", "ok");
    } else {
      mostrarFeedback(`✘ Era ${preguntaActual.resultado}. ¡Sigue!`, "error");
    }
    botonComprobar.disabled = true;
    siguientePregunta();
  });

  botonComenzar.addEventListener("click", () => {
    puntaje = 0;
    puntajeEl.textContent = "0";
    segundosRestantes = DURACION_SEGUNDOS;
    timerEl.textContent = formatearTiempo(segundosRestantes);
    input.disabled = false;
    botonComenzar.disabled = true;
    mostrarFeedback("", "info");
    siguientePregunta();

    intervalo = window.setInterval(() => {
      segundosRestantes -= 1;
      timerEl.textContent = formatearTiempo(segundosRestantes);
      if (segundosRestantes <= 0) {
        terminarReto();
      }
    }, 1000);
  });
}
