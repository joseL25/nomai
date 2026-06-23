import 'dotenv/config';
import UserModel from './src/models/user.model.js';

const model = new UserModel();

async function run() {
  console.log('Probando UserModel...');
  try {
    const users = await model.getAll();
    console.log('Usuarios obtenidos con éxito:', users);
  } catch (error) {
    console.error('Error durante la ejecución del test:', error.message || error);
  }
}

run();
