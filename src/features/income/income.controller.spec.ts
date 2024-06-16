import { Test, TestingModule } from '@nestjs/testing';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { PrismaService } from 'prisma/client/prisma.service';

describe('IncomeController', () => {
  let controller: IncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeController],
      providers: [PrismaService, IncomeService],
    }).compile();

    controller = module.get<IncomeController>(IncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
