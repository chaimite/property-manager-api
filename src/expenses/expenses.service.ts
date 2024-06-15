import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Expenses } from '@prisma/client';
import { PrismaService } from 'prisma/client/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async createExpense(data: Prisma.ExpensesCreateInput): Promise<Expenses> {
    return await this.prisma.expenses.create({
      data: data,
    });
  }

  async findAllExpenses(): Promise<Expenses[]> {
    return await this.prisma.expenses.findMany();
  }

  async findExpense(
    expensesWhereUniqueInput: Prisma.ExpensesWhereUniqueInput,
  ): Promise<Expenses> {
    const result = await this.prisma.expenses.findUnique({
      where: expensesWhereUniqueInput,
    });
    if (!result) {
      throw new NotFoundException(
        `Could not find expense with id ${expensesWhereUniqueInput}`,
      );
    }
    return result;
  }

  async updateExpense(params: {
    where: Prisma.ExpensesWhereUniqueInput;
    data: Prisma.ExpensesUpdateInput;
  }): Promise<void> {
    const { where, data } = params;
    await this.findExpense(where);

    await this.prisma.expenses.update({ data, where });
  }

  async removeExpense(where: Prisma.ExpensesWhereUniqueInput): Promise<void> {
    await this.findExpense(where);
    await this.prisma.expenses.delete({ where });
  }
}
