import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { faker } from '@faker-js/faker';

import { ArtesaniasEntity } from '../artesanias/artesanias.entity';
import { UsuarioEntity } from '../models/usuario.entity';

import { UsuarioArtesaniasService } from './usuario-artesanias.service';

describe('UsuarioArtesaniasService', () => {
    let service: UsuarioArtesaniasService;
    let artesaniaRepository: Repository<ArtesaniasEntity>;
    let usuarioRepository: Repository<UsuarioEntity>;
    let usuario: UsuarioEntity;
    let artesaniasList: ArtesaniasEntity[];

    const seedDataBase = async () => {
        artesaniaRepository.clear();
        usuarioRepository.clear();
    
        artesaniasList = [];
        for (let i = 0; i < 5; i++) {
            const artesania: ArtesaniasEntity = await artesaniaRepository.save({
                Nombre: faker.commerce.productName(),
                Precio: Number(faker.commerce.price()),
                Cantidad: Number(faker.commerce.price()),
                Material: faker.string.alphanumeric(),
                Disponibilidad: Math.random() < 0.5,
                Origen: faker.string.alphanumeric(),
                Descripcion: faker.commerce.productDescription(),
                Imagen: faker.image.url()
            });
            artesaniasList.push(artesania);
        }
        const roles = ['visitante', 'agricultor', 'artesano'];
        usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
            artesanias: artesaniasList
        });
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [...TypeOrmTestingConfig()],
          providers: [UsuarioArtesaniasService],
        }).compile();
    
        service = module.get<UsuarioArtesaniasService>(UsuarioArtesaniasService);
        usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
        artesaniaRepository = module.get<Repository<ArtesaniasEntity>>(getRepositoryToken(ArtesaniasEntity));
        await seedDataBase();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('deberia agregar una artesania a un usuario', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
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
    
        const result: UsuarioEntity = await service.addArtesaniaToUsuario(newUsuario.id, newArtesania.id);
        
        expect(result.artesanias.length).toBe(1);
        expect(result.artesanias[0]).not.toBeNull();
        expect(result.artesanias[0].Nombre).toBe(newArtesania.Nombre);
        expect(result.artesanias[0].Precio).toBe(newArtesania.Precio);
        expect(result.artesanias[0].Cantidad).toBe(newArtesania.Cantidad);
        expect(result.artesanias[0].Material).toBe(newArtesania.Material);
        expect(result.artesanias[0].Disponibilidad).toBe(newArtesania.Disponibilidad);
        expect(result.artesanias[0].Origen).toBe(newArtesania.Origen);
        expect(result.artesanias[0].Descripcion).toBe(newArtesania.Descripcion);
        expect(result.artesanias[0].Imagen).toBe(newArtesania.Imagen);
    });

    it('deberia lanzarse una excepción al intentar agregar una artesania inexistente a un usuario', async () => {
        const roles = ['visitante', 'agricultor', 'artesano'];
        const newUsuario: UsuarioEntity = usuario = await usuarioRepository.save({
            nombre: faker.word.sample(),
            apellido: faker.word.sample(),
            foto: faker.image.url(),
            correo: faker.word.sample() + '@uniandes.edu.co',
            contraseña: faker.word.sample(),
            rol: roles[Math.floor(Math.random() * roles.length)],
        });
        await expect(() => service.addArtesaniaToUsuario(newUsuario.id, 999)).rejects.toHaveProperty("message", "The artesania with the given id was not found");
    });

    it('deberia lanzar una excepción al intentar agregar una artesania a un usuario inexistente', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
        });
        await expect(() => service.addArtesaniaToUsuario(999, newArtesania.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found");
    });

    it('deberia devolver una artesania de un usuario', async () => {
        const artesania: ArtesaniasEntity = artesaniasList[0];
        const storedArtesania: ArtesaniasEntity = await service.findArtesaniaByUsuarioIdArtesaniaId(usuario.id, artesania.id)
        expect(storedArtesania).not.toBeNull();
        expect(storedArtesania.Nombre).toBe(artesania.Nombre);
        expect(storedArtesania.Precio).toBe(artesania.Precio);
        expect(storedArtesania.Cantidad).toBe(artesania.Cantidad);
        expect(storedArtesania.Material).toBe(artesania.Material);
        expect(storedArtesania.Disponibilidad).toBe(artesania.Disponibilidad);
        expect(storedArtesania.Origen).toBe(artesania.Origen);
        expect(storedArtesania.Descripcion).toBe(artesania.Descripcion);
        expect(storedArtesania.Imagen).toBe(artesania.Imagen);
    });

    it('deberia lanzar una excepción al intentar encontrar una artesania inexistente de un usuario', async () => {
        await expect(()=> service.findArtesaniaByUsuarioIdArtesaniaId(usuario.id, 999)).rejects.toHaveProperty("message", "The artesania with the given id was not found"); 
    });

    it('deberia lanzar una excepcion al intentar encontrar una artesania de un usuario inexistente', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
        });
        await expect(() => service.findArtesaniaByUsuarioIdArtesaniaId(999, newArtesania.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found");
    });
    
    it('deberia lanzar una excepcion al intentar encontrar una artesania que no esta asociada a un usuario', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
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
        await expect(()=> service.findArtesaniaByUsuarioIdArtesaniaId(newUsuario.id, newArtesania.id)).rejects.toHaveProperty("message", "The artesania with the given id was not asociated with the Usuario with the given id"); 
    });
    
    it('deberia encontrar todas las artesanias de un usuario', async () => {
        const artworks: ArtesaniasEntity[] = await service.findArtesaniasByUsuarioId(usuario.id);
        expect(artworks.length).toBe(5)
    });
    
    it('deberia lanzar una excepcion al intentar encontrar todas las artesanias de un usuario inexistente', async () => {
        await expect(()=> service.findArtesaniasByUsuarioId(999)).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia asociar una artesania a un usuario', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
        });
        const updatedUsuario: UsuarioEntity = await service.associateArtesaniasUsuario(usuario.id, [newArtesania]);
        expect(updatedUsuario.artesanias.length).toBe(1);
    
        expect(updatedUsuario.artesanias[0].Nombre).toBe(newArtesania.Nombre);
        expect(updatedUsuario.artesanias[0].Precio).toBe(newArtesania.Precio);
        expect(updatedUsuario.artesanias[0].Cantidad).toBe(newArtesania.Cantidad);
        expect(updatedUsuario.artesanias[0].Material).toBe(newArtesania.Material);
        expect(updatedUsuario.artesanias[0].Disponibilidad).toBe(newArtesania.Disponibilidad);
        expect(updatedUsuario.artesanias[0].Origen).toBe(newArtesania.Origen);
        expect(updatedUsuario.artesanias[0].Descripcion).toBe(newArtesania.Descripcion);
        expect(updatedUsuario.artesanias[0].Imagen).toBe(newArtesania.Imagen);
    });
    
    it('deberia lanzar una excepcion al intenter asociar una artesania a un usuario inexistente', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
        });
        await expect(()=> service.associateArtesaniasUsuario(999, [newArtesania])).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia lanzar una excepcion al intentar asociar una artesania inexistente a un usuario', async () => {
        const newArtesania: ArtesaniasEntity = artesaniasList[0];
        newArtesania.id = 999;
    
        await expect(()=> service.associateArtesaniasUsuario(usuario.id, [newArtesania])).rejects.toHaveProperty("message", "The artesania with the given id was not found"); 
    });
    
    it('deberia eliminar una artesania de un usuario', async () => {
        const artesania: ArtesaniasEntity = artesaniasList[0];
        
        await service.deleteArtesaniaUsuario(usuario.id, artesania.id);
    
        const storedUsuario: UsuarioEntity = await usuarioRepository.findOne({where: {id: usuario.id}, relations: ["artesanias"]});
        const deletedArtesania: ArtesaniasEntity = storedUsuario.artesanias.find(a => a.id === artesania.id);
    
        expect(deletedArtesania).toBeUndefined();
    });
    
    it('deberia lanzar una excepcion al intentar eliminar una artesania inexistente de un usuario ', async () => {
        await expect(()=> service.deleteArtesaniaUsuario(usuario.id, 999)).rejects.toHaveProperty("message", "The artesania with the given id was not found"); 
    });
    
    it('deberia generar una excepción al intentar eliminar una artesania de un usuario inexistente', async () => {
        const artesania: ArtesaniasEntity = artesaniasList[0];
        await expect(()=> service.deleteArtesaniaUsuario(999, artesania.id)).rejects.toHaveProperty("message", "The usuario with the given id was not found"); 
    });
    
    it('deberia generar una excepcion al intentar eliminar una artesania no asociada al usuario', async () => {
        const newArtesania: ArtesaniasEntity = await artesaniaRepository.save({
            Nombre: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Cantidad: Number(faker.commerce.price()),
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: faker.commerce.productDescription(),
            Imagen: faker.image.url()
        });
    
        await expect(()=> service.deleteArtesaniaUsuario(usuario.id, newArtesania.id)).rejects.toHaveProperty("message", "The artesania with the given id is not associated to the usuario"); 
    });

});