import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { ProductoAgricolaEntity } from './producto_agricola.entity';

import { ProductoAgricolaService } from './producto_agricola.service';

describe('ProductoAgricolaService', () => {
    let service: ProductoAgricolaService;
    let repository: Repository<ProductoAgricolaEntity>;
    let productosAgricolasList: ProductoAgricolaEntity[];

    const seedDatabase = async () => {
        repository.clear();
        
        productosAgricolasList = [];
        for(let i = 0; i < 4; i++){
            const productoAgricola: ProductoAgricolaEntity = await repository.save({
                nombre: faker.word.sample(),
                tipo: faker.word.sample(),
                descripcion: faker.lorem.sentence(),
                disponibilidad: true,
                precio: Number(faker.commerce.price()),
                origen: faker.word.sample(),
                temporada: faker.word.sample(),
                imagen: faker.image.url()
            });
            productosAgricolasList.push(productoAgricola);
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [ProductoAgricolaService]
        }).compile();

        service = module.get<ProductoAgricolaService>(ProductoAgricolaService);
        repository = module.get<Repository<ProductoAgricolaEntity>>(getRepositoryToken(ProductoAgricolaEntity));
        await seedDatabase();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('deberia encontrar todos los Productos Agricolas', async () => {
        const productosAgricolas: ProductoAgricolaEntity[] = await service.findAll();
        expect(productosAgricolas).not.toBeNull();
        expect(productosAgricolas).toHaveLength(productosAgricolasList.length);
    });

    it('deberia encontrar un Producto Agricola por su id', async () => {
        const storedProductoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        const productoAgricola: ProductoAgricolaEntity = await service.findOne(storedProductoAgricola.id);
        expect(productoAgricola).not.toBeNull();
        expect(productoAgricola.nombre).toEqual(storedProductoAgricola.nombre);
        expect(productoAgricola.tipo).toEqual(storedProductoAgricola.tipo);
        expect(productoAgricola.descripcion).toEqual(storedProductoAgricola.descripcion);
        expect(productoAgricola.precio).toEqual(storedProductoAgricola.precio);
        expect(productoAgricola.origen).toEqual(storedProductoAgricola.origen);
        expect(productoAgricola.temporada).toEqual(storedProductoAgricola.temporada);
        expect(productoAgricola.imagen).toEqual(storedProductoAgricola.imagen);
    });

    it('deberia lanzar un NotFoundException al intentar encontrar un Producto Agricola con un id inexistente', async () => {
        try {
            await service.findOne(999);
            fail('se esperaba que lanzara un NotFoundException');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });

    it('deberia crear un Producto Agricola con datos validos', async () => {
        const productoAgricola: ProductoAgricolaEntity = {
            id: 1,
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url(),
            usuario: null,
            elementoPromocionable: null
        }

        const newProductoAgricola: ProductoAgricolaEntity = await service.create(productoAgricola);
        expect(newProductoAgricola).not.toBeNull();

        const storedProductoAgricola: ProductoAgricolaEntity = await repository.findOne({ where: {id:newProductoAgricola.id} });
        expect(storedProductoAgricola).not.toBeNull();
        expect(storedProductoAgricola.nombre).toEqual(newProductoAgricola.nombre);
        expect(storedProductoAgricola.tipo).toEqual(newProductoAgricola.tipo);
        expect(storedProductoAgricola.descripcion).toEqual(newProductoAgricola.descripcion);
        expect(storedProductoAgricola.disponibilidad).toEqual(newProductoAgricola.disponibilidad);
        expect(storedProductoAgricola.precio).toEqual(newProductoAgricola.precio);
        expect(storedProductoAgricola.origen).toEqual(newProductoAgricola.origen);
        expect(storedProductoAgricola.temporada).toEqual(newProductoAgricola.temporada);
        expect(storedProductoAgricola.imagen).toEqual(newProductoAgricola.imagen);
    });

    it('deberia actualizar un Producto Agricola', async () => {
        const productoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        productoAgricola.nombre = faker.word.sample();
        productoAgricola.descripcion = faker.lorem.sentence();
        const updatedProductoAgricola: ProductoAgricolaEntity = await service.update(productoAgricola.id, productoAgricola);
        expect(updatedProductoAgricola).not.toBeNull();
        const storedProductoAgricola: ProductoAgricolaEntity = await repository.findOne({ where: { id:productoAgricola.id } });
        expect(storedProductoAgricola).not.toBeNull();
        expect(storedProductoAgricola.nombre).toEqual(productoAgricola.nombre);
        expect(storedProductoAgricola.descripcion).toEqual(productoAgricola.descripcion);
    });
    
    it('deberia lanzar un NotFoundException al intentar actualizar un Producto Agricola que no existe', async () => {
        try {
            let productoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
            productoAgricola = {...productoAgricola, nombre: "New name", descripcion: "New address"}
            await service.update(999, productoAgricola);
            fail('se esperaba que lanzara un NotFoundException');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
    
    it('deberia eliminar un Producto Agricola por su id', async () => {
        const productoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        await service.delete(productoAgricola.id);
        const deletedProductoAgricola: ProductoAgricolaEntity = await repository.findOne({ where: { id:productoAgricola.id } })
        expect(deletedProductoAgricola).toBeNull();
    });
    
    it('deberia lanzar un NotFoundException al intentar eliminar un Producto Agricola que no existe', async () => {
        try {
            await service.delete(999);
            fail('se esperaba que lanzara un NotFoundException');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});