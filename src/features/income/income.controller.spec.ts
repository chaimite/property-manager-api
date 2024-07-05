import { Test, TestingModule } from '@nestjs/testing';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { Income, IncomeStatus, IncomeType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { NotFoundException } from '@nestjs/common';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { CreateIncomeDto } from './dto/create-income.dto';

describe('IncomeController', () => {
  let controller: IncomeController;
  // let service: IncomeService;

  const mockIncomeService = {
    createIncome: jest.fn(),
    findAllIncome: jest.fn(),
    findOneIncome: jest.fn(),
    updateIncome: jest.fn(),
    removeIncome: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeController],
      providers: [
        {
          provide: IncomeService,
          useValue: mockIncomeService,
        },
      ],
    }).compile();

    controller = module.get<IncomeController>(IncomeController);
    // service = module.get<IncomeService>(IncomeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
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
        value: new Decimal(100),
        paymentDate: new Date('2024-07-01'),
      };

      mockIncomeService.createIncome.mockResolvedValue(createdIncome);

      expect(await controller.create(incomeData)).toBe(createdIncome);
      expect(mockIncomeService.createIncome).toHaveBeenCalledWith(incomeData);
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
          value: new Decimal(100),
          paymentDate: new Date('2024-07-01'),
        },
      ];

      mockIncomeService.findAllIncome.mockResolvedValue(incomes);

      expect(await controller.findAllIncome()).toBe(incomes);
      expect(mockIncomeService.findAllIncome).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single income', async () => {
      const income: Income = {
        id: '1',
        name: 'mock income',
        description: 'really nice income',
        type: IncomeType.Rent,
        status: IncomeStatus.Received,
        propertyId: '1',
        value: new Decimal(100),
        paymentDate: new Date('2024-07-01'),
      };

      mockIncomeService.findOneIncome.mockResolvedValue(income);

      expect(await controller.findOne('1')).toBe(income);
      expect(mockIncomeService.findOneIncome).toHaveBeenCalledWith({ id: '1' });
    });

    it('should throw a NotFoundException if income is not found', async () => {
      mockIncomeService.findOneIncome.mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockIncomeService.findOneIncome).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('update', () => {
    it('should update an existing income', async () => {
      const updateData: UpdateIncomeDto = { value: new Decimal(200) };

      mockIncomeService.updateIncome.mockResolvedValue(null);

      await controller.update('1', updateData);
      expect(mockIncomeService.updateIncome).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });

    it('should throw a NotFoundException if income is not found', async () => {
      mockIncomeService.updateIncome.mockRejectedValue(new NotFoundException());

      await expect(
        controller.update('1', { value: new Decimal(200) }),
      ).rejects.toThrow(NotFoundException);
      expect(mockIncomeService.updateIncome).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { value: new Decimal(200) },
      });
    });
  });

  describe('remove', () => {
    it('should delete an existing income', async () => {
      mockIncomeService.removeIncome.mockResolvedValue(null);

      await controller.remove('1');
      expect(mockIncomeService.removeIncome).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if income is not found', async () => {
      mockIncomeService.removeIncome.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('1')).rejects.toThrow(NotFoundException);
      expect(mockIncomeService.removeIncome).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
