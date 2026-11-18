import { ICreateLoanDTO } from '../dtos/loan.dto';
import { DomainError } from '../errors/domain.error';
import { Loan, LoanFilters, LoanRepository } from '../repositories/loan.repository';

export class LoanService {
  constructor(private readonly loanRepository: LoanRepository) {}
  createLoan(input: ICreateLoanDTO): Promise<Loan> { return this.loanRepository.create(input); }
  getLoans(filters: LoanFilters = {}): Promise<Loan[]> { return this.loanRepository.findAll(filters); }
  async getLoanDetail(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);
    if (!loan) throw new DomainError('NOT_FOUND', `No existe un préstamo con identificador ${id}.`);
    return loan;
  }
  async acceptLoan(id: string): Promise<Loan> {
    const updated = await this.loanRepository.updateStatus(id, 'PENDIENTE_APROBACION', 'APROBADO_Y_FIRMADO');
    if (updated) return updated;
    if (!(await this.loanRepository.findById(id))) throw new DomainError('NOT_FOUND', `No existe un préstamo con identificador ${id}.`);
    throw new DomainError('CONFLICT', 'El préstamo ya fue aceptado.');
  }
}
