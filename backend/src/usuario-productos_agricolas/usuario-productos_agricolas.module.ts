import { Module } from '@nestjs/common';
import { UsuarioProductosAgricolasService } from './usuario-productos_agricolas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';
import { UsuarioEntity } from '../models/usuario.entity';
import { UsuarioProductosAgricolasController } from './usuario-productos_agricolas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoAgricolaEntity, UsuarioEntity])],
  providers: [UsuarioProductosAgricolasService],
  controllers: [UsuarioProductosAgricolasController]
})
export class UsuarioProductosAgricolasModule {}