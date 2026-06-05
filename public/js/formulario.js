export function iniciarFormulario() {
  const form = document.getElementById('form-interes');
  const inputNombre = document.getElementById('input-nombre');
  const inputEmail = document.getElementById('input-email');
  const mensaje = document.getElementById('form-mensaje');

  if (!form) return;

  inputEmail.addEventListener('input', () => {
    const esValido = inputEmail.value.includes('@') && inputEmail.value.includes('.');
    inputEmail.style.borderColor = esValido ? '#2f7d68' : '#b85627';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();

    if (!nombre || !email.includes('@')) {
      mensaje.textContent = 'Por favor completa todos los campos correctamente.';
      mensaje.style.color = '#b85627';
      return;
    }

    const interesados = JSON.parse(localStorage.getItem('interesados') || '[]');
    interesados.push({ nombre, email, fecha: new Date().toISOString() });
    localStorage.setItem('interesados', JSON.stringify(interesados));

    mensaje.textContent = `¡Gracias ${nombre}! Te avisamos cuando DrawTale Edu esté listo.`;
    mensaje.style.color = '#2f7d68';
    form.reset();
  });
}