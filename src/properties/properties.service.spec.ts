import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesService } from './properties.service';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const oneProperty = {
  id: 'some-uuid',
  description: 'Test property',
  location: 'Test location',
  status: 'Available',
  type: 'Residential',
  contract_begin_at: new Date(),
  contract_ending_at: new Date(),
};
const propertyArray = [oneProperty];

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
