import { Injectable, NotFoundException } from '@nestjs/common';
import { Income } from '@prisma/client';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { PrismaService } from '../../../prisma/client/prisma.service';

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async createIncome(data: CreateIncomeDto): Promise<Income> {
    return await this.prisma.income.create({ data });
  }

  async findAllIncome(): Promise<Income[]> {
    return await this.prisma.income.findMany();
  }

  async findOneIncome(where: { id: string }): Promise<Income> {
    const result = await this.prisma.income.findUnique({ where });
    if (!result) {
      throw new NotFoundException(`Could not find income with id ${where.id}`);
    }
    return result;
  }

  async updateIncome(params: {
    where: { id: string };
    data: UpdateIncomeDto;
  }): Promise<void> {
    const { where, data } = params;
    await this.findOneIncome(where);

    await this.prisma.income.update({ where, data });
  }

  async removeIncome(id: string): Promise<void> {
    await this.findOneIncome({ id });
    await this.prisma.income.delete({ where: { id } });
  }
}
