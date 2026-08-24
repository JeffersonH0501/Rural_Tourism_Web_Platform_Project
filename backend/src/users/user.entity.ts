import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
  AgriculturalProduct,
  Craft,
  Farm,
  Promotion,
  Tour,
} from '../catalog/catalog.entities';
export enum UserRole {
  VISITOR = 'visitor',
  FARMER = 'farmer',
  ARTISAN = 'artisan',
  ADMIN = 'admin',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ name: 'first_name' }) firstName: string;
  @Column({ name: 'last_name' }) lastName: string;
  @Column({ name: 'photo_url', nullable: true }) photoUrl?: string;
  @Column({ unique: true }) email: string;
  @Column({ name: 'password_hash', select: false }) passwordHash: string;
  @Column({ type: 'varchar' }) role: UserRole;
  @OneToMany(() => AgriculturalProduct, (item) => item.owner)
  agriculturalProducts: AgriculturalProduct[];
  @OneToMany(() => Craft, (item) => item.owner) crafts: Craft[];
  @OneToMany(() => Farm, (item) => item.owner) farms: Farm[];
  @OneToMany(() => Tour, (item) => item.owner) tours: Tour[];
  @OneToMany(() => Promotion, (item) => item.owner) promotions: Promotion[];
}
