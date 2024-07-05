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
import { Income } from '@prisma/client';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@ApiTags('income')
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateIncomeDto })
  @ApiOperation({ summary: 'Add income to property' })
  async create(@Body() createIncomeDto: CreateIncomeDto): Promise<Income> {
    return await this.incomeService.createIncome(createIncomeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all income' })
  async findAllIncome(): Promise<Income[]> {
    return await this.incomeService.findAllIncome();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a specific income' })
  async findOne(@Param('id') id: string): Promise<Income> {
    return await this.incomeService.findOneIncome({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patches data in specific income' })
  async update(
    @Param('id') id: string,
    @Body() updateIncomeDto: UpdateIncomeDto,
  ): Promise<void> {
    return await this.incomeService.updateIncome({
      where: { id },
      data: updateIncomeDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes income source' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.incomeService.removeIncome(id);
  }
}
