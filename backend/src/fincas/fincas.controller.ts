import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { FincaService } from './fincas.service';
import { Finca } from './fincas.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateFincasDto } from './fincas.dto';
import { UpdateFincasDto } from './fincasU.dto';

@ApiTags('Finca')
@Controller('fincas')
export class FincaController {
  constructor(private readonly fincaService: FincaService) {}

  @Get()
  findAll(): Promise<Finca[]> {
    return this.fincaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Finca> {
    return this.fincaService.findOne(+id);
  }

  @Post()
  create(@Body() createFincaDto: CreateFincasDto): Promise<Finca> {
    return this.fincaService.create(createFincaDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFincaDto: UpdateFincasDto): Promise<Finca> {
    return this.fincaService.update(+id, updateFincaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fincaService.remove(+id);
  }
}
