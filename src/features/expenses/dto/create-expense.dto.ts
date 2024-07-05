import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { ExpenseType, ExpenseStatus } from '@prisma/client';

export class CreateExpenseDto {
  @ApiProperty({ description: 'Name of the expense' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the expense' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: ExpenseType, description: 'Type of the expense' })
  @IsEnum(ExpenseType)
  type: ExpenseType;

  @ApiProperty({ enum: ExpenseStatus, description: 'Status of the expense' })
  @IsEnum(ExpenseStatus)
  status: ExpenseStatus;

  @ApiProperty({ description: 'Year of the expense' })
  @IsNotEmpty()
  @IsDateString()
  yearOfExpense: string;

  @ApiProperty({ description: 'Payment date of the expense' })
  @IsNotEmpty()
  @IsDateString()
  paymentDate: string;

  @ApiProperty({ description: 'ID of the associated property' })
  @IsNotEmpty()
  @IsString()
  propertyId: string;

  @ApiProperty({ description: 'Value of the expense' })
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
