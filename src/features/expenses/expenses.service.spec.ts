import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { PrismaService } from 'prisma/client/prisma.service';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpensesService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
