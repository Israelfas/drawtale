"use client";
import { useState } from "react";

const preguntas = [
  {
    pregunta: "¿Para qué edad es DrawTale Edu?",
    respuesta: "Para niños de 7 a 10 años. El diseño y el contenido están adaptados a esa etapa de desarrollo cognitivo y creativo."
  },
  {
    pregunta: "¿Necesita conexión a internet?",
    respuesta: "Sí, la generación de cuentos y ejercicios requiere conexión. Estamos explorando un modo offline para versiones futuras."
  },
  {
    pregunta: "¿Es seguro para niños?",
    respuesta: "Sí. No hay publicidad, no se comparten datos con terceros y los padres tienen control total del contenido generado."
  },
  {
    pregunta: "¿En qué dispositivos funciona?",
    respuesta: "En cualquier dispositivo con navegador: tablet, computador o celular. Recomendamos tablet para mejor experiencia de dibujo."
  },
  {
    pregunta: "¿Tiene costo?",
    respuesta: "Estamos en fase de validación. Los primeros usuarios que se registren tendrán acceso gratuito al lanzamiento."
  },
];

export default function FAQ() {
  const [abierto, setAbierto] = useState(null);

  return (
    <section style={{
      padding: '80px 24px',
      background: '#f8fafc',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          color: '#6C47FF',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          display: 'block',
          marginBottom: '12px',
        }}>
          Preguntas frecuentes
        </span>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: '800',
          marginBottom: '48px',
          color: '#0f172a',
          lineHeight: 1.1,
        }}>
          Todo lo que necesitas saber
        </h2>

        {preguntas.map((item, index) => (
          <div
            key={index}
            style={{
              borderRadius: '12px',
              marginBottom: '8px',
              background: abierto === index ? '#ffffff' : '#ffffff',
              border: abierto === index
                ? '1px solid #6C47FF'
                : '1px solid #e2e8f0',
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
          >
            <button
              onClick={() => setAbierto(abierto === index ? null : index)}
              style={{
                width: '100%',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '700',
                color: abierto === index ? '#6C47FF' : '#0f172a',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'color 0.2s',
              }}
            >
              {item.pregunta}
              <span style={{
                fontSize: '20px',
                color: '#6C47FF',
                flexShrink: 0,
                marginLeft: '16px',
                fontWeight: '300',
                transition: 'transform 0.2s',
                transform: abierto === index ? 'rotate(45deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}>
                +
              </span>
            </button>
            {abierto === index && (
              <p style={{
                padding: '0 24px 20px',
                color: '#475569',
                fontSize: '15px',
                lineHeight: '1.7',
                margin: 0,
              }}>
                {item.respuesta}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}