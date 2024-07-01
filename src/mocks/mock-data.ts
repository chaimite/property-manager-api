import { PropertyStatus, PropertyType, Property } from '@prisma/client';

export const SINGLE_PROPERTY: Property = {
  id: '1',
  description: 'Test property',
  location: 'Test location',
  status: PropertyStatus.Rented,
  type: PropertyType.Residential,
  contractBeginAt: new Date(),
  contractEndingAt: new Date(),
  userId: '2',
};

const PROPERTIES: Property[] = [
  {
    id: '2',
    description: 'A really nice test property available for rent',
    location: 'Another fake location',
    status: PropertyStatus.AvailableToRent,
    type: PropertyType.Residential,
    contractBeginAt: new Date(),
    contractEndingAt: new Date(),
    userId: '2',
  },
  {
    id: '3',
    description: 'Property not for rent',
    location: 'Another fake location',
    status: PropertyStatus.NotForRent,
    type: PropertyType.Residential,
    contractBeginAt: new Date(),
    contractEndingAt: new Date(),
    userId: '2',
  },
  {
    id: '4',
    description: 'A really nice test property available for rent',
    location: 'Another fake location',
    status: PropertyStatus.AvailableToRent,
    type: PropertyType.Residential,
    contractBeginAt: new Date(),
    contractEndingAt: new Date(),
    userId: '2',
  },
];

export const ARRAY_OF_PROPERTIES = [SINGLE_PROPERTY, ...PROPERTIES];
