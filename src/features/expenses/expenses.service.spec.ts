import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { Expenses } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Decimal } from '@prisma/client/runtime/library';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let prisma: PrismaService;

  const expense: Expenses = {
    id: '1',
    name: 'Expense 1',
    description: 'Expense description',
    type: 'Other',
    status: 'Paid',
    yearOfExpense: new Date(),
    paymentDate: new Date(),
    propertyId: 'propertyId',
    value: new Decimal(500),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: PrismaService,
          useValue: {
            expenses: {
              create: jest.fn().mockResolvedValue(expense),
              findUnique: jest.fn().mockResolvedValue(expense),
              findMany: jest.fn().mockResolvedValue([expense]),
              update: jest.fn().mockResolvedValue(expense),
              delete: jest.fn().mockResolvedValue(expense),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createExpense', () => {
    it('should create a new expense', async () => {
      const createExpenseDto: CreateExpenseDto = {
        name: 'Expense 1',
        description: 'Expense description',
        type: 'Other',
        status: 'Paid',
        yearOfExpense: new Date(),
        paymentDate: new Date(),
        propertyId: 'propertyId',
        value: new Decimal(500),
      };

      const result = await service.createExpense(createExpenseDto);
      expect(result).toEqual(expense);
      expect(prisma.expenses.create).toHaveBeenCalledWith({
        data: createExpenseDto,
      });
    });
  });

  describe('findAllExpenses', () => {
    it('should return an array of expenses', async () => {
      const result = await service.findAllExpenses();
      expect(result).toEqual([expense]);
      expect(prisma.expenses.findMany).toHaveBeenCalled();
    });
  });

  describe('findAllExpensesByYear', () => {
    it('should return an array of expenses for a specific year', async () => {
      const year = 2024;
      const startDate = new Date(Date.UTC(year, 0, 1));
      const endDate = new Date(Date.UTC(year + 1, 0, 1));

      const result = await service.findAllExpensesByYear(year);
      expect(result).toEqual([expense]);
      expect(prisma.expenses.findMany).toHaveBeenCalledWith({
        where: {
          paymentDate: {
            gte: startDate.toISOString(),
            lte: endDate.toISOString(),
          },
        },
      });
    });
  });

  describe('findExpense', () => {
    it('should return a single expense', async () => {
      const result = await service.findExpense('1');
      expect(result).toEqual(expense);
      expect(prisma.expenses.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if expense not found', async () => {
      jest.spyOn(prisma.expenses, 'findUnique').mockResolvedValueOnce(null);
      await expect(service.findExpense('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateExpense', () => {
    it('should update an existing expense', async () => {
      const updateExpenseDto: UpdateExpenseDto = { value: 600 };

      prisma.expenses.findUnique = jest.fn().mockResolvedValue(expense);
      prisma.expenses.update = jest
        .fn()
        .mockResolvedValue({ ...expense, ...updateExpenseDto });

      await service.updateExpense({ id: '1', updateExpense: updateExpenseDto });
      expect(prisma.expenses.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateExpenseDto,
      });
    });

    it('should throw NotFoundException if expense not found', async () => {
      jest.spyOn(prisma.expenses, 'findUnique').mockResolvedValueOnce(null);
      await expect(
        service.updateExpense({ id: '999', updateExpense: { value: 600 } }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeExpense', () => {
    it('should remove an expense', async () => {
      await service.removeExpense('1');
      expect(prisma.expenses.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if expense not found', async () => {
      jest.spyOn(prisma.expenses, 'findUnique').mockResolvedValueOnce(null);
      await expect(service.removeExpense('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
