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
