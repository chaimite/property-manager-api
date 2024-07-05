import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IncomeService } from './income.service';
import { Income, IncomeStatus, IncomeType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

describe('IncomeService', () => {
  let service: IncomeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncomeService,
        {
          provide: PrismaService,
          useValue: {
            income: {
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

    service = module.get<IncomeService>(IncomeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createIncome', () => {
    it('should create a new income', async () => {
      const incomeData: CreateIncomeDto = {
        value: new Decimal(100),
        paymentDate: new Date('2024-07-01'),
        status: IncomeStatus.Received,
        propertyId: 'some-id',
      };
      const createdIncome: Income = {
        id: '1',
        name: 'mock income',
        description: 'really nice income',
        type: IncomeType.Rent,
        status: IncomeStatus.Received,
        propertyId: '1',
        value: new Decimal(1000),
        paymentDate: new Date('2024-07-01'),
      };

      prisma.income.create = jest.fn().mockResolvedValue(createdIncome);

      expect(await service.createIncome(incomeData)).toBe(createdIncome);
      expect(prisma.income.create).toHaveBeenCalledWith({ data: incomeData });
    });
  });

  describe('findAllIncome', () => {
    it('should return an array of incomes', async () => {
      const incomes: Income[] = [
        {
          id: '1',
          name: 'mock income',
          description: 'really nice income',
          type: IncomeType.Rent,
          status: IncomeStatus.Received,
          propertyId: '1',
          value: new Decimal(1000),
          paymentDate: new Date('2024-07-01'),
        },
      ];

      prisma.income.findMany = jest.fn().mockResolvedValue(incomes);

      expect(await service.findAllIncome()).toBe(incomes);
      expect(prisma.income.findMany).toHaveBeenCalled();
    });
  });

  describe('findOneIncome', () => {
    it('should return a single income', async () => {
      const income: Income = {
        id: '1',
        name: 'mock income',
        description: 'really nice income',
        type: IncomeType.Rent,
        status: IncomeStatus.Received,
        propertyId: '1',
        value: new Decimal(1000),
        paymentDate: new Date('2024-07-01'),
      };

      prisma.income.findUnique = jest.fn().mockResolvedValue(income);

      expect(await service.findOneIncome({ id: '1' })).toBe(income);
      expect(prisma.income.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if income is not found', async () => {
      prisma.income.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findOneIncome({ id: '1' })).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.income.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('updateIncome', () => {
    it('should update an existing income', async () => {
      const income: Income = {
        id: '1',
        name: 'mock income',
        description: 'really nice income',
        type: IncomeType.Rent,
        status: IncomeStatus.Received,
        propertyId: '1',
        value: new Decimal(1000),
        paymentDate: new Date('2024-07-01'),
      };
      const updateData: UpdateIncomeDto = { value: new Decimal(200) };

      prisma.income.findUnique = jest.fn().mockResolvedValue(income);
      prisma.income.update = jest.fn().mockResolvedValue(income);

      await service.updateIncome({ where: { id: '1' }, data: updateData });
      expect(prisma.income.update).toHaveBeenCalledWith({
        data: updateData,
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if income is not found', async () => {
      prisma.income.findUnique = jest.fn().mockResolvedValue(null);

      await expect(
        service.updateIncome({
          where: { id: '1' },
          data: { value: new Decimal(200) },
        }),
      ).rejects.toThrow(NotFoundException);
      expect(prisma.income.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('removeIncome', () => {
    it('should delete an existing income', async () => {
      const income: Income = {
        id: '1',
        name: 'mock income',
        description: 'really nice income',
        type: IncomeType.Rent,
        status: IncomeStatus.Received,
        propertyId: '1',
        value: new Decimal(1000),
        paymentDate: new Date('2024-07-01'),
      };

      prisma.income.findUnique = jest.fn().mockResolvedValue(income);
      prisma.income.delete = jest.fn().mockResolvedValue(income);

      await service.removeIncome('1');
      expect(prisma.income.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a NotFoundException if income is not found', async () => {
      prisma.income.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.removeIncome('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.income.findUnique).toHaveBeenCalledWith({
        where: '1',
      });
    });
  });
});
