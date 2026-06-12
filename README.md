# DrawTale Edu — Hito 2

Landing interactiva del proyecto autónomo de IS-403 (Aplicaciones para el Cliente Web).
Construida en **TypeScript + Vite**, con módulos ES6, datos en JSON y persistencia en localStorage.

## Equipo (Grupo D)

| Integrante | Módulo / sección |
|---|---|
| Robert García | Bloque 1 — Matemáticas (reto con temporizador, validación y puntaje persistido) |
| Marcelo Mejía | Bloque 2 — Lengua con IA, formulario de interés, FAQ y galería |
| Luis Mario Cedeño | Bloque 3 — Inglés / Mundo |

## Cómo correr el proyecto

```bash
npm install
npm run dev      # levanta el servidor local de Vite
npm run build    # compila TypeScript en modo strict + build de producción
npm run preview  # sirve el build de producción
```

## Estructura

```
index.html              Markup completo de la landing
public/data/*.json      Datos tipados que se cargan vía fetch
src/main.ts             Punto de entrada: inicializa todos los módulos
src/types.ts            Interfaces compartidas
src/dom.ts              Helpers tipados de DOM y fetch de JSON
src/storage.ts          Lectura/escritura tipada de localStorage (JSON)
src/modules/*.ts        Un módulo ES6 por sección de la landing
```

## Interactividad por sección

- **Matemáticas**: reto contra reloj (90 s) con preguntas aleatorias, validación
  del input en tiempo real, puntaje en vivo y mejor puntaje guardado en localStorage.
- **Lengua con IA**: subida de dibujo con vista previa, cuento generado y respuesta
  de comprensión lectora persistida.
- **Inglés**: vocabulario por temas y quiz con feedback inmediato.
- **Galería**: wireframes navegables cargados desde `wireframes.json`.
- **FAQ**: acordeones accesibles cargados desde `faq.json`.
- **Formulario de interés**: validación en tiempo real de nombre y email, registro
  de interesados en localStorage y contador de registrados.
