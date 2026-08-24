import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { UsuarioEntity } from './usuario.entity';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
    let service: UsuarioService;
    let repository: Repository<UsuarioEntity>;
    let usuariosList: UsuarioEntity[];

    const seedDatabase = async () => {
        repository.clear();
        
        usuariosList = [];
        const roles = ["visitante", "agricultor", "artesano"]
        for(let i = 0; i < 4; i++){
            const usuario: UsuarioEntity = await repository.save({
                nombre: faker.word.sample(),
                apellido: faker.word.sample(),
                foto: faker.image.url(),
                correo: faker.word.sample() + "@uniandes.edu.co",
                contraseña: faker.word.sample(),
                rol: roles[Math.floor(Math.random() * roles.length)],
            });
            usuariosList.push(usuario);
        }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [UsuarioService]
        }).compile();

        service = module.get<UsuarioService>(UsuarioService);
        repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
        await seedDatabase();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('deberia encontrar todos los Usuarios', async () => {
        const usuarios: UsuarioEntity[] = await service.findAll();
        expect(usuarios).not.toBeNull();
        expect(usuarios).toHaveLength(usuariosList.length);
    });

    it('deberia encontrar un Usuario por su id', async () => {
        const storedUsuario: UsuarioEntity = usuariosList[0];
        const usuario: UsuarioEntity = await service.findOne(storedUsuario.id);
        expect(usuario).not.toBeNull();
        expect(usuario.nombre).toEqual(storedUsuario.nombre);
        expect(usuario.apellido).toEqual(storedUsuario.apellido);
        expect(usuario.foto).toEqual(storedUsuario.foto);
        expect(usuario.correo).toEqual(storedUsuario.correo);
        expect(usuario.contraseña).toEqual(storedUsuario.contraseña);
        expect(usuario.rol).toEqual(storedUsuario.rol);
    });

    it('deberia lanzar un NotFoundException al intentar encontrar un Usuario con un id inexistente', async () => {
        try {
            await service.findOne(999);
            fail('se esperaba que lanzara un NotFoundException');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });

    it('deberia crear un Usuario con datos validos', async () => {
        const roles = ["visitante", "agricultor", "artesano"]
        const usuario: UsuarioEntity = {
            id: 1,
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + "@uniandes.edu.co",
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
            productosAgricola: null,
            artesanias: null,
            fincas: null
        }

        const newUsuario: UsuarioEntity = await service.create(usuario);
        expect(newUsuario).not.toBeNull();

        const storedUsuario: UsuarioEntity = await repository.findOne({ where: {id:newUsuario.id} });
        expect(storedUsuario).not.toBeNull();
        expect(storedUsuario.nombre).toEqual(newUsuario.nombre);
        expect(storedUsuario.apellido).toEqual(newUsuario.apellido);
        expect(storedUsuario.foto).toEqual(newUsuario.foto);
        expect(storedUsuario.correo).toEqual(newUsuario.correo);
        expect(storedUsuario.contraseña).toEqual(newUsuario.contraseña);
        expect(storedUsuario.rol).toEqual(newUsuario.rol);
    });

    it('debería lanzar una BadRequestException al intentar crear un usuario con datos inválidos', async () => {
        const usuario: UsuarioEntity = {
            id: 1,
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + "@uniandes.edu.co",
            contraseña: faker.word.sample(),
            rol: faker.word.sample(),
            productosAgricola: null,
            artesanias: null,
            fincas: null
        }
        try {
            await service.create(usuario);
            fail('se esperaba que lanzara una BadRequestException');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it('deberia actualizar un Usuario', async () => {
        const usuario: UsuarioEntity = usuariosList[0];
        usuario.nombre = faker.word.sample();
        usuario.apellido = faker.word.sample();
        const updatedUsuario: UsuarioEntity = await service.update(usuario.id, usuario);
        expect(updatedUsuario).not.toBeNull();
        const storedUsuario: UsuarioEntity = await repository.findOne({ where: { id:usuario.id } });
        expect(storedUsuario).not.toBeNull();
        expect(storedUsuario.nombre).toEqual(usuario.nombre);
        expect(storedUsuario.apellido).toEqual(usuario.apellido);
    });

    it('deberia lanzar un NotFoundException al intentar actualizar un Usuario que no existe', async () => {
        try {
            let usuario: UsuarioEntity = usuariosList[0];
            usuario = {...usuario, nombre: faker.word.sample(), apellido: faker.word.sample()}
            await service.update(999, usuario);
            fail('se esperaba que lanzara un NotFoundException');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });

    it('deberia lanzar un BadRequestException al intentar actualizar un Usuario con datos invalidos', async () => {
        try {
            const usuario: UsuarioEntity = usuariosList[0];
            usuario.rol = faker.word.sample();
            await service.update(usuario.id, usuario);
            fail('Se esperaba que lanzara un BadRequestException');
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
        }
    });

    it('deberia eliminar un Usuario por su id', async () => {
        const usuario: UsuarioEntity = usuariosList[0];
        await service.delete(usuario.id);
        const deletedUsuario: UsuarioEntity = await repository.findOne({ where: { id:usuario.id } })
        expect(deletedUsuario).toBeNull();
    });

    it('deberia lanzar un NotFoundException al intentar eliminar un Usuario que no existe', async () => {
        try {
            await service.delete(999);
            fail('se esperaba que lanzara un NotFoundException');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    });
});