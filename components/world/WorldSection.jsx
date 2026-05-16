import React from 'react';

// Datos hardcodeados (inventados por ahora para la galería)
const historiasGuardadas = [
  { 
    id: 1, 
    personaje: "El León Valiente", 
    titulo: "Aventura en la Selva", 
    fecha: "15 Mayo 2026" 
  },
  { 
    id: 2, 
    personaje: "La Tortuga Veloz", 
    titulo: "Carrera hacia el Mar", 
    fecha: "12 Mayo 2026" 
  },
  { 
    id: 3, 
    personaje: "Pipo el Perro", 
    titulo: "El Misterio del Parque", 
    fecha: "10 Mayo 2026" 
  }
];

export default function WorldSection() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* SECCIÓN 1: Perfil del niño */}
      <section style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2 style={{ marginTop: 0 }}>Perfil del Niño</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Círculo simulando la foto de perfil */}
          <div style={{ width: '80px', height: '80px', backgroundColor: '#cbd5e1', borderRadius: '50%' }}></div>
          <div>
            <p style={{ margin: '5px 0' }}><strong>Nombre:</strong> Usuario Explorador</p>
            <p style={{ margin: '5px 0' }}><strong>Nivel:</strong> Creador de Cuentos</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Galería de historias guardadas */}
      <section>
        <h2>Historial de Aventuras</h2>
        
        {/* Contenedor de las tarjetas */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          
          {historiasGuardadas.map((historia) => (
            <div 
              key={historia.id} 
              style={{ 
                border: '1px solid #e2e8f0', 
                borderRadius: '10px', 
                padding: '15px', 
                width: '250px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: '18px' }}>{historia.titulo}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Personaje:</strong> {historia.personaje}</p>
              <p style={{ margin: '5px 0', fontSize: '12px', color: '#64748b' }}>Fecha: {historia.fecha}</p>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}