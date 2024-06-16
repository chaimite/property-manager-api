import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expenses, Prisma } from '@prisma/client';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() expense: Prisma.ExpensesCreateInput): Promise<Expenses> {
    return await this.expensesService.createExpense(expense);
  }

  @Get()
  async findAllExpenses(): Promise<Expenses[]> {
    return await this.expensesService.findAllExpenses();
  }

  @Get(':id')
  async findOneExperience(@Param('id') id: string) {
    return await this.expensesService.findExpense({ id });
  }

  @Patch(':id')
  async updateOneExpense(
    @Param('id') id: string,
    @Body() updateExpense: Prisma.ExpensesUpdateInput,
  ) {
    return await this.expensesService.updateExpense({
      where: { id },
      data: updateExpense,
    });
  }

  @Delete(':id')
  async removeOneProperty(@Param('id') id: string) {
    return this.expensesService.removeExpense({ id });
  }
}
