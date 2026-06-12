// Bloque 3 — Inglés: vocabulario por tema y quiz interactivo con voz.

import { $ } from "../dom";

interface TemaVocabulario {
  tema: string;
  palabra: string;
  traduccion: string;
  emoji: string; // Agregamos el emoji para la interfaz infantil
}

const TEMAS: TemaVocabulario[] = [
  { tema: "Animals", palabra: "Dragon", traduccion: "Dragón", emoji: "🐉" },
  { tema: "Colors", palabra: "Green", traduccion: "Verde", emoji: "🟢" },
  { tema: "Numbers", palabra: "Three", traduccion: "Tres", emoji: "3️⃣" },
  { tema: "Family", palabra: "Sister", traduccion: "Hermana", emoji: "👧" },
  { tema: "Food", palabra: "Apple", traduccion: "Manzana", emoji: "🍎" },
];

export function iniciarIngles(): void {
  const listaTemas = $<HTMLDivElement>("#topic-list");
  const palabraEl = $<HTMLHeadingElement>("#english-word");
  const opcionesQuiz = $<HTMLDivElement>("#quiz-options");
  const feedbackQuiz = $<HTMLParagraphElement>("#quiz-feedback");

  for (const tema of TEMAS) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = `${tema.emoji} ${tema.tema}`; // Mostramos emoji + texto
    
    boton.addEventListener("click", () => {
      // 1. Animación elástica del texto al cambiar de palabra
      palabraEl.textContent = `${tema.emoji} ${tema.palabra} — ${tema.traduccion}`;
      palabraEl.style.transform = "scale(1.15)";
      setTimeout(() => {
        palabraEl.style.transform = "scale(1)";
      }, 200);

      // 2. Magia auditiva: El navegador pronuncia la palabra
      const pronunciacion = new SpeechSynthesisUtterance(tema.palabra);
      pronunciacion.lang = "en-US";
      pronunciacion.pitch = 1.3; // Un tono ligeramente agudo, ideal para niños
      pronunciacion.rate = 0.9;  // Un poquito más lento para que sea claro
      window.speechSynthesis.speak(pronunciacion);

      // 3. Resaltar el botón activo
      for (const otro of listaTemas.querySelectorAll("button")) {
        otro.classList.toggle("activo", otro === boton);
      }
    });
    
    listaTemas.append(boton);
  }

  // Lógica interactiva del Quiz
  opcionesQuiz.addEventListener("click", (evento) => {
    const boton = evento.target;
    if (!(boton instanceof HTMLButtonElement)) {
      return;
    }
    
    const esCorrecta = boton.dataset["correct"] === "true";
    
    if (esCorrecta) {
      feedbackQuiz.textContent = "✨ Awesome! You got it right! ✨";
      feedbackQuiz.className = "quizFeedback ok";
      boton.style.borderColor = "#2f7d68";
      boton.style.backgroundColor = "#eef6f4";
    } else {
      feedbackQuiz.textContent = "Oops! Try again, you can do it! 🖍️";
      
      // Truco técnico para reiniciar la animación de temblor (shake) cada vez que falle
      feedbackQuiz.className = "quizFeedback error";
      void feedbackQuiz.offsetWidth; // Fuerza al navegador a recalcular (Reflow)
      feedbackQuiz.className = "quizFeedback error shake";
      
      boton.style.borderColor = "#b85627";
    }
  });
}
