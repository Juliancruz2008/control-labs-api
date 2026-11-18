import { Request, Response, NextFunction } from 'express';
import { ICreateLoanDTO } from '../dtos/loan.dto';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (value: unknown): value is string => typeof value === 'string' && uuidPattern.test(value);

export const validateLoanPayload = (req: Request, res: Response, next: NextFunction): void => {
  const body: unknown = req.body;
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    res.status(400).json({ success: false, code: 'VALIDATION_ERROR', error: 'Datos del préstamo inválidos.' }); return;
  }
  const loan = body as Record<string, unknown>;
  const allowed = ['roomId', 'instructorId', 'guardaId', 'numeroPc'];
  if (Object.keys(loan).some((key) => !allowed.includes(key)) || !isUuid(loan.roomId) || !isUuid(loan.instructorId) || !isUuid(loan.guardaId) || typeof loan.numeroPc !== 'number' || !Number.isInteger(loan.numeroPc) || loan.numeroPc <= 0) {
    res.status(400).json({ success: false, code: 'VALIDATION_ERROR', error: 'Datos del préstamo inválidos.' }); return;
  }
  next();
};

export const validateLoanIdParameter = (req: Request<{ id: string }>, res: Response, next: NextFunction): void => {
  const { id } = req.params;
  if (!/^[1-9]\d*$/.test(id) || id.length > 19 || BigInt(id) > 9223372036854775807n) {
    res.status(400).json({ success: false, code: 'VALIDATION_ERROR', error: 'El identificador debe ser un entero positivo.' }); return;
  }
  next();
};

export const validateLoanSearchQuery = (req: Request, res: Response, next: NextFunction): void => {
  const { roomId } = req.query;
  if (roomId !== undefined && !isUuid(roomId)) {
    res.status(400).json({ success: false, code: 'VALIDATION_ERROR', error: 'El filtro roomId debe ser un UUID válido.' }); return;
  }
  next();
};
