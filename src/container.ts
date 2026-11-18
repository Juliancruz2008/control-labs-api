import { prisma } from './db/prisma';
import { PrismaLoanRepository } from './repositories/prisma-loan.repository';
import { LoanService } from './services/loan.service';

export const loanService = new LoanService(new PrismaLoanRepository(prisma));
