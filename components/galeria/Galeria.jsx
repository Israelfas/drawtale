"use client";
import { useState } from "react";

const wireframes = [
  {
    titulo: "Pantalla de Inicio",
    descripcion: "El padre o el niño elige el bloque: Lengua, Matemáticas o Inglés. Diseño simple, un botón por bloque.",
    emoji: "🏠",
    color: "#6C47FF",
    bg: "rgba(108,71,255,0.08)",
  },
  {
    titulo: "Canvas de dibujo",
    descripcion: "Área de dibujo libre con paleta de colores, borrador y botón para generar la historia. Sin instrucciones complicadas.",
    emoji: "🎨",
    color: "#2f7d68",
    bg: "rgba(47,125,104,0.08)",
  },
  {
    titulo: "Cuento generado",
    descripcion: "La IA genera un cuento desde el dibujo. El niño puede leerlo o escucharlo narrado con un clic.",
    emoji: "📖",
    color: "#b85627",
    bg: "rgba(184,86,39,0.08)",
  },
  {
    titulo: "Ejercicio de Matemáticas",
    descripcion: "Ejercicio de suma, resta o multiplicación generado desde los elementos del dibujo del niño.",
    emoji: "➕",
    color: "#0ea5e9",
    bg: "rgba(14,165,233,0.08)",
  },
  {
    titulo: "Vocabulario en Inglés",
    descripcion: "Palabras en inglés identificadas desde el dibujo, con pronunciación y ejemplo en una frase simple.",
    emoji: "🔤",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
];

export default function Galeria() {
  const [actual, setActual] = useState(0);

  function anterior() {
    setActual(actual === 0 ? wireframes.length - 1 : actual - 1);
  }

  function siguiente() {
    setActual(actual === wireframes.length - 1 ? 0 : actual + 1);
  }

  const item = wireframes[actual];

  return (
    <section style={{
      padding: '80px 24px',
      background: '#ffffff',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ marginBottom: '48px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#6C47FF',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: '12px',
          }}>
            Wireframes del producto
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: '800',
            lineHeight: 1.1,
            color: '#0f172a',
          }}>
            Así se verá DrawTale Edu
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'center',
        }}>

          {/* Panel izquierdo — preview */}
          <div style={{
            background: item.bg,
            border: `2px solid ${item.color}22`,
            borderRadius: '24px',
            padding: '60px 40px',
            textAlign: 'center',
            minHeight: '340px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
          }}>
            <div style={{ fontSize: '80px', marginBottom: '24px' }}>
              {item.emoji}
            </div>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              color: item.color,
              background: `${item.color}15`,
              padding: '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.05em',
            }}>
              PANTALLA {actual + 1} DE {wireframes.length}
            </span>
          </div>

          {/* Panel derecho — info */}
          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              marginBottom: '16px',
              color: '#0f172a',
            }}>
              {item.titulo}
            </h3>
            <p style={{
              color: '#4b5c54',
              fontSize: '17px',
              lineHeight: 1.7,
              marginBottom: '40px',
            }}>
              {item.descripcion}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
              <button
                onClick={anterior}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: `1px solid ${item.color}`,
                  background: 'white',
                  color: item.color,
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ← Anterior
              </button>
              <button
                onClick={siguiente}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  background: item.color,
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Siguiente →
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {wireframes.map((w, i) => (
                <button
                  key={i}
                  onClick={() => setActual(i)}
                  style={{
                    width: i === actual ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '999px',
                    border: 'none',
                    background: i === actual ? item.color : '#e2e8f0',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}