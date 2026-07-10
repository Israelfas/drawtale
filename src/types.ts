// Tipos compartidos por los módulos de la landing.

export interface Actividad {
  label: string;
  detail: string;
}

export interface PreguntaFaq {
  pregunta: string;
  respuesta: string;
}

export interface Wireframe {
  titulo: string;
  descripcion: string;
  emoji: string;
  color: string;
  bg: string;
}

export interface Interesado {
  nombre: string;
  email: string;
  fecha: string;
}

export interface RecordMatematicas {
  mejorPuntaje: number;
  fecha: string;
}

// ===== Bloque 3 — Inglés (portado desde el módulo Angular) =====

/** Actividad del módulo de inglés (mismo shape que ActividadEducativa de Angular). */
export interface ActividadIngles {
  id: string;
  titulo: string;
  descripcion: string;
  nivel: "Basico" | "Intermedio" | "Avanzado";
  puntos: number;
  objetivo: string;
}

/** Una palabra de vocabulario asociada a un tema (mismo "titulo" que la actividad). */
export interface TemaVocabulario {
  tema: string;
  palabra: string; // en inglés
  traduccion: string; // en español
  emoji: string;
}

/** Una pregunta del quiz con sus opciones y la respuesta correcta. */
export interface PreguntaQuizIngles {
  pregunta: string;
  opciones: string[];
  correcta: string;
}

/** Progreso de una actividad puntual: si ya se practicó y cuántos intentos. */
export interface ProgresoActividadIngles {
  practicada: boolean;
  intentos: number;
}

/** Estado global de progreso del módulo, persistido en localStorage. */
export type ProgresoIngles = Record<string, ProgresoActividadIngles>;
