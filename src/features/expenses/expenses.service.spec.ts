import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { Prisma, Expenses, ExpenseType, ExpenseStatus } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let prisma: PrismaService;

  // Mock data
  const expenseData: Prisma.ExpensesCreateInput = {
    name: 'Rent',
    description: 'Monthly rent',
    type: ExpenseType.Condominium,
    status: ExpenseStatus.Overdue,
    value: new Decimal(500),
    paymentDate: new Date('2024-07-01'),
    property: null,
    yearOfExpense: new Date('2024'),
  };

  const expense: Expenses = {
    id: '1',
    name: 'Rent',
    description: 'Monthly rent',
    type: ExpenseType.Condominium,
    status: ExpenseStatus.Paid,
    value: new Decimal(500),
    paymentDate: new Date('2024-07-01'),
    propertyId: 'property-1',
    yearOfExpense: new Date(2024),
  };

  const expenses: Expenses[] = [expense];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: PrismaService,
          useValue: {
            expenses: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
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
      prisma.expenses.create = jest.fn().mockResolvedValue(expense);

      expect(await service.createExpense(expenseData)).toBe(expense);
      expect(prisma.expenses.create).toHaveBeenCalledWith({
        data: expenseData,
      });
    });
  });

  describe('findAllExpenses', () => {
    it('should return an array of expenses', async () => {
      prisma.expenses.findMany = jest.fn().mockResolvedValue(expenses);

      expect(await service.findAllExpenses()).toBe(expenses);
      expect(prisma.expenses.findMany).toHaveBeenCalled();
    });
  });

  describe('findExpense', () => {
    it('should return a single expense', async () => {
      prisma.expenses.findUnique = jest.fn().mockResolvedValue(expense);

      expect(await service.findExpense({ id: '1' })).toBe(expense);
      expect(prisma.expenses.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw a NotFoundException if expense is not found', async () => {
      prisma.expenses.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findExpense({ id: '1' })).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.expenses.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findAllExpensesByYear', () => {
    it('should return an array of expenses for a given year', async () => {
      prisma.expenses.findMany = jest.fn().mockResolvedValue(expenses);

      expect(await service.findAllExpensesByYear(2024)).toBe(expenses);
      expect(prisma.expenses.findMany).toHaveBeenCalledWith({
        where: {
          date: {
            gte: new Date('2024-01-01'),
            lt: new Date('2025-01-01'),
          },
        },
      });
    });
  });

  describe('updateExpense', () => {
    it('should update an existing expense', async () => {
      const updateData: Prisma.ExpensesUpdateInput = { value: 600 };

      prisma.expenses.findUnique = jest.fn().mockResolvedValue(expense);
      prisma.expenses.update = jest
        .fn()
        .mockResolvedValue({ ...expense, ...updateData });

      await service.updateExpense({ where: { id: '1' }, data: updateData });
      expect(prisma.expenses.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });

    it('should throw a NotFoundException if expense is not found', async () => {
      prisma.expenses.findUnique = jest.fn().mockResolvedValue(null);

      await expect(
        service.updateExpense({ where: { id: '1' }, data: { value: 600 } }),
      ).rejects.toThrow(NotFoundException);
      expect(prisma.expenses.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('removeExpense', () => {
    it('should delete an existing expense', async () => {
      prisma.expenses.findUnique = jest.fn().mockResolvedValue(expense);
      prisma.expenses.delete = jest.fn().mockResolvedValue(expense);

      await service.removeExpense({ id: '1' });
      expect(prisma.expenses.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw a NotFoundException if expense is not found', async () => {
      prisma.expenses.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.removeExpense({ id: '1' })).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.expenses.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });
});
