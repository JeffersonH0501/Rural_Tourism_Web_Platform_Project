import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Finca } from '../fincas/fincas.entity';
import { TourDto } from '../tour/tour.dto';
import { TourEntity } from '../tour/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TourFincaService {
    constructor(
        @InjectRepository(TourEntity)
        private readonly tourRepository: Repository<TourEntity>,
    
        @InjectRepository(Finca)
        private readonly fincaRepository: Repository<Finca>
    ) {}

    async addTourToFinca(tourId: number, fincaId: number): Promise<Finca> {
        const tour: TourEntity = await this.tourRepository.findOne({ where: {id:tourId }, relations: ['finca'] });
        if (!tour)
          throw new BadRequestException("The tour with the given id was not found");
        
        const finca: Finca = await this.fincaRepository.findOne({ where: {id:fincaId }, relations: ['tour'] })
        if (!finca) 
          throw new BadRequestException("The finca with the given id was not found");
        
        finca.tour = tour;

        return await this.fincaRepository.save(finca);
    }

    async findTourByFincaId(fincaId: number): Promise<TourEntity> {

        const finca: Finca = await this.fincaRepository.findOne({ where: {id:fincaId }, relations: ['tour'] })
        if (!finca) 
          throw new BadRequestException("The finca with the given id was not found");
       
        return finca.tour;
    }

    async findFincasByTourDate(date: Date): Promise<Finca[]> {
        const tours = await this.tourRepository.find({where: { Fecha: date }, relations: ['finca']});

        const listFincas: Finca[] = []

        for (let i = 0; i< tours.length; i++){
            let tour = tours[i]
        
            const finca: Finca = await this.fincaRepository.findOne({ where: {tour: tour}, relations: ['tour'] })

            listFincas.push(finca)
        }

        return listFincas;
    }

    async updateTourInFinca(fincaId: number, tourData: TourDto): Promise<TourEntity> {
        const finca = await this.fincaRepository.findOne({ where: { id: fincaId }, relations: ['tour'] });
        if (!finca || !finca.tour)
            throw new BadRequestException("No tour associated with the given finca id was found");
    
        const updatedTour = await this.tourRepository.save({
            ...finca.tour,
            ...tourData
        });
    
        return updatedTour;
    }
    

    async deleteTourFinca(tourId: number, fincaId: number){
        const tour: TourEntity = await this.tourRepository.findOne({ where: {id:tourId }, relations: ['finca'] });
        if (!tour)
          throw new BadRequestException("The tour with the given id was not found");
        
        const finca: Finca = await this.fincaRepository.findOne({ where: {id:fincaId }, relations: ['tour'] })
        if (!finca) 
          throw new BadRequestException("The finca with the given id was not found");
    
        const fincaTour: TourEntity = finca.tour;
    
        if (!fincaTour)
            throw new BadRequestException("The tour with the given id is not associated to the finca")
 
        finca.tour = null;
        await this.fincaRepository.save(finca);
    }
}
