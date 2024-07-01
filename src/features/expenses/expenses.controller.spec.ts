import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpenseStatus, ExpenseType, Expenses, Prisma } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  const mockExpensesService = {
    createExpense: jest.fn(),
    findAllExpenses: jest.fn(),
    findExpense: jest.fn(),
    findAllExpensesByYear: jest.fn(),
    updateExpense: jest.fn(),
    removeExpense: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: mockExpensesService,
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new expense', async () => {
      const expenseData: Prisma.ExpensesCreateInput = {
        description: '',
        name: '',
        paymentDate: new Date(),
        status: ExpenseStatus.Overdue,
        type: ExpenseType.Condominium,
        value: new Decimal(100),
        yearOfExpense: new Date(2024),
        property: null,
      };

      const createdExpense: Expenses = {
        id: '1',
        name: 'Insurance',
        description: 'Monthly insurance',
        type: ExpenseType.Insurance,
        status: 'Paid',
        value: new Decimal(500),
        paymentDate: new Date('2024-07-01'),
        propertyId: 'property-1',
        yearOfExpense: new Date(2024),
      };

      mockExpensesService.createExpense.mockResolvedValue(createdExpense);

      expect(await controller.create(expenseData)).toBe(createdExpense);
      expect(mockExpensesService.createExpense).toHaveBeenCalledWith(
        expenseData,
      );
    });
  });

  describe('findAllExpenses', () => {
    it('should return an array of expenses', async () => {
      const expenses: Expenses[] = [
        {
          id: '1',
          name: 'Insurance',
          description: 'Monthly insurance',
          type: ExpenseType.Insurance,
          status: 'Paid',
          value: new Decimal(500),
          paymentDate: new Date('2024-07-01'),
          propertyId: 'property-1',
          yearOfExpense: new Date(2024),
        },
      ];

      mockExpensesService.findAllExpenses.mockResolvedValue(expenses);

      expect(await controller.findAllExpenses()).toBe(expenses);
      expect(mockExpensesService.findAllExpenses).toHaveBeenCalled();
    });
  });

  describe('findOneExpense', () => {
    it('should return a single expense', async () => {
      const expense: Expenses = {
        id: '1',
        name: 'Insurance',
        description: 'Monthly insurance',
        type: ExpenseType.Insurance,
        status: 'Paid',
        value: new Decimal(500),
        paymentDate: new Date('2024-07-01'),
        propertyId: 'property-1',
        yearOfExpense: new Date(2024),
      };

      mockExpensesService.findExpense.mockResolvedValue(expense);

      expect(await controller.findOneExpense('1')).toBe(expense);
      expect(mockExpensesService.findExpense).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw a NotFoundException if expense is not found', async () => {
      mockExpensesService.findExpense.mockResolvedValue(null);

      await expect(controller.findOneExpense('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockExpensesService.findExpense).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('findExpensesByYear', () => {
    it('should return an array of expenses for a given year', async () => {
      const expenses: Expenses[] = [
        {
          id: '1',
          name: 'Insurance',
          description: 'Monthly insurance',
          type: ExpenseType.Insurance,
          status: 'Paid',
          value: new Decimal(500),
          paymentDate: new Date('2024-07-01'),
          propertyId: 'property-1',
          yearOfExpense: new Date(2024),
        },
      ];

      mockExpensesService.findAllExpensesByYear.mockResolvedValue(expenses);

      expect(await controller.findExpensesByYear(2024)).toBe(expenses);
      expect(mockExpensesService.findAllExpensesByYear).toHaveBeenCalledWith(
        2024,
      );
    });
  });

  describe('updateOneExpense', () => {
    it('should update an existing expense', async () => {
      const updateData: Prisma.ExpensesUpdateInput = { value: 600 };

      mockExpensesService.updateExpense.mockResolvedValue(null);

      await controller.updateOneExpense('1', updateData);
      expect(mockExpensesService.updateExpense).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });

    it('should throw a NotFoundException if expense is not found', async () => {
      mockExpensesService.updateExpense.mockRejectedValue(
        new NotFoundException(),
      );

      await expect(
        controller.updateOneExpense('1', { value: 600 }),
      ).rejects.toThrow(NotFoundException);
      expect(mockExpensesService.updateExpense).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { amount: 600 },
      });
    });
  });

  describe('removeOneProperty', () => {
    it('should delete an existing expense', async () => {
      mockExpensesService.removeExpense.mockResolvedValue(null);

      await controller.removeOneProperty('1');
      expect(mockExpensesService.removeExpense).toHaveBeenCalledWith({
        id: '1',
      });
    });

    it('should throw a NotFoundException if expense is not found', async () => {
      mockExpensesService.removeExpense.mockRejectedValue(
        new NotFoundException(),
      );

      await expect(controller.removeOneProperty('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockExpensesService.removeExpense).toHaveBeenCalledWith({
        id: '1',
      });
    });
  });
});
