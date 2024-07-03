import { IsString, IsEnum, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType, PropertyStatus } from '@prisma/client';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contractBeginAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contractEndingAt?: Date;

  @IsOptional()
  @IsString()
  userId?: string;
}
