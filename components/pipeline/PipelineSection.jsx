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
  story: `Había una vez un dragón verde llamado Tilo que vivía en un castillo flotante entre las nubes. Cada noche, cuando la luna brillaba, Tilo salía a volar y repartía sueños bonitos a los niños que dormían abajo. Un día descubrió que podía convertir los garabatos de los niños en mundos reales. Desde entonces, cada dibujo se convierte en una nueva aventura.`,
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
      padding: '80px 24px',
      background: '#0f172a',
      color: '#f8fafc',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(108,71,255,0.5)',
            color: '#a78bfa',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '20px',
            letterSpacing: '0.05em',
          }}>
            PIPELINE DE INTELIGENCIA ARTIFICIAL
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            marginBottom: '16px',
            lineHeight: 1.1,
            color: '#f8fafc',
          }}>
            Del dibujo a la historia
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            maxWidth: '580px',
            lineHeight: 1.7,
          }}>
            El dibujo del niño recorre 4 etapas automáticas: visión, interpretación,
            narrativa y síntesis de voz.
          </p>
        </div>

        {/* Pasos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {PIPELINE_STEPS.map((step) => (
            <div
              key={step.id}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: activeStep === step.id
                  ? '2px solid #7c3aed'
                  : '1px solid rgba(255,255,255,0.08)',
                background: activeStep === step.id
                  ? 'rgba(124,58,237,0.15)'
                  : 'rgba(255,255,255,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{step.emoji}</div>
              <span style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: '700',
                color: step.hito === 1 ? '#34d399' : '#94a3b8',
                background: step.hito === 1 ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.06)',
                padding: '3px 10px',
                borderRadius: '999px',
                marginBottom: '12px',
                letterSpacing: '0.05em',
              }}>
                {step.hito === 1 ? '✓ HITO 1' : 'HITO 3'}
              </span>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '8px',
                color: '#f1f5f9',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#7c3aed',
                fontWeight: '600',
                marginBottom: '10px',
              }}>
                {step.tech}
              </p>
              <p style={{
                fontSize: '14px',
                color: '#94a3b8',
                lineHeight: 1.6,
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Demo */}
        <div style={{
          padding: '36px',
          borderRadius: '16px',
          border: '1px solid rgba(124,58,237,0.3)',
          background: 'rgba(124,58,237,0.06)',
          marginBottom: '40px',
        }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: '700',
            marginBottom: '8px',
            color: '#f1f5f9',
          }}>
            Demo del pipeline
          </h3>
          <p style={{
            color: '#94a3b8',
            marginBottom: '28px',
            fontSize: '15px',
          }}>
            Simulación del flujo completo. En el Hito 3 estará conectado a modelos reales.
          </p>

          <button
            onClick={runMockPipeline}
            disabled={processing}
            style={{
              padding: '12px 32px',
              borderRadius: '10px',
              border: 'none',
              background: processing ? '#374151' : '#7c3aed',
              color: 'white',
              fontSize: '16px',
              fontWeight: '700',
              cursor: processing ? 'not-allowed' : 'pointer',
              marginBottom: '28px',
              transition: 'background 0.2s',
            }}
          >
            {processing ? 'Procesando...' : '▶ Ejecutar pipeline'}
          </button>

          {processing && (
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}>
              {PIPELINE_STEPS.map((step) => (
                <div key={step.id} style={{
                  padding: '8px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  background: activeStep === step.id ? '#7c3aed' : 'rgba(255,255,255,0.06)',
                  color: activeStep === step.id ? 'white' : '#94a3b8',
                  transition: 'all 0.3s',
                }}>
                  {activeStep === step.id ? '⟳ ' : ''}{step.title}
                </div>
              ))}
            </div>
          )}

          {result && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              <div style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.2)',
              }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#34d399',
                  marginBottom: '10px',
                  letterSpacing: '0.05em',
                }}>
                  👁️ INTERPRETACIÓN
                </p>
                <p style={{ fontSize: '15px', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {result.interpretation}
                </p>
              </div>
              <div style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(124,58,237,0.1)',
                border: '1px solid rgba(124,58,237,0.3)',
              }}>
                <p style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#a78bfa',
                  marginBottom: '10px',
                  letterSpacing: '0.05em',
                }}>
                  ✍️ HISTORIA GENERADA
                </p>
                <p style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: 1.7 }}>
                  {result.story}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stack */}
        <div>
          <p style={{
            fontSize: '13px',
            fontWeight: '700',
            color: '#64748b',
            marginBottom: '14px',
            letterSpacing: '0.05em',
          }}>
            STACK TÉCNICO
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Next.js API Routes', 'Anthropic SDK', 'OpenAI SDK', 'ElevenLabs', 'Web Speech API', 'Vercel'].map((tech) => (
              <span key={tech} style={{
                padding: '8px 18px',
                borderRadius: '8px',
                background: 'rgba(124,58,237,0.12)',
                color: '#a78bfa',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid rgba(124,58,237,0.2)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}