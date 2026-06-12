// Acceso tipado al DOM: falla temprano y con mensaje claro si falta un nodo.

export function $<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) {
    throw new Error(`No se encontró el elemento "${selector}" en el DOM`);
  }
  return el;
}

export async function cargarJson<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(ruta);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al cargar ${ruta}`);
  }
  return (await respuesta.json()) as T;
}
