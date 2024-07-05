import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ExpenseType, ExpenseStatus } from '@prisma/client';

export class UpdateExpenseDto {
  @ApiProperty({ description: 'Name of the expense', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Description of the expense', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    enum: ExpenseType,
    description: 'Type of the expense',
    required: false,
  })
  @IsOptional()
  @IsEnum(ExpenseType)
  type?: ExpenseType;

  @ApiProperty({
    enum: ExpenseStatus,
    description: 'Status of the expense',
    required: false,
  })
  @IsOptional()
  @IsEnum(ExpenseStatus)
  status?: ExpenseStatus;

  @ApiProperty({ description: 'Year of the expense', required: false })
  @IsOptional()
  @IsDateString()
  yearOfExpense?: string;

  @ApiProperty({ description: 'Payment date of the expense', required: false })
  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @ApiProperty({
    description: 'ID of the associated property',
    required: false,
  })
  @IsOptional()
  @IsString()
  propertyId?: string;

  @ApiProperty({ description: 'Value of the expense', required: false })
  @IsOptional()
  @IsNumber()
  value?: number;
}
