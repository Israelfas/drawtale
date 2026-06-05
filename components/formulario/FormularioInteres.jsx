"use client";
import { useState, useEffect } from "react";

export default function FormularioInteres() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [emailValido, setEmailValido] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const interesados = JSON.parse(localStorage.getItem('interesados') || '[]');
    setContador(interesados.length);
  }, []);

  function handleEmailChange(e) {
    const val = e.target.value;
    setEmail(val);
    setEmailValido(val.includes('@') && val.includes('.'));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim() || !emailValido) {
      setMensaje("Por favor completa todos los campos correctamente.");
      return;
    }
    const interesados = JSON.parse(localStorage.getItem('interesados') || '[]');
    interesados.push({ nombre, email, fecha: new Date().toISOString() });
    localStorage.setItem('interesados', JSON.stringify(interesados));
    setContador(interesados.length);
    setMensaje(`¡Gracias ${nombre}! Te avisamos cuando DrawTale Edu esté listo.`);
    setNombre("");
    setEmail("");
    setEmailValido(null);
  }

  return (
    <section style={{
      padding: '72px 24px',
      background: '#f0fdf8',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: '800',
        marginBottom: '12px'
      }}>
        ¿Te interesa DrawTale Edu?
      </h2>
      <p style={{
        color: '#4b5c54',
        fontSize: '17px',
        maxWidth: '500px',
        margin: '0 auto 40px',
        lineHeight: '1.6'
      }}>
        Dejanos tu nombre y email y te avisamos cuando este listo para usar.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          maxWidth: '400px',
          margin: '0 auto'
        }}
      >
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={handleEmailChange}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: emailValido === null
              ? '1px solid #ccc'
              : emailValido
                ? '2px solid #2f7d68'
                : '2px solid #b85627',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s',
            boxSizing: 'border-box'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '8px',
            background: '#6C47FF',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Quiero saber mas
        </button>
        {mensaje && (
          <p style={{
            fontSize: '14px',
            fontWeight: '600',
            color: mensaje.includes('Gracias') ? '#2f7d68' : '#b85627'
          }}>
            {mensaje}
          </p>
        )}
      </form>

      <p style={{
        marginTop: '24px',
        fontSize: '14px',
        color: '#60746b'
      }}>
        {contador > 0 ? `${contador} personas ya se registraron` : '\u00A0'}
      </p>
    </section>
  );
}