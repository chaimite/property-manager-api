import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsDate,
} from 'class-validator';
import { IncomeType, IncomeStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateIncomeDto {
  @ApiProperty({ description: 'Name of the expense' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Description of the income' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: IncomeType, description: 'Type of the income' })
  @IsOptional()
  @IsEnum(IncomeType)
  type?: IncomeType;

  @ApiProperty({ enum: IncomeStatus, description: 'Status of the income' })
  @IsNotEmpty()
  @IsEnum(IncomeStatus)
  status: IncomeStatus;

  @ApiProperty({
    description: 'ID of the associated property',
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  propertyId: string;

  @ApiProperty({ description: 'Value of the income', example: 125.56 })
  @IsNotEmpty()
  value?: Decimal;

  @ApiProperty({ description: 'Payment date of the income' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  paymentDate: Date;
}
