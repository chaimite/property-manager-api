import { Injectable, NotFoundException } from '@nestjs/common';
import { Income, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/client/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async createIncome(data: Prisma.IncomeCreateInput): Promise<Income> {
    return await this.prisma.income.create({ data: data });
  }

  async findAllIncome(): Promise<Income[]> {
    return await this.prisma.income.findMany();
  }

  async findOneIncome(
    incomeWhereUniqueInput: Prisma.IncomeWhereUniqueInput,
  ): Promise<Income> {
    const result = await this.prisma.income.findUnique({
      where: incomeWhereUniqueInput,
    });
    if (!result) {
      throw new NotFoundException(
        `Could not find expense with id ${incomeWhereUniqueInput.id}`,
      );
    }
    return result;
  }

  async updateIncome(params: {
    where: Prisma.IncomeWhereUniqueInput;
    data: Prisma.IncomeUpdateInput;
  }): Promise<void> {
    const { where, data } = params;
    await this.findOneIncome(where);

    await this.prisma.income.update({ data, where });
  }

  async removeIncome(where: Prisma.IncomeWhereUniqueInput): Promise<void> {
    await this.findOneIncome(where);
    await this.prisma.income.delete({ where });
  }
}
