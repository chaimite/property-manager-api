import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}
  createProperty(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property: Property = new Property();
    property.description = createPropertyDto.description;
    property.location = createPropertyDto.location;
    property.status = createPropertyDto.status;
    property.type = createPropertyDto.type;
    property.contract_begin_at = createPropertyDto.contract_begin_at;
    property.contract_ending_at = createPropertyDto.contract_ending_at;
    return this.propertyRepository.save(property);
  }

  findAllProperties(): Promise<Property[]> {
    return this.propertyRepository.find();
  }

  findProperty(id: string): Promise<Property> {
    return this.propertyRepository.findOneBy({ id });
  }

  updateProperty(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property: Property = new Property();
    property.description = updatePropertyDto.description;
    property.location = updatePropertyDto.location;
    property.status = updatePropertyDto.status;
    property.type = updatePropertyDto.type;
    property.contract_begin_at = updatePropertyDto.contract_begin_at;
    property.contract_ending_at = updatePropertyDto.contract_ending_at;
    property.id = id;
    return this.propertyRepository.save(property);
  }

  removeProperty(id: string): Promise<{ affected?: number }> {
    return this.propertyRepository.delete(id);
  }
}
