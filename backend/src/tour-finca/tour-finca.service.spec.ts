import { Test, TestingModule } from '@nestjs/testing';
import { TourFincaService } from './tour-finca.service';
import { Finca } from '../fincas/fincas.entity';
import { TourEntity } from '../tour/tour.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../config/typeorm.testing.config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('TourFincaService', () => {
  let service: TourFincaService;
  let tourRepository: Repository<TourEntity>;
  let fincaRepository: Repository<Finca>;
  let finca: Finca;
  let toursList: TourEntity[];

  const seedDataBase = async () => {
    tourRepository.clear();
    fincaRepository.clear();

    toursList = [];
    for (let i = 0; i < 5; i++) {
        const tour: TourEntity = await tourRepository.save({
            Titulo: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Imagen: faker.image.url(),
            Fecha: faker.date.anytime(),
            Hora: faker.number.int(),
            Ubicacion: faker.string.alphanumeric(),
            Duracion: faker.number.int(),
            Descripcion: faker.lorem.paragraph()
        });
        toursList.push(tour);
    }

      finca = await fincaRepository.save({
          nombre: faker.person.firstName(),
          ubicacion: faker.location.direction(),
          servicios: faker.commerce.productDescription(),
          precio: faker.number.int(),
          capacidad: faker.number.int(),
          descripcion: faker.lorem.paragraph(),
          imagen: faker.image.url(),
          disponibilidad: Math.random() < 0.5
    });
};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TourFincaService],
    }).compile();

    service = module.get<TourFincaService>(TourFincaService);
    tourRepository = module.get<Repository<TourEntity>>(getRepositoryToken(TourEntity));
    fincaRepository = module.get<Repository<Finca>>(getRepositoryToken(Finca));
    await seedDataBase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //addTourToFinca

  describe('addTourToFinca', () => {
    it('Prueba crear asociar un tour a una finca', async () => {
      const tour: TourEntity = await tourRepository.save({
        Titulo: faker.commerce.productName(),
        Precio: Number(faker.commerce.price()),
        Imagen: faker.image.url(),
        Fecha: faker.date.anytime(),
        Hora: faker.number.int(),
        Ubicacion: faker.string.alphanumeric(),
        Duracion: faker.number.int(),
        Descripcion: faker.lorem.paragraph()
    });

    const finca: Finca = await fincaRepository.save({
      nombre: faker.person.firstName(),
      ubicacion: faker.location.direction(),
      servicios: faker.commerce.productDescription(),
      precio: faker.number.int(),
      capacidad: faker.number.int(),
      descripcion: faker.lorem.paragraph(),
      imagen: faker.image.url(),
      disponibilidad: Math.random() < 0.5
    });


      await service.addTourToFinca(tour.id, finca.id);
      const associatedFinca = await fincaRepository.findOne({where: {id: finca.id}, relations: ['tour']})
      console.log(associatedFinca)
      expect(associatedFinca).toBeDefined();
      expect(associatedFinca.nombre).toEqual(finca.nombre)
      expect(associatedFinca.ubicacion).toEqual(finca.ubicacion)
      expect(associatedFinca.servicios).toEqual(finca.servicios)
      expect(associatedFinca.precio).toEqual(finca.precio)
      expect(associatedFinca.capacidad).toEqual(finca.capacidad)
      expect(associatedFinca.descripcion).toEqual(finca.descripcion)
      expect(associatedFinca.imagen).toEqual(finca.imagen)
      expect(associatedFinca.disponibilidad).toEqual(finca.disponibilidad)

      expect(associatedFinca.tour.Titulo).toEqual(tour.Titulo)
      expect(associatedFinca.tour.Precio).toEqual(tour.Precio)
      expect(associatedFinca.tour.Imagen).toEqual(tour.Imagen)
      expect(associatedFinca.tour.Fecha).toEqual(tour.Fecha)
      expect(associatedFinca.tour.Hora).toEqual(tour.Hora)
      expect(associatedFinca.tour.Ubicacion).toEqual(tour.Ubicacion)
      expect(associatedFinca.tour.Duracion).toEqual(tour.Duracion)
      expect(associatedFinca.tour.Descripcion).toEqual(tour.Descripcion)
  
    });
  
    it('Prueba crear asociar un tour inexistente a una finca', async () => {
      const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  
      await expect(service.addTourToFinca(0, finca.id)).rejects.toThrow(BadRequestException);
  
    });
  });


  //findTourByFincaId

  describe('findTourByFincaId', () => {
    it('Prueba de buscar un tour dado el Id de la finca', async () => {
      const tour: TourEntity = toursList[0]

     const finca: Finca = await fincaRepository.save({
      nombre: faker.person.firstName(),
      ubicacion: faker.location.direction(),
      servicios: faker.commerce.productDescription(),
      precio: faker.number.int(),
      capacidad: faker.number.int(),
      descripcion: faker.lorem.paragraph(),
      imagen: faker.image.url(),
      disponibilidad: Math.random() < 0.5
    });


      const associatedFinca = await service.addTourToFinca(tour.id, finca.id);

      const foundTour = await service.findTourByFincaId(associatedFinca.id)
      
      expect(foundTour).toBeDefined();
      expect(foundTour.Titulo).toEqual(tour.Titulo)
      expect(foundTour.Precio).toEqual(tour.Precio)
      expect(foundTour.Imagen).toEqual(tour.Imagen)
      expect(foundTour.Fecha).toEqual(tour.Fecha)
      expect(foundTour.Hora).toEqual(tour.Hora)
      expect(foundTour.Ubicacion).toEqual(tour.Ubicacion)
      expect(foundTour.Duracion).toEqual(tour.Duracion)
      expect(foundTour.Descripcion).toEqual(tour.Descripcion)
  
    });
  
    it('Prueba de buscar un tour dado el Id de la finca, donde la finca no existe', async () => {

      let id = 0;
  
      await expect(service.findTourByFincaId(id)).rejects.toThrow(BadRequestException);
  
    });
  });



    //findFincasByTourDate

    describe('findFincasByTourDate', () => {
      it('Prueba de buscar una finca dado la fecha de un tour', async () => {
        const tour: TourEntity = toursList[0]
  
       const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  
  
        const associatedFinca = await service.addTourToFinca(tour.id, finca.id);
  
        const foundFincas = await service.findFincasByTourDate(associatedFinca.tour.Fecha)
    
        expect(foundFincas).toBeDefined();

        for (let i = 0; i<foundFincas.length; i++){
          expect(foundFincas[i].nombre).toEqual(finca.nombre)
          expect(foundFincas[i].ubicacion).toEqual(finca.ubicacion)
          expect(foundFincas[i].servicios).toEqual(finca.servicios)
          expect(foundFincas[i].precio).toEqual(finca.precio)
          expect(foundFincas[i].capacidad).toEqual(finca.capacidad)
          expect(foundFincas[i].descripcion).toEqual(finca.descripcion)
          expect(foundFincas[i].imagen).toEqual(finca.imagen)
          expect(foundFincas[i].disponibilidad).toEqual(finca.disponibilidad)
        }    
      });
    
      it('Prueba de buscar una finca dado la fecha de un tour, donde no hay ningun tour con la fecha dada', async () => {
  
        const tour: TourEntity = toursList[0]
  
       const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  
  
        const associatedFinca = await service.addTourToFinca(tour.id, finca.id);

        const fincas = await service.findFincasByTourDate(new Date("2000-02-29"))

        expect(fincas).toEqual([])
      
      });
    });
    


    //updateTourInFinca

    describe('updateTourInFinca', () => {
      it('Actualiza el tour asociado con un finca, dado el id de la finca', async () => {
        const tour: TourEntity = toursList[0]
  
       const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  
  
        const associatedFinca = await service.addTourToFinca(tour.id, finca.id);
  
        const updatedTour = await service.updateTourInFinca(finca.id, toursList[1])
    
        expect(updatedTour).toBeDefined();
        
        expect(updatedTour.id).toEqual(toursList[1].id)
        expect(updatedTour.Titulo).toEqual(toursList[1].Titulo)
        expect(updatedTour.Precio).toEqual(toursList[1].Precio)
        expect(updatedTour.Imagen).toEqual(toursList[1].Imagen)
        expect(updatedTour.Fecha).toEqual(toursList[1].Fecha)
        expect(updatedTour.Hora).toEqual(toursList[1].Hora)
        expect(updatedTour.Ubicacion).toEqual(toursList[1].Ubicacion)
        expect(updatedTour.Duracion).toEqual(toursList[1].Duracion)
        expect(updatedTour.Descripcion).toEqual(toursList[1].Descripcion)
      });
    
      it('Actualiza el tour asociado con un finca, dado el id de la finca, si la finca no tiene un tour asociado', async () => {
    
        const tour: TourEntity = toursList[0]

       const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  

        await expect(service.updateTourInFinca(finca.id, tour)).rejects.toThrow(BadRequestException);
      
      });
    });
  

    //deleteTourFinca

    describe('deleteTourFinca', () => {
      it('Borra un tour asociado a una finca', async () => {
        const tour: TourEntity = toursList[0]
  
       const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  
  
        const associatedFinca = await service.addTourToFinca(tour.id, finca.id);

        await service.deleteTourFinca(tour.id, associatedFinca.id)

        const deletedTourInFinca = await service.findTourByFincaId(associatedFinca.id)

        expect(deletedTourInFinca).toBeNull();
        
      });
    
      it('Intenta borrar un tour inexistente a una finca', async () => {
    
       const finca: Finca = await fincaRepository.save({
        nombre: faker.person.firstName(),
        ubicacion: faker.location.direction(),
        servicios: faker.commerce.productDescription(),
        precio: faker.number.int(),
        capacidad: faker.number.int(),
        descripcion: faker.lorem.paragraph(),
        imagen: faker.image.url(),
        disponibilidad: Math.random() < 0.5
      });
  

        await expect(service.deleteTourFinca(0, finca.id)).rejects.toThrow(BadRequestException);
      
      });
    });


});
