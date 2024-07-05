import { IsString, IsEnum, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType, PropertyStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Casa de Alfama' })
  @IsString()
  description: string;

  @ApiProperty({ name: 'type', enum: PropertyType })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ enumName: 'PropertyStatus', enum: PropertyStatus })
  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @ApiProperty({ example: 'Rua do Carmo' })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'needs to be a user id to be associated with',
    example: randomUUID(),
  })
  @IsString()
  userId?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  contractBeginAt: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  contractEndingAt: Date;
}
