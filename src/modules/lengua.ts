// Bloque 2 — Lengua con IA: vista previa del dibujo subido, cuento generado
// y respuesta de comprensión lectora guardada en localStorage.

import { $ } from "../dom";
import { guardarStorage, leerStorage } from "../storage";

const CLAVE_RESPUESTA = "drawtale-respuesta-lectura";

function generarCuento(nombreDibujo: string | null): string {
  const sujeto = nombreDibujo ? "tu dibujo" : "un dibujo misterioso";
  return (
    `En ${sujeto}, una pequeña exploradora llamada Lila encuentra una puerta ` +
    `brillante escondida entre formas y colores. Al abrirla, descubre un valle ` +
    `donde las nubes guardan mapas, las flores cuentan chistes y cada estrella ` +
    `aprende una palabra nueva antes de dormir. Lila nota que algo falta: el río ` +
    `de ideas se ha quedado quieto. Entonces usa tres pistas del dibujo para ` +
    `inventar una solución: un camino, un amigo y una luz. Con paciencia, combina ` +
    `las formas, escucha al viento y descubre que el río vuelve a moverse cuando ` +
    `alguien comparte una historia. Desde ese día, cada vez que Lila dibuja, el ` +
    `valle despierta con una aventura distinta.`
  );
}

export function iniciarLengua(): void {
  const inputDibujo = $<HTMLInputElement>("#drawing-input");
  const vistaPrevia = $<HTMLImageElement>("#drawing-preview");
  const placeholder = $<HTMLDivElement>("#drawing-placeholder");
  const nombreEl = $<HTMLHeadingElement>("#drawing-name");
  const cuentoEl = $<HTMLParagraphElement>("#story-text");
  const respuesta = $<HTMLTextAreaElement>("#story-answer");
  const avisoGuardado = $<HTMLParagraphElement>("#story-saved");

  cuentoEl.textContent = generarCuento(null);

  inputDibujo.addEventListener("change", () => {
    const archivo = inputDibujo.files?.[0];
    if (!archivo) {
      vistaPrevia.hidden = true;
      placeholder.hidden = false;
      nombreEl.textContent = "Dibujo sin subir todavía";
      cuentoEl.textContent = generarCuento(null);
      return;
    }
    vistaPrevia.src = URL.createObjectURL(archivo);
    vistaPrevia.hidden = false;
    placeholder.hidden = true;
    nombreEl.textContent = archivo.name;
    cuentoEl.textContent = generarCuento(archivo.name);
  });

  // La respuesta de comprensión lectora persiste entre visitas.
  respuesta.value = leerStorage<string>(CLAVE_RESPUESTA, "");

  respuesta.addEventListener("input", () => {
    guardarStorage(CLAVE_RESPUESTA, respuesta.value);
    avisoGuardado.textContent = respuesta.value.trim()
      ? "Respuesta guardada ✓"
      : "";
  });
}
