// Cliente único de Supabase, reutilizado por todos los módulos que
// necesiten leer o guardar datos (actividades, progreso, etc.).

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Faltan las variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. " +
      "Copia .env.example como .env y completa tus credenciales.",
  );
}

export const supabase = createClient(url, anonKey);
