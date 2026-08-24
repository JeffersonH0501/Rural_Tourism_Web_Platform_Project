import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';

import { UsuarioModule } from './models/usuario.module';
import { ArtesaniasModule } from './artesanias/artesanias.module';
import { ProductoAgricolaModule } from './productos_agricolas/producto_agricola.module';
import { UsuarioArtesaniasModule } from './usuario-artesanias/usuario-artesanias.module';
import { UsuarioProductosAgricolasModule } from './usuario-productos_agricolas/usuario-productos_agricolas.module';
import { UsuarioFincasModule } from './usuario-fincas/usuario-fincas.module';

import { PromocionModule } from './promocion/promocion.module';
import { ElementoPromocionableModule } from './elemento-promocionable/elemento-promocionable.module';
import { TourModule } from './tour/tour.module';
import { FincaModule } from './fincas/fincas.module';
import { TourFincaModule } from './tour-finca/tour-finca.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsuarioModule,
    ArtesaniasModule,
    ProductoAgricolaModule,
    FincaModule,
    UsuarioArtesaniasModule,
    UsuarioProductosAgricolasModule,
    UsuarioFincasModule,
    ElementoPromocionableModule, 
    PromocionModule, 
    TourModule, 
    TypeOrmModule.forRoot(databaseConfig),
    TourFincaModule,
    AuthModule,
  ],
  controllers: [],
  providers: []
})

export class AppModule {}