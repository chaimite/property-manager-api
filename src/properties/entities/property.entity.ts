import { PropertyStatus, PropertyType } from '@prisma/client';

export class Property {
  id: number;

  description: string;

  type: PropertyType;

  status: PropertyStatus;

  location: string;

  contractBeginAt: Date;

  contractEndingAt: Date;
}
