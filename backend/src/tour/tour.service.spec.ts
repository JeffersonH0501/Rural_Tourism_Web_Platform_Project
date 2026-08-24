import { Test, TestingModule } from '@nestjs/testing';
import { TourService } from './tour.service';
import { Repository } from 'typeorm';
import { TourEntity } from './tour.entity';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

describe('TourService', () => {
  let service: TourService;
  let repository: Repository<TourEntity>;
  let toursList: TourEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TourService],
    }).compile();

    service = module.get<TourService>(TourService);
    repository = module.get<Repository<TourEntity>>(getRepositoryToken(TourEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    toursList = [];
    for (let i = 0; i < 5; i++) {
      const tour = await repository.save({
        Titulo: faker.commerce.productName(),
        Precio: Number(faker.commerce.price()),
        Imagen: faker.image.url(),
        Fecha: faker.date.anytime(),
        Hora: faker.number.int(),
        Ubicacion: faker.location.direction(),
        Duracion: faker.number.int(),
        Descripcion: faker.lorem.sentence()
    });
    toursList.push(tour);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //createTour
  describe('createTour', () => {
    it('Prueba crear un una tour válido', async () => {
      const tour = await repository.save({
        Titulo: faker.commerce.productName(),
        Precio: Number(faker.commerce.price()),
        Imagen: faker.image.url(),
        Fecha: faker.date.anytime(),
        Hora: faker.number.int(),
        Ubicacion: faker.location.direction(),
        Duracion: faker.number.int(),
        Descripcion: faker.lorem.sentence()
      });
      await service.createTour(tour);
      const createdTour = await service.findTourById(tour.id);
      expect(createdTour).toBeDefined();
      expect(tour.Titulo).toEqual(createdTour.Titulo)
      expect(tour.Precio).toEqual(createdTour.Precio)
      expect(tour.Imagen).toEqual(createdTour.Imagen)
      expect(tour.Fecha).toEqual(createdTour.Fecha)
      expect(tour.Hora).toEqual(createdTour.Hora)
      expect(tour.Ubicacion).toEqual(createdTour.Ubicacion)
      expect(tour.Duracion).toEqual(createdTour.Duracion)
      expect(tour.Descripcion).toEqual(createdTour.Descripcion)
  
    });
  
    it('Prueba crear un un tour inválida con titulo vacío', async () => {
      const artesania = await repository.save({
        Titulo: "",
        Precio: Number(faker.commerce.price()),
        Imagen: faker.image.url(),
        Fecha: faker.date.anytime(),
        Hora: faker.number.int(),
        Ubicacion: faker.location.direction(),
        Duracion: faker.number.int(),
        Descripcion: faker.lorem.sentence()
      });
  
      await expect(service.createTour(artesania)).rejects.toThrow(BadRequestException);
  
    });
    });
  
  
  
  
  
    //findAllTours
    describe('findAllTours', () => {
    it('Prueba para obtener todos los tours', async() =>{
      const tours = await service.findAllTours()
  
      for (let i = 0; i<toursList.length; i++){
        let tour = tours[i];
  
        expect(tour).toBeDefined();
        expect(tour.Titulo).toEqual(toursList[i].Titulo)
        expect(tour.Precio).toEqual(toursList[i].Precio)
        expect(tour.Imagen).toEqual(toursList[i].Imagen)
        expect(tour.Fecha).toEqual(toursList[i].Fecha)
        expect(tour.Hora).toEqual(toursList[i].Hora)
        expect(tour.Ubicacion).toEqual(toursList[i].Ubicacion)
        expect(tour.Duracion).toEqual(toursList[i].Duracion)
        expect(tour.Descripcion).toEqual(toursList[i].Descripcion)
      }
  });
  
  it('Prueba para obtener todos los tours inválido (que la base de datos este vacia)', async() =>{
  
    await repository.clear();
  
    const tours = await service.findAllTours()
  
    expect(tours).toEqual([]);
    });
  });
  
  
  
  
  
    //findTourById
    describe('findTourById', () => {
    it('Prueba buscar un tour por su id válido', async () => {
      const tour = toursList[0]
  
      const foundTour = await service.findTourById(tour.id);
    
      expect(foundTour).toBeDefined();
      expect(tour.Titulo).toEqual(foundTour.Titulo)
      expect(tour.Precio).toEqual(foundTour.Precio)
      expect(tour.Imagen).toEqual(foundTour.Imagen)
      expect(tour.Fecha).toEqual(foundTour.Fecha)
      expect(tour.Hora).toEqual(foundTour.Hora)
      expect(tour.Ubicacion).toEqual(foundTour.Ubicacion)
      expect(tour.Duracion).toEqual(foundTour.Duracion)
      expect(tour.Descripcion).toEqual(foundTour.Descripcion)
    });
  
    it('Prueba buscar un tour por su id inválido, no existente', async () => {
  
      let id = 0; // No hay tour con id 0
  
      const foundTour: TourEntity = await service.findTourById(id);
    
      expect(foundTour).toBeNull();
    });
  });
  
  
  
  
    // UpdateTour
    describe('updateTour', () => {
      it('Prueba editar un tour', async () => {
          const tour = toursList[0];
          const updateData = {
            Titulo: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Imagen: faker.image.url(),
            Fecha: faker.date.anytime(),
            Hora: faker.number.int(),
            Ubicacion: faker.location.direction(),
            Duracion: faker.number.int(),
            Descripcion: faker.lorem.sentence()
          };
  
          const updatedTour = await service.updateTour(tour.id, updateData);
          
          expect(updatedTour).toBeDefined();
          expect(updatedTour.Titulo).toEqual(updateData.Titulo)
          expect(updatedTour.Precio).toEqual(updateData.Precio)
          expect(updatedTour.Imagen).toEqual(updateData.Imagen)
          expect(updatedTour.Fecha).toEqual(updateData.Fecha)
          expect(updatedTour.Hora).toEqual(updateData.Hora)
          expect(updatedTour.Ubicacion).toEqual(updateData.Ubicacion)
          expect(updatedTour.Duracion).toEqual(updateData.Duracion)
          expect(updatedTour.Descripcion).toEqual(updateData.Descripcion)
      });
  
      it('Prueba editar un tour inexistente', async () => {
          const updateData = {
            Titulo: "Inexistente",
            Precio: Number(faker.commerce.price()),
            Imagen: faker.image.url(),
            Fecha: faker.date.anytime(),
            Hora: faker.number.int(),
            Ubicacion: faker.location.direction(),
            Duracion: faker.number.int(),
            Descripcion: faker.lorem.sentence()
          };
  
          await expect(service.updateTour(0, updateData)).rejects.toThrow(BadRequestException);
      });
  });
  
  
  
  
  
  //deleteTourById
  describe('deleteTourById', () => {
  it('Prueba para borrar un Tour', async() =>{
  
    const tour = toursList[0]
  
    await service.deleteTourById(tour.id)
  
    const deletedTour = await service.findTourById(tour.id)
  
    expect(deletedTour).toBeNull()
  
    });
  
    it('Prueba para borrar un tour inválida (que no existe)', async() =>{
  
      let id = 0; // No hay tour con id 0
  
      expect(service.deleteTourById(id)).rejects.toThrow(BadRequestException);
      });
    
    });


});


