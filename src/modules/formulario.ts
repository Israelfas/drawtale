// Formulario de interés: validación en tiempo real y registro de interesados
// persistido en localStorage como JSON.

import { $ } from "../dom";
import { guardarStorage, leerStorage } from "../storage";
import type { Interesado } from "../types";

const CLAVE_INTERESADOS = "drawtale-interesados";
const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarNombre(valor: string): string {
  if (valor.trim() === "") {
    return "Escribe tu nombre.";
  }
  if (valor.trim().length < 2) {
    return "El nombre es demasiado corto.";
  }
  return "";
}

function validarEmail(valor: string): string {
  if (valor.trim() === "") {
    return "Escribe tu email.";
  }
  if (!EMAIL_VALIDO.test(valor.trim())) {
    return "Ese email no parece válido (ej.: nombre@correo.com).";
  }
  return "";
}

export function iniciarFormulario(): void {
  const formulario = $<HTMLFormElement>("#interes-form");
  const inputNombre = $<HTMLInputElement>("#interes-nombre");
  const inputEmail = $<HTMLInputElement>("#interes-email");
  const errorNombre = $<HTMLParagraphElement>("#error-nombre");
  const errorEmail = $<HTMLParagraphElement>("#error-email");
  const mensaje = $<HTMLParagraphElement>("#interes-mensaje");
  const contador = $<HTMLParagraphElement>("#interes-contador");

  function actualizarContador(): void {
    const interesados = leerStorage<Interesado[]>(CLAVE_INTERESADOS, []);
    contador.textContent =
      interesados.length > 0
        ? `${interesados.length} persona${interesados.length === 1 ? "" : "s"} ya se registraron`
        : "";
  }

  function pintarCampo(
    input: HTMLInputElement,
    errorEl: HTMLParagraphElement,
    error: string,
  ): void {
    errorEl.textContent = error;
    input.classList.toggle("error", error !== "" && input.value !== "");
    input.classList.toggle("ok", error === "");
  }

  // Validación en tiempo real mientras la persona escribe.
  inputNombre.addEventListener("input", () => {
    pintarCampo(inputNombre, errorNombre, validarNombre(inputNombre.value));
  });

  inputEmail.addEventListener("input", () => {
    pintarCampo(inputEmail, errorEmail, validarEmail(inputEmail.value));
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const errNombre = validarNombre(inputNombre.value);
    const errEmail = validarEmail(inputEmail.value);
    pintarCampo(inputNombre, errorNombre, errNombre);
    pintarCampo(inputEmail, errorEmail, errEmail);

    if (errNombre !== "" || errEmail !== "") {
      mensaje.textContent = "Revisa los campos marcados antes de enviar.";
      mensaje.className = "interesMensaje error";
      return;
    }

    const interesados = leerStorage<Interesado[]>(CLAVE_INTERESADOS, []);
    interesados.push({
      nombre: inputNombre.value.trim(),
      email: inputEmail.value.trim(),
      fecha: new Date().toISOString(),
    });
    guardarStorage(CLAVE_INTERESADOS, interesados);

    mensaje.textContent = `¡Gracias ${inputNombre.value.trim()}! Te avisamos cuando DrawTale Edu esté listo.`;
    mensaje.className = "interesMensaje ok";
    formulario.reset();
    inputNombre.classList.remove("ok", "error");
    inputEmail.classList.remove("ok", "error");
    actualizarContador();
  });

  actualizarContador();
}
