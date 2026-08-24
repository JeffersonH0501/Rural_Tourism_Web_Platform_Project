import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CreateProductoAgricolaDto, UpdateProductoAgricolaDto } from './producto_agricola.dto';
import { ProductoAgricolaService } from './producto_agricola.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProductoAgricolaEntity } from './producto_agricola.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ProducosAgricolas')
@Controller('productos_agricolas')
export class ProductoAgricolaController {
    constructor(private readonly productoAgricolaService: ProductoAgricolaService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createProductoAgricolaDto: CreateProductoAgricolaDto): Promise<ProductoAgricolaEntity> {
        return this.productoAgricolaService.create(createProductoAgricolaDto);
    }

    @Get()
    async findAll(): Promise<ProductoAgricolaEntity[]> {
        return this.productoAgricolaService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProductoAgricolaEntity> {
        return this.productoAgricolaService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductoAgricolaDto: UpdateProductoAgricolaDto): Promise<ProductoAgricolaEntity> {
        return this.productoAgricolaService.update(+id, updateProductoAgricolaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<String> {
        return this.productoAgricolaService.delete(id);
    }
}