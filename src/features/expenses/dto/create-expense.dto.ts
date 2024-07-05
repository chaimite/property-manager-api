import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ExpenseType, ExpenseStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

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
  yearOfExpense: Date;

  @ApiProperty({ description: 'Payment date of the expense' })
  @IsNotEmpty()
  @IsDateString()
  paymentDate: Date;

  @ApiProperty({
    description: 'ID of the associated property',
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsString()
  propertyId: string;

  @ApiProperty({ description: 'Value of the expense', example: 125.56 })
  @IsNotEmpty()
  value: Decimal;
}
