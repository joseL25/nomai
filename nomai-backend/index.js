import 'dotenv/config';
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

// Arranca el servidor y loguea confirmación
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`[nomAI] Servidor Backend corriendo en http://localhost:${PORT}`);
  });
};

startServer();
