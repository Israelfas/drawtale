// Persistencia tipada sobre localStorage (los valores se guardan como JSON).

export function leerStorage<T>(clave: string, porDefecto: T): T {
  const crudo = localStorage.getItem(clave);
  if (crudo === null) return porDefecto;
  try {
    return JSON.parse(crudo) as T;
  } catch {
    return porDefecto;
  }
}

export function guardarStorage<T>(clave: string, valor: T): void {
  localStorage.setItem(clave, JSON.stringify(valor));
}
