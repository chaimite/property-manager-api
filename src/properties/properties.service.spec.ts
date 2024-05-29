import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { PropertiesService } from './properties.service';
import { SINGLE_PROPERTY, ARRAY_OF_PROPERTIES } from '../mocks/mock-data';

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
            find: jest.fn().mockResolvedValue(propertyArray),
            updateProperty: jest.fn().mockResolvedValue(true),
            removeProperty: jest.fn().mockResolvedValue(true),
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

  describe('findAllProperties', () => {
    it('should return an array of properties', async () => {
      const result = await service.findAllProperties();
      expect(result).toEqual(propertyArray);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
