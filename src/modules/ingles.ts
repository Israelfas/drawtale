// Bloque 3 — Inglés: vocabulario por tema y quiz con feedback inmediato.

import { $ } from "../dom";

interface TemaVocabulario {
  tema: string;
  palabra: string;
  traduccion: string;
}

const TEMAS: TemaVocabulario[] = [
  { tema: "Animals", palabra: "Dragon", traduccion: "Dragón" },
  { tema: "Colors", palabra: "Green", traduccion: "Verde" },
  { tema: "Numbers", palabra: "Three", traduccion: "Tres" },
  { tema: "Family", palabra: "Sister", traduccion: "Hermana" },
  { tema: "Food", palabra: "Apple", traduccion: "Manzana" },
];

export function iniciarIngles(): void {
  const listaTemas = $<HTMLDivElement>("#topic-list");
  const palabraEl = $<HTMLHeadingElement>("#english-word");
  const opcionesQuiz = $<HTMLDivElement>("#quiz-options");
  const feedbackQuiz = $<HTMLParagraphElement>("#quiz-feedback");

  for (const tema of TEMAS) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = tema.tema;
    boton.addEventListener("click", () => {
      palabraEl.textContent = `${tema.palabra} — ${tema.traduccion}`;
      for (const otro of listaTemas.querySelectorAll("button")) {
        otro.classList.toggle("activo", otro === boton);
      }
    });
    listaTemas.append(boton);
  }

  opcionesQuiz.addEventListener("click", (evento) => {
    const boton = evento.target;
    if (!(boton instanceof HTMLButtonElement)) {
      return;
    }
    const esCorrecta = boton.dataset["correct"] === "true";
    feedbackQuiz.textContent = esCorrecta
      ? "✔ Correct! The dragon is green."
      : "✘ Not quite, try again.";
    feedbackQuiz.className = `quizFeedback ${esCorrecta ? "ok" : "error"}`;
  });
}
