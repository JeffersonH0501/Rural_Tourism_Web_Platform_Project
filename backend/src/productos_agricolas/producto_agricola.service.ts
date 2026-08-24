import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductoAgricolaEntity } from './producto_agricola.entity';
import { ElementoPromocionable } from '../elemento-promocionable/elemento-promocionable.entity';
import { CreateProductoAgricolaDto, UpdateProductoAgricolaDto } from './producto_agricola.dto';

import { faker } from '@faker-js/faker';

@Injectable()
export class ProductoAgricolaService {

    constructor(
        @InjectRepository(ProductoAgricolaEntity)
        private readonly productoAgricolaRepository: Repository<ProductoAgricolaEntity>,
        @InjectRepository(ElementoPromocionable)
        private readonly elementoPromocionableRepository: Repository<ElementoPromocionable>,
    ) {}

    async findAll(): Promise<ProductoAgricolaEntity[]> {
        return await this.productoAgricolaRepository.find({ relations: ['usuario', 'elementoPromocionable'] });
    }

    async findOne(id: number): Promise<ProductoAgricolaEntity> {
        const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({ where: { id }, relations: ['usuario', 'elementoPromocionable'] });
        if (!productoAgricola) {
            throw new NotFoundException(`Producto Agricola con id ${id} no encontrado`);
        }
        return productoAgricola;
    }

    async create(createProductoAgricolaDto: CreateProductoAgricolaDto): Promise<ProductoAgricolaEntity> {
        const productoAgricola = this.productoAgricolaRepository.create(createProductoAgricolaDto);

        if (createProductoAgricolaDto.elementoPromocionableId) {
            const elementoPromocionable = await this.elementoPromocionableRepository.findOne({ where: { id: createProductoAgricolaDto.elementoPromocionableId } });
            if (elementoPromocionable) {
                productoAgricola.elementoPromocionable = elementoPromocionable;
            }
        }

        return await this.productoAgricolaRepository.save(productoAgricola);
    }

    async update(id: number, updateProductoAgricolaDto: UpdateProductoAgricolaDto): Promise<ProductoAgricolaEntity> {
        const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({ where: { id }, relations: ['usuario', 'elementoPromocionable'] });
        if (!productoAgricola) {
            throw new NotFoundException(`Producto Agricola con id ${id} no encontrado`);
        }
        this.productoAgricolaRepository.merge(productoAgricola, updateProductoAgricolaDto);

        if (updateProductoAgricolaDto.elementoPromocionableId) {
            const elementoPromocionable = await this.elementoPromocionableRepository.findOne({ where: { id: updateProductoAgricolaDto.elementoPromocionableId } });
            if (elementoPromocionable) {
                productoAgricola.elementoPromocionable = elementoPromocionable;
            }
        }

        return await this.productoAgricolaRepository.save(productoAgricola);
    }

    async delete(id: number): Promise<string> {
        const productoAgricola: ProductoAgricolaEntity = await this.productoAgricolaRepository.findOne({ where: { id } });
        if (!productoAgricola) {
            throw new NotFoundException(`Producto Agricola con id ${id} no encontrado`);
        }
        await this.productoAgricolaRepository.remove(productoAgricola);
        return 'Producto Agricola eliminado con exito!';
    }

    async onModuleInit() {
        await this.seedProductosAgricolas();
    }

    private async seedProductosAgricolas() {
        for (let i = 0; i < 10; i++){
            await this.productoAgricolaRepository.save({
                nombre: faker.word.sample(),
                tipo: faker.word.sample(),
                descripcion: faker.lorem.sentence(),
                disponibilidad: true,
                precio: Number(faker.commerce.price()),
                origen: faker.word.sample(),
                temporada: faker.word.sample(),
                imagen: faker.image.url()
            });
        }
    }
}