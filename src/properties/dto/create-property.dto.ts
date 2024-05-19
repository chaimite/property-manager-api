import { IsDate, IsEnum, IsString, Length } from 'class-validator';
import { PropertyType, PropertyStatus } from '../enums/property.enums';

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

  @IsDate()
  contract_begin_at: Date;

  @IsDate()
  contract_ending_at: Date;
}
