import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { PrismaService } from '../../prisma/client/prisma.service';
import { SINGLE_PROPERTY, ARRAY_OF_PROPERTIES } from '../mocks/mock-data';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { NotFoundException } from '@nestjs/common';
import { PropertyStatus, PropertyType, Prisma } from '@prisma/client';

const propertyArray = ARRAY_OF_PROPERTIES;
const oneProperty = SINGLE_PROPERTY;

describe('PropertiesService', () => {
  let service: PropertiesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: PrismaService,
          useValue: {
            property: {
              create: jest.fn().mockResolvedValue(oneProperty),
              findUnique: jest.fn().mockResolvedValue(oneProperty),
              findMany: jest.fn().mockResolvedValue(propertyArray),
              update: jest.fn().mockResolvedValue(oneProperty),
              delete: jest.fn().mockResolvedValue(oneProperty),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllProperties', () => {
    it('should return an array of properties', async () => {
      const result = await service.findAllProperties();

      expect(result).toEqual(propertyArray);
      expect(prisma.property.findMany).toHaveBeenCalled();
    });
  });

  describe('createProperty', () => {
    it('should create a property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        description: 'Test property',
        location: 'Test location',
        status: PropertyStatus.AvailableToRent,
        type: PropertyType.Commercial,
        contractBeginAt: new Date(),
        contractEndingAt: new Date(),
      };

      const result = await service.createProperty(
        createPropertyDto as Prisma.PropertyCreateInput,
      );

      expect(result).toEqual(SINGLE_PROPERTY);
      expect(prisma.property.create).toHaveBeenCalledWith({
        data: expect.objectContaining(createPropertyDto),
      });
    });
  });

  describe('findProperty', () => {
    it('should return a single property', async () => {
      const result = await service.findProperty({ id: SINGLE_PROPERTY.id });

      expect(result).toEqual(SINGLE_PROPERTY);
      expect(prisma.property.findUnique).toHaveBeenCalledWith({
        where: { id: SINGLE_PROPERTY.id },
      });
    });

    it('should throw NotFoundException if property not found', async () => {
      jest.spyOn(prisma.property, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findProperty({ id: 999 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProperty', () => {
    it('should update a property', async () => {
      const updatePropertyDto: UpdatePropertyDto = {
        description: 'Updated description',
        location: 'Updated location',
        status: SINGLE_PROPERTY.status,
        type: SINGLE_PROPERTY.type,
        contractBeginAt: new Date(),
        contractEndingAt: new Date(),
      };

      const result = await service.updateProperty({
        where: { id: SINGLE_PROPERTY.id },
        data: updatePropertyDto,
      });

      expect(result).toEqual(SINGLE_PROPERTY);
      expect(prisma.property.update).toHaveBeenCalledWith({
        where: { id: SINGLE_PROPERTY.id },
        data: expect.objectContaining(updatePropertyDto),
      });
    });

    it.skip('should throw NotFoundException if property not found', async () => {
      jest.spyOn(prisma.property, 'findUnique').mockResolvedValueOnce(null);

      await expect(
        service.updateProperty({
          where: { id: 999 },
          data: { description: 'Updated the description' },
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeProperty', () => {
    it('should remove a property', async () => {
      await service.removeProperty({ id: SINGLE_PROPERTY.id });

      expect(prisma.property.delete).toHaveBeenCalledWith({
        where: { id: SINGLE_PROPERTY.id },
      });
    });
  });
});
