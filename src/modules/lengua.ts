// Bloque 2 — Lengua con IA
// Flujo: subir dibujo → Claude Vision genera cuento + pregunta → niño responde

import { $ } from "../dom";
import { guardarStorage, leerStorage } from "../storage";

const CLAVE_RESPUESTA = "drawtale-respuesta-lectura";

const PROMPT = `Eres un maestro de primaria. Analiza este dibujo hecho por un niño de 7-10 años \
y responde SOLO con JSON válido, sin markdown ni texto extra, con esta estructura exacta:
{
  "cuento": "Un cuento corto de 80-100 palabras inspirado en lo que ves en el dibujo. Usa presente. Incluye un personaje con nombre.",
  "pregunta": "Una pregunta de comprensión lectora sobre el cuento, dirigida al niño."
}`;

async function llamarClaude(b64: string, mediaType: string): Promise<{ cuento: string; pregunta: string }> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: b64 } },
          { type: "text", text: PROMPT }
        ]
      }]
    })
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);

  const data = await res.json();
  const raw = (data.content as Array<{ type: string; text?: string }>)
    .find(b => b.type === "text")?.text ?? "";

  return JSON.parse(raw.replace(/```json|```/g, "").trim()) as { cuento: string; pregunta: string };
}

function setStep(n: 1 | 2 | 3): void {
  (["#step-1", "#step-2", "#step-3"] as const).forEach((sel, i) => {
    const el = $<HTMLElement>(sel);
    el.dataset.state = i + 1 < n ? "done" : i + 1 === n ? "active" : "idle";
  });
}

export function iniciarLengua(): void {
  const inputDibujo   = $<HTMLInputElement>("#drawing-input");
  const uploadArea    = $<HTMLElement>("#upload-area");
  const thumb         = $<HTMLImageElement>("#drawing-preview");
  const placeholder   = $<HTMLElement>("#drawing-placeholder");
  const btnGenerar    = $<HTMLButtonElement>("#btn-generar");
  const loader        = $<HTMLElement>("#story-loader");
  const loaderMsg     = $<HTMLElement>("#loader-msg");
  const storyEmpty    = $<HTMLElement>("#story-empty");
  const resultArea    = $<HTMLElement>("#story-result");
  const cuentoEl      = $<HTMLParagraphElement>("#story-text");
  const preguntaEl    = $<HTMLParagraphElement>("#story-question");
  const respuesta     = $<HTMLTextAreaElement>("#story-answer");
  const avisoGuardado = $<HTMLParagraphElement>("#story-saved");

  let b64: string | null = null;
  let mediaType = "image/jpeg";

  // Restaurar respuesta previa
  respuesta.value = leerStorage<string>(CLAVE_RESPUESTA, "");

  inputDibujo.addEventListener("change", () => {
    const archivo = inputDibujo.files?.[0];
    if (!archivo) return;

    mediaType = archivo.type;
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      b64 = result.split(",")[1] ?? "";
      thumb.src = result;
      thumb.hidden = false;
      placeholder.hidden = true;
      uploadArea.dataset.loaded = "true";
      btnGenerar.disabled = false;
    };
    reader.readAsDataURL(archivo);
  });

  const loaderMsgs = ["Analizando el dibujo…", "Creando personajes…", "Escribiendo el cuento…"];
  let loaderInterval: ReturnType<typeof setInterval>;

  btnGenerar.addEventListener("click", async () => {
    if (!b64) return;

    setStep(2);
    btnGenerar.disabled = true;
    storyEmpty.hidden = true;
    resultArea.hidden = true;
    loader.hidden = false;

    let mi = 0;
    loaderMsg.textContent = loaderMsgs[0] ?? "";
    loaderInterval = setInterval(() => {
      loaderMsg.textContent = loaderMsgs[++mi % loaderMsgs.length] ?? "";
    }, 1800);

    try {
      const { cuento, pregunta } = await llamarClaude(b64, mediaType);

      clearInterval(loaderInterval);
      loader.hidden = true;

      cuentoEl.textContent = cuento;
      preguntaEl.textContent = pregunta;
      resultArea.hidden = false;
      setStep(3);

    } catch (err) {
      clearInterval(loaderInterval);
      loader.hidden = true;
      storyEmpty.hidden = false;
      storyEmpty.textContent = err instanceof Error ? err.message : "Error inesperado";
      btnGenerar.disabled = false;
      setStep(1);
    }
  });

  respuesta.addEventListener("input", () => {
    guardarStorage(CLAVE_RESPUESTA, respuesta.value);
    avisoGuardado.textContent = respuesta.value.trim() ? "Guardado ✓" : "";
  });
}