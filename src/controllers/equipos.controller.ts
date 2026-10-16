import { Request, Response } from 'express';

interface Equipo {
  id: number;
  nombre: string;
  ambienteId: number;
  estado: string;
}

const equipos: Equipo[] = [];
let siguienteId = 1;

export const crearEquipo = (req: Request, res: Response) => {
  const { nombre, ambienteId } = req.body;
  const equipo: Equipo = {
    id: siguienteId++,
    nombre,
    ambienteId: Number(ambienteId),
    estado: 'disponible',
  };
  equipos.push(equipo);
  res.status(201).json(equipo);
};

export const listarEquipos = (req: Request, res: Response) => {
  const { ambienteId } = req.query;
  if (ambienteId !== undefined) {
    res.json(equipos.filter((e) => e.ambienteId === Number(ambienteId)));
    return;
  }
  res.json(equipos);
};

export const actualizarEquipo = (req: Request, res: Response) => {
  const equipo = equipos.find((e) => e.id === Number(req.params.id));
  if (!equipo) {
    res.status(404).json({ mensaje: 'Equipo no encontrado' });
    return;
  }

  const { estado, ambienteId } = req.body;
  if (estado !== undefined) equipo.estado = estado;
  if (ambienteId !== undefined) equipo.ambienteId = Number(ambienteId);
  res.json(equipo);
};