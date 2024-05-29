import { Property } from '../properties/entities/property.entity';
import {
  PropertyStatus,
  PropertyType,
} from '../properties/enums/property.enums';

export const SINGLE_PROPERTY: Property = {
  id: '1',
  description: 'Test property',
  location: 'Test location',
  status: PropertyStatus.Rented,
  type: PropertyType.Residential,
  contract_begin_at: new Date(),
  contract_ending_at: new Date(),
  generateId: () => {},
};

const PROPERTIES: Property[] = [
  {
    id: '2',
    description: 'A really nice test property available for rent',
    location: 'Another fake location',
    status: PropertyStatus.AvailableToRent,
    type: PropertyType.Residential,
    contract_begin_at: new Date(),
    contract_ending_at: new Date(),
    generateId: () => {},
  },
  {
    id: '3',
    description: 'Property not for rent',
    location: 'Another fake location',
    status: PropertyStatus.NotForRent,
    type: PropertyType.Residential,
    contract_begin_at: new Date(),
    contract_ending_at: new Date(),
    generateId: () => {},
  },
  {
    id: '3',
    description: 'A really nice test property available for rent',
    location: 'Another fake location',
    status: PropertyStatus.AvailableToRent,
    type: PropertyType.Residential,
    contract_begin_at: new Date(),
    contract_ending_at: new Date(),
    generateId: () => {},
  },
];

export const ARRAY_OF_PROPERTIES = [SINGLE_PROPERTY, ...PROPERTIES];
