import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { PropertiesService } from './properties.service';
import { SINGLE_PROPERTY, ARRAY_OF_PROPERTIES } from '../mocks/mock-data';
import { CreatePropertyDto } from './dto/create-property.dto';
import { PropertyStatus, PropertyType } from './enums/property.enums';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { NotFoundException } from '@nestjs/common';

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
            create: jest.fn().mockResolvedValue(oneProperty),
            findOneBy: jest.fn().mockResolvedValue(oneProperty),
            find: jest.fn().mockResolvedValue(propertyArray),
            save: jest.fn().mockResolvedValue(oneProperty),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            merge: jest
              .fn()
              .mockImplementation((entity, dto) => Object.assign(entity, dto)),
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
      expect(repository.create).toHaveBeenCalledWith(createPropertyDto);
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
    it('should throw NotFoundException if property not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.findProperty('nonexistent-id')).rejects.toThrow(
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
    it('should throw NotFoundException if property not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(
        service.updateProperty('nonexistent-id', { description: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
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
