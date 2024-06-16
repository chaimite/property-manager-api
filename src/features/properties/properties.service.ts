import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { Prisma, Property } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    const formattedData = {
      ...data,
      contractBeginAt: new Date(data.contractBeginAt),
      contractEndingAt: new Date(data.contractEndingAt),
    };
    return await this.prisma.property.create({
      data: formattedData,
    });
  }

  async findAllProperties(): Promise<Property[]> {
    return await this.prisma.property.findMany();
  }

  async findProperty(
    propertyWhereUniqueInput: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property> {
    const result = await this.prisma.property.findUnique({
      where: propertyWhereUniqueInput,
    });
    if (!result) {
      throw new NotFoundException(
        `Could not find property with id ${propertyWhereUniqueInput.id}`,
      );
    }
    return result;
  }

  async updateProperty(params: {
    where: Prisma.PropertyWhereUniqueInput;
    data: Prisma.PropertyUpdateInput;
  }): Promise<void> {
    const { where, data } = params;

    await this.findProperty(where);

    await this.prisma.property.update({
      data,
      where,
    });
  }

  async removeProperty(where: Prisma.PropertyWhereUniqueInput): Promise<void> {
    await this.findProperty(where);
    await this.prisma.property.delete({ where });
  }
}
