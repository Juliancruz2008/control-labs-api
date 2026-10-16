import { Router } from 'express';
import loanRoutes from './loan.routes';
import usuariosRoutes from './usuarios.routes';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/usuarios', usuariosRoutes);

export default router;