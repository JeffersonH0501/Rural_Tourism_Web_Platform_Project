import { Module } from '@nestjs/common';
import { UsuarioArtesaniasService } from './usuario-artesanias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtesaniasEntity } from '../artesanias/artesanias.entity';
import { UsuarioEntity } from '../models/usuario.entity';
import { UsuarioArtesaniasController } from './usuario-artesanias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ArtesaniasEntity, UsuarioEntity])],
  providers: [UsuarioArtesaniasService],
  controllers: [UsuarioArtesaniasController]
})
export class UsuarioArtesaniasModule {}
