import { Router } from 'express';
import * as simSessionController from '../controllers/simsession.controller.js';

const router = Router();

router.get('/', simSessionController.getAll);
router.get('/:id', simSessionController.getById);
router.post('/', simSessionController.create);
router.put('/:id', simSessionController.update);
router.delete('/:id', simSessionController.remove);

export default router;
