import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { env } from '../config/environment';
import { User } from '../users/user.entity';
import {
  AgriculturalProduct,
  Craft,
  Farm,
  Promotion,
  Tour,
} from '../catalog/catalog.entities';
const entities = [User, AgriculturalProduct, Craft, Farm, Tour, Promotion];
export const databaseOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  url: env.databaseUrl,
  entities,
  synchronize: false,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};
export default new DataSource(databaseOptions as any);
