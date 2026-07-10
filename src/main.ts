// Punto de entrada de la landing Drawtale Edu (Hito 2 — TypeScript + Vite).

import "./style.css";
import { iniciarMatematicas } from "./modules/matematicas";
import { iniciarLengua } from "./modules/lengua";
import { iniciarIngles } from "./modules/ingles";
import { iniciarPipeline } from "./modules/pipeline";
import { iniciarGaleria } from "./modules/galeria";
import { iniciarFaq } from "./modules/faq";
import { iniciarFormulario } from "./modules/formulario";

async function iniciar(): Promise<void> {
  iniciarLengua();
  iniciarPipeline();
  iniciarFormulario();
  await Promise.all([iniciarMatematicas(), iniciarIngles(), iniciarGaleria(), iniciarFaq()]);
}

void iniciar();
