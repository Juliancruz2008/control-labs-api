import { Router } from 'express';
import {
  listarAmbientes,
  crearAmbiente,
  actualizarAmbiente,
} from '../controllers/ambientes.controller';

const router = Router();

router.get('/', listarAmbientes);
router.post('/', crearAmbiente);
router.patch('/:id', actualizarAmbiente);

export default router;