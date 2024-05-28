import { IsDate, IsEnum, IsString, Length } from 'class-validator';
import { PropertyType, PropertyStatus } from '../enums/property.enums';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @IsString()
  @Length(1, 90)
  description: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @IsString()
  @Length(1, 25)
  location: string;

  @Type(() => Date)
  @IsDate()
  contract_begin_at: Date;

  @Type(() => Date)
  @IsDate()
  contract_ending_at: Date;
}
