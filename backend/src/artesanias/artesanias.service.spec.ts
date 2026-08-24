import { Test, TestingModule } from '@nestjs/testing';
import { ArtesaniasService } from './artesanias.service';
import { ArtesaniasEntity } from './artesanias.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

describe('ArtesaniasService', () => {
  let service: ArtesaniasService;
  let repository: Repository<ArtesaniasEntity>;
  let artesaniasList: ArtesaniasEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ArtesaniasService],
    }).compile();

    service = module.get<ArtesaniasService>(ArtesaniasService);
    repository = module.get<Repository<ArtesaniasEntity>>(getRepositoryToken(ArtesaniasEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    artesaniasList = [];
    for (let i = 0; i < 5; i++) {
      const artesania = await repository.save({
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
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createArtesania
  describe('createArtesania', () => {
  it('Prueba crear un una artesania válida', async () => {
    const artesania = await repository.save({
      Nombre: faker.commerce.productName(),
      Precio: Number(faker.commerce.price()),
      Cantidad: Number(faker.commerce.price()),
      Material: faker.string.alphanumeric(),
      Disponibilidad: Math.random() < 0.5,
      Origen: faker.string.alphanumeric(),
      Descripcion: faker.commerce.productDescription(),
      Imagen: faker.image.url()
    });
    await service.createArtesania(artesania);
    const createdArtesania = await service.findArtesaniaById(artesania.id);
    expect(createdArtesania).toBeDefined();
    expect(artesania.Nombre).toEqual(createdArtesania.Nombre)
    expect(artesania.Precio).toEqual(createdArtesania.Precio)
    expect(artesania.Cantidad).toEqual(createdArtesania.Cantidad)
    expect(artesania.Material).toEqual(createdArtesania.Material)
    expect(artesania.Disponibilidad).toEqual(createdArtesania.Disponibilidad)
    expect(artesania.Origen).toEqual(createdArtesania.Origen)
    expect(artesania.Descripcion).toEqual(createdArtesania.Descripcion)
    expect(artesania.Imagen).toEqual(createdArtesania.Imagen)

  });

  it('Prueba crear un una artesania inválida con nombre vacío', async () => {
    const artesania = await repository.save({
      Nombre: "",
      Precio: Number(faker.commerce.price()),
      Cantidad: Number(faker.commerce.price()),
      Material: faker.string.alphanumeric(),
      Disponibilidad: Math.random() < 0.5,
      Origen: faker.string.alphanumeric(),
      Descripcion: faker.commerce.productDescription(),
      Imagen: faker.image.url()
    });

    await expect(service.createArtesania(artesania)).rejects.toThrow(BadRequestException);

  });
  });





  //findAllArtesanias
  describe('findAllArtesanias', () => {
  it('Prueba para obtener todas las artesanias', async() =>{
    const artesanias = await service.findAllArtesanias()

    for (let i = 0; i<artesaniasList.length; i++){
      let artesania = artesanias[i];

      expect(artesania).toBeDefined();
      expect(artesania.Nombre).toEqual(artesaniasList[i].Nombre)
      expect(artesania.Precio).toEqual(artesaniasList[i].Precio)
      expect(artesania.Cantidad).toEqual(artesaniasList[i].Cantidad)
      expect(artesania.Material).toEqual(artesaniasList[i].Material)
      expect(artesania.Disponibilidad).toEqual(artesaniasList[i].Disponibilidad)
      expect(artesania.Origen).toEqual(artesaniasList[i].Origen)
      expect(artesania.Descripcion).toEqual(artesaniasList[i].Descripcion)
      expect(artesania.Imagen).toEqual(artesaniasList[i].Imagen)
    }
});

it('Prueba para obtener todas las artesanias inválido (que la base de datos este vacia)', async() =>{

  await repository.clear();

  const artesanias = await service.findAllArtesanias()

  expect(artesanias).toEqual([]);
  });
});





  //findArtesaniaById
  describe('findArtesaniaById', () => {
  it('Prueba buscar una artesania por su id válido', async () => {
    const artesania = artesaniasList[0]

    const foundArtesania = await service.findArtesaniaById(artesania.id);
  
    expect(foundArtesania).toBeDefined();
    expect(artesania.Nombre).toEqual(foundArtesania.Nombre)
    expect(artesania.Precio).toEqual(foundArtesania.Precio)
    expect(artesania.Cantidad).toEqual(foundArtesania.Cantidad)
    expect(artesania.Material).toEqual(foundArtesania.Material)
    expect(artesania.Disponibilidad).toEqual(foundArtesania.Disponibilidad)
    expect(artesania.Origen).toEqual(foundArtesania.Origen)
    expect(artesania.Descripcion).toEqual(foundArtesania.Descripcion)
    expect(artesania.Imagen).toEqual(foundArtesania.Imagen)
  });

  it('Prueba buscar una artesania por su id inválido, no existente', async () => {

    let id = 0; // No hay profesor con id 0

    const foundArtesania: ArtesaniasEntity = await service.findArtesaniaById(id);
  
    expect(foundArtesania).toBeNull();
  });
});




  // UpdateArtesania
  describe('updateArtesania', () => {
    it('Prueba editar una artesanía', async () => {
        const artesania = artesaniasList[0];
        const updateData = {
            Nombre: "Nuevo Nombre",
            Precio: 500,
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: "Nueva Descripción",
            Cantidad: artesania.Cantidad,
            Imagen: artesania.Imagen
        };

        const updatedArtesania = await service.updateArtesania(artesania.id, updateData);
        
        expect(updatedArtesania).toBeDefined();
        expect(updatedArtesania.Nombre).toEqual(updateData.Nombre);
        expect(updatedArtesania.Precio).toEqual(updateData.Precio);
        expect(updatedArtesania.Material).toEqual(updateData.Material);
        expect(updatedArtesania.Disponibilidad).toEqual(updateData.Disponibilidad);
        expect(updatedArtesania.Origen).toEqual(updateData.Origen);
        expect(updatedArtesania.Descripcion).toEqual(updateData.Descripcion);
    });

    it('Prueba editar una artesanía inexistente', async () => {
        const updateData = {
            Nombre: "Inexistente",
            Precio: 1000,
            Material: faker.string.alphanumeric(),
            Disponibilidad: Math.random() < 0.5,
            Origen: faker.string.alphanumeric(),
            Descripcion: "No existe",
            Cantidad: 10,
            Imagen: "URL"
        };

        await expect(service.updateArtesania(0, updateData)).rejects.toThrow(BadRequestException);
    });
});





//deleteArtesaniaById
describe('deleteArtesaniaById', () => {
it('Prueba para borrar una Artesania', async() =>{

  const artesania = artesaniasList[0]

  await service.deleteArtesaniaById(artesania.id)

  const deletedArtesania = await service.findArtesaniaById(artesania.id)

  expect(deletedArtesania).toBeNull()

  });

  it('Prueba para borrar una artesania inválida (que no existe)', async() =>{

    let id = 0; // No hay profesor con id 0

    expect(service.deleteArtesaniaById(id)).rejects.toThrow(BadRequestException);
    });
  
  });


})
