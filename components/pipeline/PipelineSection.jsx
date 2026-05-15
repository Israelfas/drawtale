"use client";
import { useState } from "react";

const PIPELINE_STEPS = [
  {
    id: 1,
    emoji: "🎨",
    title: "Canvas input",
    tech: "HTML5 Canvas API",
    description: "El niño dibuja libremente. El canvas captura la imagen y la convierte en base64 PNG lista para enviar al pipeline.",
    hito: 1,
  },
  {
    id: 2,
    emoji: "👁️",
    title: "Modelo de visión",
    tech: "Claude Vision / GPT-4V",
    description: "Un modelo de visión analiza el dibujo e identifica formas, colores y objetos. Devuelve una descripción semántica en texto.",
    hito: 3,
  },
  {
    id: 3,
    emoji: "✍️",
    title: "Generación narrativa",
    tech: "Claude 3 / GPT-4",
    description: "Un LLM recibe la descripción y genera una historia infantil de 200 palabras adaptada a la edad del niño.",
    hito: 3,
  },
  {
    id: 4,
    emoji: "🔊",
    title: "Síntesis de voz",
    tech: "ElevenLabs / Web Speech API",
    description: "El texto de la historia se convierte en audio narrado. El niño puede escuchar su historia con un clic.",
    hito: 3,
  },
];

const MOCK_RESULT = {
  interpretation: "Vi un dragón verde, un castillo entre nubes y una luna brillante.",
  story: `Había una vez un dragón verde llamado Tilo que vivía en un castillo flotante 
entre las nubes. Cada noche, cuando la luna brillaba, Tilo salía a volar 
y repartía sueños bonitos a los niños que dormían abajo. Un día descubrió 
que podía convertir los garabatos de los niños en mundos reales. Desde entonces, 
cada dibujo se convierte en una nueva aventura.`,
};

export default function PipelineSection() {
  const [activeStep, setActiveStep] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  function runMockPipeline() {
    setProcessing(true);
    setResult(null);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 800);
    setTimeout(() => setActiveStep(3), 1600);
    setTimeout(() => setActiveStep(4), 2400);
    setTimeout(() => {
      setActiveStep(null);
      setProcessing(false);
      setResult(MOCK_RESULT);
    }, 3200);
  }

  return (
    <section style={{
      padding: "72px 24px",
      maxWidth: "1180px",
      margin: "0 auto",
    }}>

      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <span style={{
          display: "inline-block",
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(108,71,255,0.3)",
          color: "#6C47FF",
          fontSize: "13px",
          fontWeight: "700",
          marginBottom: "16px",
        }}>
          Módulo 2 — Israel
        </span>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", marginBottom: "16px", lineHeight: 1.1 }}>
          Pipeline de Inteligencia Artificial
        </h2>
        <p style={{ fontSize: "18px", color: "#4b5c54", maxWidth: "640px", lineHeight: 1.7 }}>
          El dibujo del niño recorre 4 etapas automáticas: visión, interpretación,
          narrativa y síntesis de voz. Aquí se muestra cómo funciona cada una.
        </p>
      </div>

      {/* Pasos del pipeline */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "16px",
        marginBottom: "48px",
      }}>
        {PIPELINE_STEPS.map((step, index) => (
          <div key={step.id} style={{ display: "flex", alignItems: "stretch", gap: "8px" }}>
            <div
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              style={{
                flex: 1,
                padding: "24px",
                borderRadius: "12px",
                border: activeStep === step.id
                  ? "2px solid #6C47FF"
                  : "1px solid rgba(23,33,28,0.11)",
                background: activeStep === step.id ? "#faf8ff" : "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>{step.emoji}</div>
              <div style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: "700",
                color: step.hito === 1 ? "#2f7d68" : "#888",
                background: step.hito === 1 ? "#e6f4f0" : "#f5f5f5",
                padding: "3px 8px",
                borderRadius: "999px",
                marginBottom: "10px",
              }}>
                {step.hito === 1 ? "✓ Hito 1" : "Hito 3"}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#6C47FF", fontWeight: "600", marginBottom: "8px" }}>
                {step.tech}
              </p>
              <p style={{ fontSize: "14px", color: "#4b5c54", lineHeight: 1.6 }}>
                {step.description}
              </p>
            </div>
            {index < PIPELINE_STEPS.length - 1 && (
              <div style={{
                display: "flex",
                alignItems: "center",
                color: "#ccc",
                fontSize: "24px",
                flexShrink: 0,
              }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Demo mock */}
      <div style={{
        padding: "32px",
        borderRadius: "12px",
        border: "1px solid rgba(108,71,255,0.2)",
        background: "#faf8ff",
        marginBottom: "48px",
      }}>
        <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>
          Demo del pipeline — Hito 1
        </h3>
        <p style={{ color: "#4b5c54", marginBottom: "24px", fontSize: "15px" }}>
          Simulación del flujo completo. En el Hito 3 esto estará conectado a modelos reales.
        </p>

        <button
          onClick={runMockPipeline}
          disabled={processing}
          style={{
            padding: "12px 28px",
            borderRadius: "8px",
            border: "none",
            background: processing ? "#ccc" : "#6C47FF",
            color: "white",
            fontSize: "16px",
            fontWeight: "700",
            cursor: processing ? "not-allowed" : "pointer",
            marginBottom: "24px",
          }}
        >
          {processing ? "Procesando..." : "▶ Ejecutar pipeline"}
        </button>

        {/* Barra de progreso */}
        {processing && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {PIPELINE_STEPS.map((step) => (
              <div key={step.id} style={{
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "700",
                background: activeStep === step.id ? "#6C47FF" : "#e8e4ff",
                color: activeStep === step.id ? "white" : "#6C47FF",
                transition: "all 0.3s",
              }}>
                {activeStep === step.id ? "⟳ " : ""}{step.title}
              </div>
            ))}
          </div>
        )}

        {/* Resultado mock */}
        {result && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}>
            <div style={{
              padding: "20px",
              borderRadius: "8px",
              background: "#f0fdf8",
              border: "1px solid #a7f0d8",
            }}>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#2f7d68", marginBottom: "8px" }}>
                👁️ INTERPRETACIÓN DEL DIBUJO
              </p>
              <p style={{ fontSize: "15px", color: "#17211c", lineHeight: 1.6 }}>
                {result.interpretation}
              </p>
            </div>
            <div style={{
              padding: "20px",
              borderRadius: "8px",
              background: "#f5f3ff",
              border: "1px solid #c4b5fd",
            }}>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#6C47FF", marginBottom: "8px" }}>
                ✍️ HISTORIA GENERADA
              </p>
              <p style={{ fontSize: "14px", color: "#17211c", lineHeight: 1.7 }}>
                {result.story}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stack técnico */}
      <div>
        <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
          Stack técnico del módulo
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Next.js API Routes", "Anthropic SDK", "OpenAI SDK", "ElevenLabs", "Web Speech API", "Vercel"].map((tech) => (
            <span key={tech} style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "#f0edff",
              color: "#6C47FF",
              fontSize: "14px",
              fontWeight: "600",
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}