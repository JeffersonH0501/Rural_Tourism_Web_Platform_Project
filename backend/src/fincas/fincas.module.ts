import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FincaService } from './fincas.service';
import { FincaController } from './fincas.controller';
import { Finca } from './fincas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finca])],
  providers: [FincaService],
  controllers: [FincaController],
})
export class FincaModule {}
