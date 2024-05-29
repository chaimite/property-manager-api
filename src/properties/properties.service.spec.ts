import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { PropertiesService } from './properties.service';
import { SINGLE_PROPERTY, ARRAY_OF_PROPERTIES } from '../mocks/mock-data';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyStatus, PropertyType } from './enums/property.enums';
import { UpdatePropertyDto } from './dto/update-property.dto';

const propertyArray = ARRAY_OF_PROPERTIES;
const oneProperty = SINGLE_PROPERTY;

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: Repository<Property>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            createProperty: jest.fn().mockResolvedValue(oneProperty),
            findAllProperties: jest.fn().mockResolvedValue(propertyArray),
            findProperty: jest.fn().mockResolvedValue(oneProperty),
            findOneBy: jest.fn().mockResolvedValue(oneProperty),
            find: jest.fn().mockResolvedValue(propertyArray),
            save: jest.fn().mockResolvedValue(oneProperty),
            updateProperty: jest.fn().mockResolvedValue(true),
            removeProperty: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    repository = module.get<Repository<Property>>(getRepositoryToken(Property));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return an array of properties', async () => {
      const result = await service.findAllProperties();
      expect(result).toEqual(propertyArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });
  describe('createProperty', () => {
    it('should create a property', async () => {
      const createPropertyDto: CreatePropertyDto = {
        description: 'Test property',
        location: 'Test location',
        status: PropertyStatus.AvailableToRent,
        type: PropertyType.Commercial,
        contract_begin_at: new Date(),
        contract_ending_at: new Date(),
      };
      const result = await service.createProperty(createPropertyDto);
      expect(result).toEqual(SINGLE_PROPERTY);
      expect(repository.save).toHaveBeenCalledWith(createPropertyDto);
    });
  });

  describe('findProperty', () => {
    it('should return a single property', async () => {
      const result = await service.findProperty(SINGLE_PROPERTY.id);
      expect(result).toEqual(SINGLE_PROPERTY);
      expect(repository.findOneBy).toHaveBeenCalledWith({
        id: SINGLE_PROPERTY.id,
      });
    });
  });
  describe('updateProperty', () => {
    it('should update a property', async () => {
      const updatePropertyDto: UpdatePropertyDto = {
        description: 'Updated description',
        location: 'Updated location',
        status: SINGLE_PROPERTY.status,
        type: SINGLE_PROPERTY.type,
        contract_begin_at: new Date(),
        contract_ending_at: new Date(),
      };
      const result = await service.updateProperty(
        SINGLE_PROPERTY.id,
        updatePropertyDto,
      );
      expect(result).toEqual(SINGLE_PROPERTY);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining(updatePropertyDto),
      );
    });
  });

  describe('removeProperty', () => {
    it('should remove a property', async () => {
      const result = await service.removeProperty(SINGLE_PROPERTY.id);
      expect(result).toEqual({ affected: 1 });
      expect(repository.delete).toHaveBeenCalledWith(SINGLE_PROPERTY.id);
    });
  });
});
