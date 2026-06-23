import 'dotenv/config';
import SimSessionModel from './src/models/simsession.model.js';

const model = new SimSessionModel();

async function runTests() {
  console.log('Probando SimSessionModel...');
  try {
    const sessions = await model.getAll();
    console.log('Sesiones obtenidas con éxito:', sessions);
  } catch (error) {
    console.error('Error durante la ejecución del test:', error.message || error);
  }
}

runTests();
