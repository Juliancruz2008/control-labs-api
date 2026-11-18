import { NextFunction, Request, Response } from 'express';
import { loanService } from '../container';
import { ICreateLoanDTO } from '../dtos/loan.dto';

export class LoanController {
  public static createLoan = async (req: Request<Record<string, string>, unknown, ICreateLoanDTO>, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(201).json({ success: true, data: await loanService.createLoan(req.body) }); }
    catch (error) { next(error); }
  };

  public static getLoansByFilter = async (req: Request<Record<string, string>, unknown, unknown, { roomId?: string }>, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(200).json({ success: true, data: await loanService.getLoans({ roomId: req.query.roomId }) }); }
    catch (error) { next(error); }
  };

  public static getLoanById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(200).json({ success: true, data: await loanService.getLoanDetail(req.params.id) }); }
    catch (error) { next(error); }
  };

  public static acceptLoanInventory = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try { res.status(200).json({ success: true, data: await loanService.acceptLoan(req.params.id) }); }
    catch (error) { next(error); }
  };
}
