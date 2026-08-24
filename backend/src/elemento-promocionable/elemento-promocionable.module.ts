import { Module } from '@nestjs/common';
import { ElementoPromocionableService } from './elemento-promocionable.service';
import { ElementoPromocionable } from './elemento-promocionable.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ElementoPromocionable])],
  providers: [ElementoPromocionableService]
})
export class ElementoPromocionableModule {}
