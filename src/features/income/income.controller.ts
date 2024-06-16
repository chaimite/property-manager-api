import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IncomeService } from './income.service';
import { Income, Prisma } from '@prisma/client';

@ApiTags('income')
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @ApiCreatedResponse()
  @ApiOperation({ summary: 'Add income to property' })
  async create(@Body() income: Prisma.IncomeCreateInput): Promise<Income> {
    return await this.incomeService.createIncome(income);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all income' })
  async findAllIncome(): Promise<Income[]> {
    return await this.incomeService.findAllIncome();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a specific income' })
  async findOne(@Param('id') id: string) {
    return await this.incomeService.findOneIncome({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patches data in specific income' })
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
  @ApiOperation({ summary: 'Deletes income source' })
  async remove(@Param('id') id: string) {
    return await this.incomeService.removeIncome({ id });
  }
}
