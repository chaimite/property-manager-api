import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
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

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: PropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: {
            create: jest.fn().mockImplementation(() => {
              Promise.resolve(propertyArray);
            }),
            findAllProperties: jest.fn().mockImplementation(() => {
              Promise.resolve(propertyArray);
            }),
            findOneProperty: jest.fn().mockImplementation(() => {
              Promise.resolve(oneProperty);
            }),
            updateOneProperty: jest.fn().mockResolvedValue(true),
            removeOneProperty: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
    service = module.get<PropertiesService>(PropertiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllProperties', () => {
    it('should return an array of properties', async () => {
      await controller.findAllProperties();
      expect(service.findAllProperties).toHaveBeenCalled();
    });
  });
});
