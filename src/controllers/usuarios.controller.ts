import { Request, Response } from "express";

type Rol = "estudiante" | "docente" | "administrador";

interface Usuario {
  id: number;
  nombre: string;
  rol: Rol;
  estado: string;
  contrasena: string;
  eliminado: boolean;
}

const usuarios: Usuario[] = [];
let siguienteId = 1;

export const listarUsuarios = (_req: Request, res: Response) => {
  res.json(usuarios.filter((u) => !u.eliminado));
};

export const crearUsuario = (req: Request, res: Response) => {
  const { nombre, rol, contrasena } = req.body;
  const usuario: Usuario = {
    id: siguienteId++,
    nombre,
    rol,
    estado: "activo",
    contrasena,
    eliminado: false,
  };
  usuarios.push(usuario);
  res.status(201).json(usuario);
};

export const obtenerUsuario = (req: Request, res: Response) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id) && !u.eliminado);
  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  res.json(usuario);
};

export const actualizarUsuario = (req: Request, res: Response) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id) && !u.eliminado);
  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

  const { rol, estado, contrasena } = req.body;
  if (rol !== undefined) usuario.rol = rol;
  if (estado !== undefined) usuario.estado = estado;
  if (contrasena !== undefined) usuario.contrasena = contrasena;
  res.json(usuario);
};

export const eliminarUsuario = (req: Request, res: Response) => {
  const usuario = usuarios.find((u) => u.id === Number(req.params.id) && !u.eliminado);
  if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });
  usuario.eliminado = true;
  res.status(204).send();
};