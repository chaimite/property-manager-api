import { Injectable } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
// import { prisma } from '../prisma';

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
    return await this.prisma.property.findUnique({
      where: propertyWhereUniqueInput,
    });
  }

  async updateProperty(params: {
    where: Prisma.PropertyWhereUniqueInput;
    data: Prisma.PropertyUpdateInput;
  }): Promise<Property> {
    const { where, data } = params;
    return await this.prisma.property.update({
      data,
      where,
    });
  }

  async removeProperty(
    where: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property> {
    return await this.prisma.property.delete({ where });
  }

  private formatDate(dateString: string): Date {
    return new Date(`${dateString}T00:00:00.000Z`);
  }
}
