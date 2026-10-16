import { Router } from 'express';
import loanRoutes from './loan.routes';
import usuariosRoutes from './usuarios.routes';
import ambientesRoutes from './ambientes.routes';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/ambientes', ambientesRoutes);

export default router;