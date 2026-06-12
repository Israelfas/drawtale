// Punto de entrada de la landing Drawtale Edu (Hito 2 — TypeScript + Vite).

import "./style.css";
import { iniciarLengua } from "./modules/lengua";
import { iniciarIngles } from "./modules/ingles";
import { iniciarGaleria } from "./modules/galeria";
import { iniciarFaq } from "./modules/faq";
import { iniciarFormulario } from "./modules/formulario";

async function iniciar(): Promise<void> {
  iniciarLengua();
  iniciarIngles();
  iniciarFormulario();
  await Promise.all([iniciarGaleria(), iniciarFaq()]);
}

void iniciar();
