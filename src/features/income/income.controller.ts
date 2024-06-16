import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { Income, Prisma } from '@prisma/client';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async create(@Body() income: Prisma.IncomeCreateInput): Promise<Income> {
    return await this.incomeService.createIncome(income);
  }

  @Get()
  async findAllIncome(): Promise<Income[]> {
    return await this.incomeService.findAllIncome();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.incomeService.findOneIncome({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncome: Prisma.IncomeUpdateInput,
  ) {
    return await this.incomeService.updateIncome({
      where: { id },
      data: updateIncome,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.incomeService.removeIncome({ id });
  }
}
