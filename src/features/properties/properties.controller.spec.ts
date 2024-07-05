import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertyStatus, PropertyType } from '@prisma/client';

import { PropertiesService } from './properties.service';
import { SINGLE_PROPERTY, ARRAY_OF_PROPERTIES } from '../../mocks/mock-data';
import { PrismaService } from '../../../prisma/client/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

const propertyArrayMock = ARRAY_OF_PROPERTIES;
const onePropertyMock = SINGLE_PROPERTY;

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: PropertiesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        PrismaService,
        {
          provide: PropertiesService,
          useValue: {
            findAllProperties: jest.fn().mockResolvedValue(propertyArrayMock),
            findProperty: jest.fn().mockResolvedValue(onePropertyMock),
            createProperty: jest.fn().mockResolvedValue(onePropertyMock),
            updateProperty: jest.fn().mockResolvedValue(onePropertyMock),
            removeProperty: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();
    prisma = module.get<PrismaService>(PrismaService);
    controller = module.get<PropertiesController>(PropertiesController);
    service = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        description: 'Test property',
        location: 'Test location',
        status: PropertyStatus.Rented,
        type: PropertyType.Commercial,
        contractBeginAt: new Date(),
        contractEndingAt: new Date(),
      };
      expect(await controller.create(createPropertyDto)).toEqual(
        onePropertyMock,
      );
      expect(service.createProperty).toHaveBeenCalledWith(createPropertyDto);
    });
  });

  describe('findAllProperties', () => {
    it('should return an array of properties', async () => {
      expect(await controller.findAllProperties()).toEqual(propertyArrayMock);
      expect(service.findAllProperties).toHaveBeenCalled();
    });
  });

  describe('findOneProperty', () => {
    it('should return a single property', async () => {
      expect(await controller.findOneProperty('1')).toEqual(onePropertyMock);
      expect(service.findProperty).toHaveBeenCalledWith('1');
    });
  });

  describe('updateOneProperty', () => {
    it('should update a property', async () => {
      const updatePropertyDto: UpdatePropertyDto = {
        description: 'Updated description',
        userId: '1',
      };
      expect(
        await controller.updateOneProperty('1', updatePropertyDto),
      ).toEqual(onePropertyMock);
      expect(service.updateProperty).toHaveBeenCalledWith('1', {
        description: 'Updated description',
      });
    });
  });

  describe('removeOneProperty', () => {
    it('should remove a property', async () => {
      expect(await controller.removeOneProperty('1')).toEqual({ affected: 1 });
      expect(service.removeProperty).toHaveBeenCalledWith('1');
    });
  });
});
