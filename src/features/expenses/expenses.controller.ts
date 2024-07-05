import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { Expenses } from '@prisma/client';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Adds an expense to a property' })
  async create(@Body() expense: CreateExpenseDto): Promise<Expenses> {
    return await this.expensesService.createExpense(expense);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all expenses' })
  async findAllExpenses(): Promise<Expenses[]> {
    return await this.expensesService.findAllExpenses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a specific expense' })
  async findOneExpense(@Param('id') id: string) {
    return await this.expensesService.findExpense(id);
  }

  @Get('year/:year')
  @ApiOperation({ summary: 'Finds all expenses by year' })
  async findExpensesByYear(@Param('year', ParseIntPipe) year: number) {
    return await this.expensesService.findAllExpensesByYear(year);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patches data in a specific expense' })
  async updateOneExpense(
    @Param('id') id: string,
    @Body() updateExpense: UpdateExpenseDto,
  ) {
    return await this.expensesService.updateExpense({
      id,
      updateExpense,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes expense' })
  async removeOneProperty(@Param('id') id: string) {
    return this.expensesService.removeExpense(id);
  }
}
