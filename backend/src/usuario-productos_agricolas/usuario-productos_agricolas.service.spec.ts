import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { faker } from '@faker-js/faker';

import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';
import { UsuarioEntity } from '../models/usuario.entity';

import { UsuarioProductosAgricolasService } from './usuario-productos_agricolas.service';

describe('UsuarioProductosAgricolasService', () => {
    let service: UsuarioProductosAgricolasService;
    let productoAgricolaRepository: Repository<ProductoAgricolaEntity>;
    let usuarioRepository: Repository<UsuarioEntity>;
    let usuario: UsuarioEntity;
    let productosAgricolasList: ProductoAgricolaEntity[];

    const seedDataBase = async () => {
        productoAgricolaRepository.clear();
        usuarioRepository.clear();
    
        productosAgricolasList = [];
        for (let i = 0; i < 5; i++) {
            const productoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
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
        const roles = ['visitante', 'agricultor', 'artesano'];
        usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
            productosAgricola: productosAgricolasList
        });
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [...TypeOrmTestingConfig()],
          providers: [UsuarioProductosAgricolasService],
        }).compile();
    
        service = module.get<UsuarioProductosAgricolasService>(UsuarioProductosAgricolasService);
        usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
        productoAgricolaRepository = module.get<Repository<ProductoAgricolaEntity>>(getRepositoryToken(ProductoAgricolaEntity));
        await seedDataBase();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('deberia agregar un producto agricola a un usuario', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
        const roles = ['visitante', 'agricultor', 'artesano'];
        const newUsuario: UsuarioEntity = usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
        });
    
        const result: UsuarioEntity = await service.addProductoAgricolaToUsuario(newUsuario.id, newProductoAgricola.id);
        
        expect(result.productosAgricola.length).toBe(1);
        expect(result.productosAgricola[0]).not.toBeNull();
        expect(result.productosAgricola[0].nombre).toBe(newProductoAgricola.nombre);
        expect(result.productosAgricola[0].tipo).toBe(newProductoAgricola.tipo);
        expect(result.productosAgricola[0].descripcion).toBe(newProductoAgricola.descripcion);
        expect(result.productosAgricola[0].disponibilidad).toBe(newProductoAgricola.disponibilidad);
        expect(result.productosAgricola[0].precio).toBe(newProductoAgricola.precio);
        expect(result.productosAgricola[0].origen).toBe(newProductoAgricola.origen);
        expect(result.productosAgricola[0].temporada).toBe(newProductoAgricola.temporada);
        expect(result.productosAgricola[0].imagen).toBe(newProductoAgricola.imagen);

    });
    
    it('deberia lanzarse una excepción al intentar agregar un producto agricola inexistente a un usuario', async () => {
        const roles = ['visitante', 'agricultor', 'artesano'];
        const newUsuario: UsuarioEntity = usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
        });
        await expect(() => service.addProductoAgricolaToUsuario(newUsuario.id, 999)).rejects.toHaveProperty("message", "The producto agricola with the given id was not found");
    });
    
    it('deberia lanzar una excepción al intentar agregar un producto agricola a un usuario inexistente', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
        await expect(() => service.addProductoAgricolaToUsuario(999, newProductoAgricola.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found");
    });

    it('deberia devolver un producto agricola de un usuario', async () => {
        const productoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        const storedProductoAgricola: ProductoAgricolaEntity = await service.findProductoAgricolaByUsuarioIdProductoId(usuario.id, productoAgricola.id)
        expect(storedProductoAgricola).not.toBeNull();
        expect(storedProductoAgricola.nombre).toBe(productoAgricola.nombre);
        expect(storedProductoAgricola.tipo).toBe(productoAgricola.tipo);
        expect(storedProductoAgricola.descripcion).toBe(productoAgricola.descripcion);
        expect(storedProductoAgricola.disponibilidad).toBe(productoAgricola.disponibilidad);
        expect(storedProductoAgricola.precio).toBe(productoAgricola.precio);
        expect(storedProductoAgricola.origen).toBe(productoAgricola.origen);
        expect(storedProductoAgricola.temporada).toBe(productoAgricola.temporada);
        expect(storedProductoAgricola.imagen).toBe(productoAgricola.imagen);
    });
    
    it('deberia lanzar una excepción al intentar encontrar un producto agricola inexistente de un usuario', async () => {
        await expect(()=> service.findProductoAgricolaByUsuarioIdProductoId(usuario.id, 999)).rejects.toHaveProperty("message", "The producto agricola with the given id was not found"); 
    });
    
    it('deberia lanzar una excepcion al intentar encontrar un producto agricola de un usuario inexistente', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
        await expect(() => service.findProductoAgricolaByUsuarioIdProductoId(999, newProductoAgricola.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found");
    });
    
    it('deberia lanzar una excepcion al intentar encontrar un producto agricola que no esta asociado a un usuario', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
        const roles = ['visitante', 'agricultor', 'artesano'];
        const newUsuario: UsuarioEntity = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
        });
        await expect(()=> service.findProductoAgricolaByUsuarioIdProductoId(newUsuario.id, newProductoAgricola.id)).rejects.toHaveProperty("message", "The producto agricola with the given id was not asociated with the Usuario with the given id"); 
    });
    
    it('deberia encontrar todos los productos agricolas de un usuario', async () => {
        const products: ProductoAgricolaEntity[] = await service.findProductosAgricolasByUsuarioId(usuario.id);
        expect(products.length).toBe(5)
    });
    
    it('deberia lanzar una excepcion al intentar encontrar todos los productos agricolas de un usuario inexistente', async () => {
        await expect(()=> service.findProductosAgricolasByUsuarioId(999)).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia asociar un producto agricola a un usuario', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
        const updatedUsuario: UsuarioEntity = await service.associateProductosAgricolasUsuario(usuario.id, [newProductoAgricola]);
        expect(updatedUsuario.productosAgricola.length).toBe(1);
    
        expect(updatedUsuario.productosAgricola[0].nombre).toBe(newProductoAgricola.nombre);
        expect(updatedUsuario.productosAgricola[0].tipo).toBe(newProductoAgricola.tipo);
        expect(updatedUsuario.productosAgricola[0].descripcion).toBe(newProductoAgricola.descripcion);
        expect(updatedUsuario.productosAgricola[0].disponibilidad).toBe(newProductoAgricola.disponibilidad);
        expect(updatedUsuario.productosAgricola[0].precio).toBe(newProductoAgricola.precio);
        expect(updatedUsuario.productosAgricola[0].origen).toBe(newProductoAgricola.origen);
        expect(updatedUsuario.productosAgricola[0].temporada).toBe(newProductoAgricola.temporada);
        expect(updatedUsuario.productosAgricola[0].imagen).toBe(newProductoAgricola.imagen);
    });
    
    it('deberia lanzar una excepcion al intenter asociar un producto agricola a un usuario inexistente', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
        await expect(()=> service.associateProductosAgricolasUsuario(999, [newProductoAgricola])).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia lanzar una excepcion al intentar asociar un producto agricola inexistente a un usuario', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        newProductoAgricola.id = 999;
    
        await expect(()=> service.associateProductosAgricolasUsuario(usuario.id, [newProductoAgricola])).rejects.toHaveProperty("message", "The producto agricola with the given id was not found"); 
    });
    
    it('deberia eliminar un producto agricola de un usuario', async () => {
        const productoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        
        await service.deleteProductoAgricolaUsuario(usuario.id, productoAgricola.id);
    
        const storedUsuario: UsuarioEntity = await usuarioRepository.findOne({where: {id: usuario.id}, relations: ["productosAgricola"]});
        const deletedProductoAgricola: ProductoAgricolaEntity = storedUsuario.productosAgricola.find(a => a.id === productoAgricola.id);
    
        expect(deletedProductoAgricola).toBeUndefined();
    });
    
    it('deberia lanzar una excepcion al intentar eliminar un producto agricola inexistente de un usuario ', async () => {
        await expect(()=> service.deleteProductoAgricolaUsuario(usuario.id, 999)).rejects.toHaveProperty("message", "The producto agricola with the given id was not found"); 
    });
    
    it('deberia generar una excepción al intentar eliminar un producto agricola de un usuario inexistente', async () => {
        const productoAgricola: ProductoAgricolaEntity = productosAgricolasList[0];
        await expect(()=> service.deleteProductoAgricolaUsuario(999, productoAgricola.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia generar una excepcion al intentar eliminar un producto agricola no asociado al usuario', async () => {
        const newProductoAgricola: ProductoAgricolaEntity = await productoAgricolaRepository.save({
            nombre: faker.word.sample(),
            tipo: faker.word.sample(),
            descripcion: faker.lorem.sentence(),
            disponibilidad: true,
            precio: Number(faker.commerce.price()),
            origen: faker.word.sample(),
            temporada: faker.word.sample(),
            imagen: faker.image.url()
        });
    
        await expect(()=> service.deleteProductoAgricolaUsuario(usuario.id, newProductoAgricola.id)).rejects.toHaveProperty("message", "The producto agricola with the given id is not associated to the usuario"); 
    });

});