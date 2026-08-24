import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { UsuarioEntity } from '../models/usuario.entity';

import { CreateUsuarioDto, UpdateUsuarioDto } from '../models/usuario.dto';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ) {}
    
    async findAll(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find({relations: ['artesanias', 'productosAgricola', 'fincas']});
    }

    async findOneByCorreo(correo: string): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where:{correo:correo}, relations: ['artesanias', 'productosAgricola', 'fincas'] });
        if (!usuario) {
            throw new NotFoundException(`Usuario con correo ${correo} no encontrado`);
        }
        return usuario;
    }

    async findOne(id: number): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: {id}, relations: ['artesanias', 'productosAgricola'] });
        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        return usuario;
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
        if (createUsuarioDto.rol !== "visitante" && createUsuarioDto.rol !== "agricultor" && createUsuarioDto.rol !== "artesano" && createUsuarioDto.rol !== "admin") {
            throw new BadRequestException('No se puede crear el usuario porque no tiene un rol valido');
        }
        const usuario = this.usuarioRepository.create(createUsuarioDto);
        return await this.usuarioRepository.save(usuario);
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<UsuarioEntity> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: {id}, relations: ['artesanias', 'productosAgricola'] });
        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        if (updateUsuarioDto.rol && updateUsuarioDto.rol !== "visitante" && updateUsuarioDto.rol !== "agricultor" && updateUsuarioDto.rol !== "artesano" && updateUsuarioDto.rol !== "admin") {
            throw new BadRequestException('No se puede actualizar el usuario porque no tiene un rol valido');
        }
        this.usuarioRepository.merge(usuario, updateUsuarioDto);
        return await this.usuarioRepository.save(usuario);
    }

    async delete(id: number): Promise<String> {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({ where: {id} });
        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        await this.usuarioRepository.remove(usuario);
        return 'Usuario eliminado con exito!'
    }

    async onModuleInit() {
        await this.seedUsuarios();
    }

    private async seedUsuarios() {
        const roles = ["visitante", "agricultor", "artesano"]
        for (let i = 0; i < 10; i++){
            await this.usuarioRepository.save({
                nombre: faker.word.sample(),
                apellido: faker.word.sample(),
                foto: faker.image.url(),
                correo: faker.word.sample() + "@uniandes.edu.co",
                contraseña: faker.word.sample(),
                rol: roles[Math.floor(Math.random() * roles.length)],
            });
        }
        await this.usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: "ejemplo@uniandes.edu.co",
            contraseña: "123",
            rol: "visitante",
        });
        await this.usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: "prueba@uniandes.edu.co",
            contraseña: "123",
            rol: "agricultor",
        });
        await this.usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: "a@gmail.com",
            contraseña: "123",
            rol: "artesano",
        });
    }
}