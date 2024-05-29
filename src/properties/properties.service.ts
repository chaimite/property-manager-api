import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createProperty(
    createPropertyDto: CreatePropertyDto,
  ): Promise<Property> {
    const property: Property =
      this.propertyRepository.create(createPropertyDto);
    return await this.propertyRepository.save(property);
  }

  async findAllProperties(): Promise<Property[]> {
    return await this.propertyRepository.find();
  }

  async findProperty(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOneBy({ id });
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} was not found.`);
    }

    return this.propertyRepository.findOneBy({ id });
  }

  async updateProperty(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const property = await this.findProperty(id);
    this.propertyRepository.merge(property, updatePropertyDto);
    return await this.propertyRepository.save(property);
  }

  async removeProperty(id: string): Promise<{ affected?: number }> {
    const result = await this.propertyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return result;
  }
}
