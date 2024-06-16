import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { Prisma, Property } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    const formattedData = {
      ...data,
      contractBeginAt:
        typeof data.contractBeginAt === 'string'
          ? (this.formatDate(data.contractBeginAt) as unknown as string)
          : data.contractBeginAt,
      contractEndingAt:
        typeof data.contractEndingAt === 'string'
          ? (this.formatDate(data.contractEndingAt) as unknown as string)
          : data.contractEndingAt,
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

  private formatDate(dateString: string): Date {
    return new Date(`${dateString}T00:00:00.000Z`);
  }
}
