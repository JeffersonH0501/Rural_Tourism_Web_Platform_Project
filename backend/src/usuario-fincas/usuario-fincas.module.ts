import { Module } from '@nestjs/common';
import { UsuarioFincasService } from './usuario-fincas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finca } from '../fincas/fincas.entity';
import { UsuarioEntity } from '../models/usuario.entity';
import { UsuarioFincasController } from './usuario-fincas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Finca, UsuarioEntity])],
  providers: [UsuarioFincasService],
  controllers: [UsuarioFincasController]
})
export class UsuarioFincasModule {}