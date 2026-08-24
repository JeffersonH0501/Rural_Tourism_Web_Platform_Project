import { Module } from '@nestjs/common';
import { TourFincaService } from './tour-finca.service';
import { TourFincaController } from './tour-finca.controller';
import { TourEntity } from '../tour/tour.entity';
import { Finca } from '../fincas/fincas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TourEntity, Finca])],
  providers: [TourFincaService],
  controllers: [TourFincaController]
})
export class TourFincaModule {}
