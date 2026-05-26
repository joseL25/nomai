import { Router } from 'express';

const router = Router();

// GET /api/health – verifica que el servidor esté activo
router.get('/health', async (_req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    code:200 
});
});

export default router;
