import 'dotenv/config';
import app from './nomai-backend/src/app.js';

const PORT = process.env.PORT || 3000;

// Arranca el servidor y loguea confirmación
const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`[nomAI] Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
