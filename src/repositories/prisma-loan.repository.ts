import { PrismaClient } from '@prisma/client';
import { ICreateLoanDTO } from '../dtos/loan.dto';
import { DomainError } from '../errors/domain.error';
import { Loan, LoanFilters, LoanRepository, LoanStatus } from './loan.repository';

export class PrismaLoanRepository implements LoanRepository {
  private readonly database: LoanDatabase;
  constructor(database: PrismaClient) { this.database = database as unknown as LoanDatabase; }
  async create(input: ICreateLoanDTO): Promise<Loan> {
    try {
      return this.toDomain(await this.database.loan.create({ data: input }));
    } catch (error) {
      if (isPrismaConstraintError(error)) {
        throw new DomainError('VALIDATION_ERROR', 'La sala, el instructor o el guarda no existen o los datos incumplen una restricción.');
      }
      throw error;
    }
  }
  async findAll(filters: LoanFilters = {}): Promise<Loan[]> {
    const rows = await this.database.loan.findMany({ where: filters.roomId ? { roomId: filters.roomId } : undefined, orderBy: { createdAt: 'desc' } });
    return rows.map((row) => this.toDomain(row));
  }
  async findById(id: string): Promise<Loan | null> {
    const row = await this.database.loan.findUnique({ where: { id: BigInt(id) } });
    return row ? this.toDomain(row) : null;
  }
  async updateStatus(id: string, expectedStatus: LoanStatus, status: LoanStatus): Promise<Loan | null> {
    const result = await this.database.loan.updateMany({
      where: { id: BigInt(id), estado: expectedStatus },
      data: { estado: status, acceptedAt: status === 'APROBADO_Y_FIRMADO' ? new Date() : null }
    });
    return result.count ? this.findById(id) : null;
  }
  private toDomain(row: PrismaLoanRow): Loan {
    return {
      id: row.id.toString(), roomId: row.roomId, instructorId: row.instructorId, guardaId: row.guardaId,
      numeroPc: row.numeroPc, estado: row.estado as LoanStatus,
      createdAt: row.createdAt.toISOString(), acceptedAt: row.acceptedAt?.toISOString() ?? null
    };
  }
}

interface PrismaLoanRow {
  id: bigint; roomId: string; instructorId: string; guardaId: string; numeroPc: number;
  estado: string; createdAt: Date; acceptedAt: Date | null;
}
interface LoanDatabase {
  loan: {
    create(args: { data: ICreateLoanDTO }): Promise<PrismaLoanRow>;
    findMany(args: { where?: { roomId: string }; orderBy: { createdAt: 'desc' } }): Promise<PrismaLoanRow[]>;
    findUnique(args: { where: { id: bigint } }): Promise<PrismaLoanRow | null>;
    updateMany(args: { where: { id: bigint; estado: string }; data: { estado: string; acceptedAt: Date | null } }): Promise<{ count: number }>;
  };
}
const isPrismaConstraintError = (error: unknown): boolean =>
  typeof error === 'object' && error !== null && 'code' in error &&
  (error.code === 'P2003' || error.code === 'P2004');
