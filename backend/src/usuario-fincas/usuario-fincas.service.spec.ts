import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { faker } from '@faker-js/faker';

import { Finca } from '../fincas/fincas.entity';
import { UsuarioEntity } from '../models/usuario.entity';

import { UsuarioFincasService } from './usuario-fincas.service';

describe('UsuarioFincasService', () => {

    let service: UsuarioFincasService;
    let fincaRepository: Repository<Finca>;
    let usuarioRepository: Repository<UsuarioEntity>;
    let usuario: UsuarioEntity;
    let fincasList: Finca[];

    const seedDataBase = async () => {
        fincaRepository.clear();
        usuarioRepository.clear();
    
        fincasList = [];
        for (let i = 0; i < 5; i++) {
            const finca: Finca = await fincaRepository.save({
                nombre: faker.word.sample(),
                ubicacion: faker.word.sample(),
                servicios: faker.word.sample(),
                precio: faker.number.int(),
                capacidad: faker.number.int(),
                descripcion: faker.lorem.sentence(),
                imagen: faker.image.url(),
                disponibilidad: true
            });
            fincasList.push(finca);
        }
        const roles = ['visitante', 'agricultor', 'artesano'];
        usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
            fincas: fincasList
        });
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [...TypeOrmTestingConfig()],
          providers: [UsuarioFincasService],
        }).compile();
    
        service = module.get<UsuarioFincasService>(UsuarioFincasService);
        usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
        fincaRepository = module.get<Repository<Finca>>(getRepositoryToken(Finca));
        await seedDataBase();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('deberia agregar una finca a un usuario', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
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
    
        const result: UsuarioEntity = await service.addFincaToUsuario(newUsuario.id, newFinca.id);
        
        expect(result.fincas.length).toBe(1);
        expect(result.fincas[0]).not.toBeNull();
        expect(result.fincas[0].nombre).toBe(newFinca.nombre);
        expect(result.fincas[0].ubicacion).toBe(newFinca.ubicacion);
        expect(result.fincas[0].servicios).toBe(newFinca.servicios);
        expect(result.fincas[0].precio).toBe(newFinca.precio);
        expect(result.fincas[0].capacidad).toBe(newFinca.capacidad);
        expect(result.fincas[0].descripcion).toBe(newFinca.descripcion);
        expect(result.fincas[0].imagen).toBe(newFinca.imagen);
        expect(result.fincas[0].disponibilidad).toBe(newFinca.disponibilidad);
    });
    
    it('deberia lanzarse una excepción al intentar agregar una finca inexistente a un usuario', async () => {
        const roles = ['visitante', 'agricultor', 'artesano'];
        const newUsuario: UsuarioEntity = usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
        });
        await expect(() => service.addFincaToUsuario(newUsuario.id, 999)).rejects.toHaveProperty("message", "The finca with the given id was not found");
    });
    
    it('deberia lanzar una excepción al intentar agregar una finca a un usuario inexistente', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
        });
        await expect(() => service.addFincaToUsuario(999, newFinca.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found");
    });
    
    it('deberia devolver una finca de un usuario', async () => {
        const finca: Finca = fincasList[0];
        const storedFinca: Finca = await service.findFincaByUsuarioIdFincaId(usuario.id, finca.id)
        expect(storedFinca).not.toBeNull();
        expect(storedFinca.nombre).toBe(finca.nombre);
        expect(storedFinca.ubicacion).toBe(finca.ubicacion);
        expect(storedFinca.servicios).toBe(finca.servicios);
        expect(storedFinca.precio).toBe(finca.precio);
        expect(storedFinca.capacidad).toBe(finca.capacidad);
        expect(storedFinca.descripcion).toBe(finca.descripcion);
        expect(storedFinca.imagen).toBe(finca.imagen);
        expect(storedFinca.disponibilidad).toBe(finca.disponibilidad);
    });
    
    it('deberia lanzar una excepción al intentar encontrar una finca inexistente de un usuario', async () => {
        await expect(()=> service.findFincaByUsuarioIdFincaId(usuario.id, 999)).rejects.toHaveProperty("message", "The finca with the given id was not found"); 
    });
    
    it('deberia lanzar una excepcion al intentar encontrar una finca de un usuario inexistente', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
        });
        await expect(() => service.findFincaByUsuarioIdFincaId(999, newFinca.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found");
    });
    
    it('deberia lanzar una excepcion al intentar encontrar una finca que no esta asociada a un usuario', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
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
        await expect(()=> service.findFincaByUsuarioIdFincaId(newUsuario.id, newFinca.id)).rejects.toHaveProperty("message", "The finca with the given id was not asociated with the Usuario with the given id"); 
    });
    
    it('deberia encontrar todas las fincas de un usuario', async () => {
        const fins: Finca[] = await service.findFincasByUsuarioId(usuario.id);
        expect(fins.length).toBe(5)
    });
    
    it('deberia lanzar una excepcion al intentar encontrar todas las fincas de un usuario inexistente', async () => {
        await expect(()=> service.findFincasByUsuarioId(999)).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });

    it('deberia asociar una finca a un usuario', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
        });
        const updatedUsuario: UsuarioEntity = await service.associateFincasUsuario(usuario.id, [newFinca]);
        expect(updatedUsuario.fincas.length).toBe(1);
    
        expect(updatedUsuario.fincas[0].nombre).toBe(newFinca.nombre);
        expect(updatedUsuario.fincas[0].ubicacion).toBe(newFinca.ubicacion);
        expect(updatedUsuario.fincas[0].servicios).toBe(newFinca.servicios);
        expect(updatedUsuario.fincas[0].precio).toBe(newFinca.precio);
        expect(updatedUsuario.fincas[0].capacidad).toBe(newFinca.capacidad);
        expect(updatedUsuario.fincas[0].descripcion).toBe(newFinca.descripcion);
        expect(updatedUsuario.fincas[0].imagen).toBe(newFinca.imagen);
        expect(updatedUsuario.fincas[0].disponibilidad).toBe(newFinca.disponibilidad);
    });
    
    it('deberia lanzar una excepcion al intenter asociar una finca a un usuario inexistente', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
        });
        await expect(()=> service.associateFincasUsuario(999, [newFinca])).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia lanzar una excepcion al intentar asociar una finca inexistente a un usuario', async () => {
        const newFinca: Finca = fincasList[0];
        newFinca.id = 999;
    
        await expect(()=> service.associateFincasUsuario(usuario.id, [newFinca])).rejects.toHaveProperty("message", "The finca with the given id was not found"); 
    });
    
    it('deberia eliminar una finca de un usuario', async () => {
        const finca: Finca = fincasList[0];
        
        await service.deleteFincaUsuario(usuario.id, finca.id);
    
        const storedUsuario: UsuarioEntity = await usuarioRepository.findOne({where: {id: usuario.id}, relations: ["fincas"]});
        const deletedFinca: Finca = storedUsuario.fincas.find(a => a.id === finca.id);
    
        expect(deletedFinca).toBeUndefined();
    });
    
    it('deberia lanzar una excepcion al intentar eliminar una finca inexistente de un usuario ', async () => {
        await expect(()=> service.deleteFincaUsuario(usuario.id, 999)).rejects.toHaveProperty("message", "The finca with the given id was not found"); 
    });
    
    it('deberia generar una excepción al intentar eliminar una finca de un usuario inexistente', async () => {
        const finca: Finca = fincasList[0];
        await expect(()=> service.deleteFincaUsuario(999, finca.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia generar una excepcion al intentar eliminar una finca no asociada al usuario', async () => {
        const newFinca: Finca = await fincaRepository.save({
            nombre: faker.word.sample(),
            ubicacion: faker.word.sample(),
            servicios: faker.word.sample(),
            precio: faker.number.int(),
            capacidad: faker.number.int(),
            descripcion: faker.lorem.sentence(),
            imagen: faker.image.url(),
            disponibilidad: true
        });
    
        await expect(()=> service.deleteFincaUsuario(usuario.id, newFinca.id)).rejects.toHaveProperty("message", "The finca with the given id is not associated to the usuario"); 
    });
});