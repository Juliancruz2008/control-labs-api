import { Router } from "express";
import {
  listarUsuarios,
  crearUsuario,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuarios.controller";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", crearUsuario);
router.get("/:id", obtenerUsuario);
router.patch("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;