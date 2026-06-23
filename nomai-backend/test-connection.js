import 'dotenv/config';
import { supabase } from './src/supabase.js';

async function test() {
  console.log('Intentando verificar la conexión con Supabase...');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL);

  try {
    // Hacemos una consulta mínima a una tabla cualquiera para forzar una petición de red.
    // Si la conexión es exitosa, Supabase responderá (incluso si la tabla no existe).
    const { data, error } = await supabase.from('_test_connection_').select('*').limit(1);
    
    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('relation "_test_connection_" does not exist')) {
        console.log('¡Conexión exitosa! Supabase respondió correctamente (la tabla de prueba no existe, lo cual es normal).');
      } else {
        console.error('Error retornado por Supabase:', error.message, '(Código:', error.code, ')');
      }
    } else {
      console.log('¡Conexión exitosa! Datos obtenidos:', data);
    }
  } catch (err) {
    console.error('Error al realizar la petición de prueba:', err.message || err);
  }
}

test();
