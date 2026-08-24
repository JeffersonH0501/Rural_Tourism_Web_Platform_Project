import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoAgricolaEntity } from './producto_agricola.entity';
import { ProductoAgricolaService } from './producto_agricola.service';
import { ProductoAgricolaController } from './producto_agricola.controller';
import { ElementoPromocionable } from '../elemento-promocionable/elemento-promocionable.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductoAgricolaEntity, ElementoPromocionable])],
    providers: [ProductoAgricolaService],
    controllers: [ProductoAgricolaController],
})
export class ProductoAgricolaModule {}