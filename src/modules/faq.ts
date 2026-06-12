// FAQ con acordeones accesibles: preguntas cargadas desde un JSON tipado.

import { $, cargarJson } from "../dom";
import type { PreguntaFaq } from "../types";

export async function iniciarFaq(): Promise<void> {
  const lista = $<HTMLDivElement>("#faq-list");
  const preguntas = await cargarJson<PreguntaFaq[]>("/data/faq.json");

  preguntas.forEach((item, indice) => {
    const idRespuesta = `faq-respuesta-${indice}`;

    const articulo = document.createElement("article");
    articulo.className = "faqItem";

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "faqQuestion";
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", idRespuesta);

    const texto = document.createElement("span");
    texto.textContent = item.pregunta;

    const icono = document.createElement("span");
    icono.className = "faqIcon";
    icono.setAttribute("aria-hidden", "true");
    icono.textContent = "+";

    boton.append(texto, icono);

    const respuesta = document.createElement("p");
    respuesta.id = idRespuesta;
    respuesta.className = "faqAnswer";
    respuesta.textContent = item.respuesta;
    respuesta.hidden = true;

    boton.addEventListener("click", () => {
      const abierta = !respuesta.hidden;
      respuesta.hidden = abierta;
      boton.setAttribute("aria-expanded", String(!abierta));
      icono.textContent = abierta ? "+" : "−";
    });

    articulo.append(boton, respuesta);
    lista.append(articulo);
  });
}
