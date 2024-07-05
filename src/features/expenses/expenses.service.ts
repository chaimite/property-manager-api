import { Injectable, NotFoundException } from '@nestjs/common';
import { Expenses } from '@prisma/client';
import { PrismaService } from 'prisma/client/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(CreateExpenseDto: CreateExpenseDto): Promise<Expenses> {
    return await this.prisma.expenses.create({
      data: CreateExpenseDto,
    });
  }

  async findAllExpenses(): Promise<Expenses[]> {
    return await this.prisma.expenses.findMany();
  }

  async findAllExpensesByYear(year: number): Promise<Expenses[]> {
    const startDate = new Date(Date.UTC(year, 0, 1));
    const endDate = new Date(Date.UTC(year + 1, 0, 1));

    return await this.prisma.expenses.findMany({
      where: {
        paymentDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
      },
    });
  }

  async findExpense(id: string): Promise<Expenses> {
    const result = await this.prisma.expenses.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`Could not find expense with id ${id}`);
    }
    return result;
  }

  async updateExpense({
    id,
    updateExpense,
  }: {
    id: string;
    updateExpense: UpdateExpenseDto;
  }): Promise<void> {
    const { ...data } = updateExpense;

    await this.findExpense(id);

    await this.prisma.expenses.update({
      where: { id },
      data,
    });
  }

  async removeExpense(id: string): Promise<void> {
    await this.findExpense(id);
    await this.prisma.expenses.delete({ where: { id } });
  }
}
