import {
  IsOptional,
  IsString,
  IsUUID,
  IsEnum,
  IsDecimal,
  IsDate,
} from 'class-validator';
import { IncomeType, IncomeStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateIncomeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(IncomeType)
  type?: IncomeType;

  @IsOptional()
  @IsEnum(IncomeStatus)
  status?: IncomeStatus;

  @IsOptional()
  @IsUUID()
  propertyId?: string;

  @IsOptional()
  @IsDecimal()
  value?: Decimal;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paymentDate?: Date;
}
