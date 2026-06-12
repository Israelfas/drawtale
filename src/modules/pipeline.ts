// Pipeline de IA (sección de Marcelo): pasos del flujo dibujo → historia y
// una demo simulada que recorre las etapas con temporizadores.

import { $ } from "../dom";

interface PasoPipeline {
  id: number;
  emoji: string;
  titulo: string;
  tecnologia: string;
  descripcion: string;
  hito: 1 | 3;
}

const PASOS: PasoPipeline[] = [
  {
    id: 1,
    emoji: "🎨",
    titulo: "Canvas input",
    tecnologia: "HTML5 Canvas API",
    descripcion:
      "El niño dibuja libremente. El canvas captura la imagen y la convierte en base64 PNG lista para enviar al pipeline.",
    hito: 1,
  },
  {
    id: 2,
    emoji: "👁️",
    titulo: "Modelo de visión",
    tecnologia: "Claude Vision",
    descripcion:
      "Un modelo de visión analiza el dibujo e identifica formas, colores y objetos. Devuelve una descripción semántica en texto.",
    hito: 3,
  },
  {
    id: 3,
    emoji: "✍️",
    titulo: "Generación narrativa",
    tecnologia: "Claude / GPT",
    descripcion:
      "Un LLM recibe la descripción y genera una historia infantil de 200 palabras adaptada a la edad del niño.",
    hito: 3,
  },
  {
    id: 4,
    emoji: "🔊",
    titulo: "Síntesis de voz",
    tecnologia: "ElevenLabs / Web Speech API",
    descripcion:
      "El texto de la historia se convierte en audio narrado. El niño puede escuchar su historia con un clic.",
    hito: 3,
  },
];

const RESULTADO_MOCK = {
  interpretacion: "Vi un dragón verde, un castillo entre nubes y una luna brillante.",
  historia:
    "Había una vez un dragón verde llamado Tilo que vivía en un castillo flotante " +
    "entre las nubes. Cada noche, cuando la luna brillaba, Tilo salía a volar y " +
    "repartía sueños bonitos a los niños que dormían abajo. Un día descubrió que " +
    "podía convertir los garabatos de los niños en mundos reales. Desde entonces, " +
    "cada dibujo se convierte en una nueva aventura.",
};

const MILISEGUNDOS_POR_PASO = 800;

export function iniciarPipeline(): void {
  const contenedorPasos = $<HTMLDivElement>("#pipeline-steps");
  const botonEjecutar = $<HTMLButtonElement>("#pipeline-run");
  const progreso = $<HTMLDivElement>("#pipeline-progress");
  const resultado = $<HTMLDivElement>("#pipeline-result");
  const interpretacionEl = $<HTMLParagraphElement>("#pipeline-interpretacion");
  const historiaEl = $<HTMLParagraphElement>("#pipeline-historia");

  const tarjetas: HTMLDivElement[] = [];
  const chips: HTMLSpanElement[] = [];

  for (const paso of PASOS) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "pipelineStep";

    const emoji = document.createElement("div");
    emoji.className = "pipelineEmoji";
    emoji.textContent = paso.emoji;

    const etiqueta = document.createElement("span");
    etiqueta.className = `pipelineBadge ${paso.hito === 1 ? "listo" : "pendiente"}`;
    etiqueta.textContent = paso.hito === 1 ? "✓ HITO 1" : "HITO 3";

    const titulo = document.createElement("h3");
    titulo.textContent = paso.titulo;

    const tecnologia = document.createElement("p");
    tecnologia.className = "pipelineTech";
    tecnologia.textContent = paso.tecnologia;

    const descripcion = document.createElement("p");
    descripcion.className = "pipelineDesc";
    descripcion.textContent = paso.descripcion;

    tarjeta.append(emoji, etiqueta, titulo, tecnologia, descripcion);
    tarjeta.addEventListener("click", () => {
      const yaActiva = tarjeta.classList.contains("activo");
      for (const otra of tarjetas) {
        otra.classList.remove("activo");
      }
      if (!yaActiva) {
        tarjeta.classList.add("activo");
      }
    });
    contenedorPasos.append(tarjeta);
    tarjetas.push(tarjeta);

    const chip = document.createElement("span");
    chip.className = "pipelineChip";
    chip.textContent = paso.titulo;
    progreso.append(chip);
    chips.push(chip);
  }

  botonEjecutar.addEventListener("click", () => {
    botonEjecutar.disabled = true;
    botonEjecutar.textContent = "Procesando...";
    resultado.hidden = true;
    progreso.hidden = false;

    PASOS.forEach((_, indice) => {
      window.setTimeout(() => {
        chips.forEach((chip, otroIndice) => {
          chip.classList.toggle("activo", otroIndice === indice);
        });
      }, indice * MILISEGUNDOS_POR_PASO);
    });

    window.setTimeout(() => {
      progreso.hidden = true;
      for (const chip of chips) {
        chip.classList.remove("activo");
      }
      interpretacionEl.textContent = RESULTADO_MOCK.interpretacion;
      historiaEl.textContent = RESULTADO_MOCK.historia;
      resultado.hidden = false;
      botonEjecutar.disabled = false;
      botonEjecutar.textContent = "▶ Ejecutar pipeline";
    }, PASOS.length * MILISEGUNDOS_POR_PASO);
  });
}
