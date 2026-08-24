import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './promocion.entity';
import { ElementoPromocionable } from '../elemento-promocionable/elemento-promocionable.entity';
import { PromocionService } from './promocion.service';
//import { PromocionController } from './promocion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Promocion, ElementoPromocionable])],
  providers: [PromocionService],
 // controllers: [PromocionController],
})
export class PromocionModule {}
