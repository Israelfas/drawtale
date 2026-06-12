// Galería de wireframes navegable: los datos se cargan desde un JSON tipado.

import { $, cargarJson } from "../dom";
import type { Wireframe } from "../types";

export async function iniciarGaleria(): Promise<void> {
  const wireframes = await cargarJson<Wireframe[]>("/data/wireframes.json");
  if (wireframes.length === 0) return;

  const preview = $<HTMLDivElement>("#galeria-preview");
  const emoji = $<HTMLDivElement>("#galeria-emoji");
  const badge = $<HTMLSpanElement>("#galeria-badge");
  const titulo = $<HTMLHeadingElement>("#galeria-titulo");
  const descripcion = $<HTMLParagraphElement>("#galeria-desc");
  const botonAnterior = $<HTMLButtonElement>("#galeria-prev");
  const botonSiguiente = $<HTMLButtonElement>("#galeria-next");
  const contenedorPuntos = $<HTMLDivElement>("#galeria-dots");

  let actual = 0;

  const puntos: HTMLButtonElement[] = wireframes.map((_, indice) => {
    const punto = document.createElement("button");
    punto.type = "button";
    punto.className = "galeriaDot";
    punto.setAttribute("aria-label", `Ir a la pantalla ${indice + 1}`);
    punto.addEventListener("click", () => {
      actual = indice;
      renderizar();
    });
    contenedorPuntos.append(punto);
    return punto;
  });

  function renderizar(): void {
    const item = wireframes[actual];
    if (!item) return;
    preview.style.background = item.bg;
    preview.style.borderColor = `${item.color}40`;
    emoji.textContent = item.emoji;
    badge.textContent = `PANTALLA ${actual + 1} DE ${wireframes.length}`;
    badge.style.color = item.color;
    titulo.textContent = item.titulo;
    descripcion.textContent = item.descripcion;
    botonSiguiente.style.background = item.color;
    botonAnterior.style.color = item.color;
    botonAnterior.style.borderColor = item.color;
    puntos.forEach((punto, indice) => {
      punto.classList.toggle("activo", indice === actual);
      punto.style.background = indice === actual ? item.color : "";
    });
  }

  botonAnterior.addEventListener("click", () => {
    actual = actual === 0 ? wireframes.length - 1 : actual - 1;
    renderizar();
  });

  botonSiguiente.addEventListener("click", () => {
    actual = actual === wireframes.length - 1 ? 0 : actual + 1;
    renderizar();
  });

  renderizar();
}
