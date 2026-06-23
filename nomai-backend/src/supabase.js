import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Falta la variable de entorno SUPABASE_URL. Por favor, asegúrate de configurarla.');
}

if (!supabaseAnonKey) {
  throw new Error('Falta la variable de entorno SUPABASE_ANON_KEY. Por favor, asegúrate de configurarla.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
