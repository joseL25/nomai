import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

// Usuario hardcodeado mientras se integra autenticación real
router.use((req, _res, next) => {
  req.userId = 'user-123';
  next();
});

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

export default router;
