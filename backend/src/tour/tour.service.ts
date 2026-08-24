import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourEntity } from './tour.entity';
import { Repository } from 'typeorm';
import { TourDto } from './tour.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class TourService {
    constructor(
        @InjectRepository(TourEntity)
        private readonly tourRepository: Repository<TourEntity>,
    ) {}

    async createTour(TourDTO: TourDto): Promise<TourEntity> {

        if (!TourDTO.Titulo || TourDTO.Titulo.trim() === ""){
          throw new BadRequestException("El tour debe tener un titulo")
        }
  
          const newTour = this.tourRepository.create(TourDTO);
          return await this.tourRepository.save(newTour);
        }
      
        async findAllTours(): Promise<TourEntity[]> {
          return await this.tourRepository.find({relations: ["finca"]});
        }
  
        async findTourById(id: number): Promise<TourEntity | undefined> {
          return await this.tourRepository.findOne({ where: { id: id }, relations: ['finca'] });
        }
  
        async updateTour(id: number, TourDTO: TourDto): Promise<TourEntity> {
          const tour = await this.tourRepository.findOne({ where: { id: id }, relations: ['finca'] });
          if (!tour) {
              throw new BadRequestException('Tour con el id dado no encontrado');
          }
          const updated = this.tourRepository.merge(tour, TourDTO);
          return this.tourRepository.save(updated);
      }
  
        async deleteTourById(id: number): Promise<String> {
          const tour = await this.tourRepository.findOne({ where: { id: id }, relations: ['finca'] });
          if (!tour) {
              throw new BadRequestException('Tour con el id dado no encontrado');
          }
          await this.tourRepository.delete(id);
          return "Tour " + id + " eliminado"
  
        }
  
        

        async onModuleInit() {
          await this.seedTours();
      }
  
      private async seedTours() {
        for (let i = 0; i<10; i++){
  
          const tour = await this.tourRepository.save({
            Titulo: faker.commerce.productName(),
            Precio: Number(faker.commerce.price()),
            Imagen: faker.image.url(),
            Fecha: faker.date.anytime(),
            Hora: faker.number.int({min: 1, max: 3}),
            Ubicacion: faker.location.direction(),
            Duracion: faker.number.int({min: 1, max: 3}),
            Descripcion: faker.lorem.sentence()
          });
  
          await this.tourRepository.save(tour);
      }
    }
}
