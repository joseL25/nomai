import { Router } from 'express';
import usersRouter from './users.routes.js';
import simSessionsRouter from './simsessions.routes.js';

const router = Router();

// GET /api/health – verifica que el servidor esté activo
router.get('/health', async (_req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    code: 200,
  });
});

router.use('/users', usersRouter);
router.use('/sia', simSessionsRouter);

export default router;
