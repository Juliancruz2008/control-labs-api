import { Router } from 'express';
import {
  crearEquipo,
  listarEquipos,
  actualizarEquipo,
} from '../controllers/equipos.controller';

const router = Router();

router.post('/', crearEquipo);
router.get('/', listarEquipos);
router.patch('/:id', actualizarEquipo);

export default router;