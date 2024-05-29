import { IsDate, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { PropertyType, PropertyStatus } from '../enums/property.enums';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 90)
  description: string;

  @IsEnum(PropertyType)
  @IsNotEmpty()
  type: PropertyType;

  @IsEnum(PropertyStatus)
  @IsNotEmpty()
  status: PropertyStatus;

  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  location: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  contract_begin_at: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  contract_ending_at: Date;
}
