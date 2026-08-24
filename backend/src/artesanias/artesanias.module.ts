import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtesaniasEntity } from './artesanias.entity';
import { ArtesaniasService } from './artesanias.service';
import { ArtesaniasController } from './artesanias.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ArtesaniasEntity])],
    providers: [ArtesaniasService],
    controllers: [ArtesaniasController],
})
export class ArtesaniasModule {}
