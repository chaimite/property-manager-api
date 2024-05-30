import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';
import { PropertyType, PropertyStatus } from 'prisma';
import { Type } from 'class-transformer';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 90)
  description: string;

  @IsNotEmpty()
  type: PropertyType;

  @IsNotEmpty()
  status: PropertyStatus;

  @IsString()
  @IsNotEmpty()
  @Length(1, 25)
  location: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  contractBeginAt: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  contractEndingAt: Date;
}
