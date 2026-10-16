import { Request, Response } from 'express';

interface Ambiente {
  id: number;
  nombre: string;
  capacidad: number;
  ubicacion: string;
  estado: string;
}

const ambientes: Ambiente[] = [];
let siguienteId = 1;

export const listarAmbientes = (_req: Request, res: Response) => {
  res.json(ambientes);
};

export const crearAmbiente = (req: Request, res: Response) => {
  const { nombre, capacidad, ubicacion } = req.body;
  const ambiente: Ambiente = {
    id: siguienteId++,
    nombre,
    capacidad,
    ubicacion,
    estado: 'operativo',
  };
  ambientes.push(ambiente);
  res.status(201).json(ambiente);
};

export const actualizarAmbiente = (req: Request, res: Response) => {
  const ambiente = ambientes.find((a) => a.id === Number(req.params.id));
  if (!ambiente) {
    res.status(404).json({ mensaje: 'Ambiente no encontrado' });
    return;
  }

  const { capacidad, estado } = req.body;
  if (capacidad !== undefined) ambiente.capacidad = capacidad;
  if (estado !== undefined) ambiente.estado = estado;
  res.json(ambiente);
};