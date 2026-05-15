export const MOCK_STORIES = {
  default: {
    interpretation: "Vi un dragón verde, un castillo en las nubes y una luna brillante.",
    story: `Había una vez un dragón verde llamado Tilo que vivía en un castillo 
            flotante entre las nubes. Cada noche, cuando la luna brillaba, Tilo 
            salía a volar y repartía sueños bonitos a los niños que dormían abajo.`,
    audioEnabled: false,
  }
}

export function getMockResponse(drawingDescription = "dibujo libre") {
  return {
    ...MOCK_STORIES.default,
    timestamp: new Date().toISOString(),
    processingSteps: [
      "Imagen capturada del canvas",
      "Modelo de visión analiza el dibujo",
      "LLM genera la historia",
      "Motor TTS sintetiza la narración",
    ]
  }
}