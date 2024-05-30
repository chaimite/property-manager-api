import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a property to be managed' })
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertiesService.createProperty(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieves all managed properties' })
  async findAllProperties() {
    return await this.propertiesService.findAllProperties();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Finds a managed property' })
  async findOneProperty(@Param('id') id: number) {
    return await this.propertiesService.findProperty({ id });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patches data in managed property' })
  async updateOneProperty(
    @Param('id') id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return await this.propertiesService.updateProperty({
      where: { id },
      data: updatePropertyDto,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a managed property' })
  async removeOneProperty(@Param('id') id: number) {
    return await this.propertiesService.removeProperty({ id });
  }
}
