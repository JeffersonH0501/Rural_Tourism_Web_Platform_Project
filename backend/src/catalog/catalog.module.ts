import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import {
  AgriculturalProduct,
  Craft,
  Farm,
  Promotion,
  Tour,
} from './catalog.entities';
import {
  AgriculturalProductsController,
  CraftsController,
  FarmsController,
  PromotionsController,
  ToursController,
} from './catalog.controllers';
import { CatalogService } from './catalog.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      AgriculturalProduct,
      Craft,
      Farm,
      Tour,
      Promotion,
    ]),
  ],
  controllers: [
    AgriculturalProductsController,
    CraftsController,
    FarmsController,
    ToursController,
    PromotionsController,
  ],
  providers: [CatalogService],
})
export class CatalogModule {}
