import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { Prisma, Property } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async createProperty(
    createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    const { contractBeginAt, contractEndingAt, userId, ...rest } =
      createPropertyDto;
    const formattedData: Prisma.PropertyCreateInput = {
      ...rest,
      contractBeginAt: new Date(contractBeginAt),
      contractEndingAt: new Date(contractEndingAt),
      user: userId ? { connect: { id: userId } } : undefined,
    };
    return await this.prisma.property.create({
      data: formattedData,
    });
  }

  async findAllProperties(): Promise<Property[]> {
    return await this.prisma.property.findMany();
  }

  async findProperty(id: string): Promise<Property> {
    const result = await this.prisma.property.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`Could not find property with id ${id}`);
    }
    return result;
  }

  async updateProperty(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<void> {
    const existingProperty = await this.findProperty(id);

    if (!existingProperty) {
      throw new NotFoundException(`Could not find property with id ${id}`);
    }

    await this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async removeProperty(id: string): Promise<void> {
    const existingProperty = await this.findProperty(id);

    if (!existingProperty) {
      throw new NotFoundException(`Could not find property with id ${id}`);
    }

    await this.prisma.property.delete({ where: { id } });
  }
}
