import { Router } from 'express';
import loanRoutes from './loan.routes';
import usuariosRoutes from './usuarios.routes';
import ambientesRoutes from './ambientes.routes';
import equiposRoutes from './equipos.routes';

const router = Router();
router.use('/loans', loanRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/ambientes', ambientesRoutes);
router.use('/equipos', equiposRoutes);

export default router;