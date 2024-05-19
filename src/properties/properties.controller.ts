import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.createProperty(createPropertyDto);
  }

  @Get()
  findAllProperties() {
    return this.propertiesService.findAllProperties();
  }

  @Get(':id')
  findOneProperty(@Param('id') id: string) {
    return this.propertiesService.findProperty(id);
  }

  @Patch(':id')
  updateOneProperty(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.updateProperty(id, updatePropertyDto);
  }

  @Delete(':id')
  removeOneProperty(@Param('id') id: string) {
    return this.propertiesService.removeProperty(id);
  }
}
