import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
abstract class OwnedRecord {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => User, (user) => user.agriculturalProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
@Entity('agricultural_products')
export class AgriculturalProduct extends OwnedRecord {
  @Column() name: string;
  @Column({ nullable: true }) type?: string;
  @Column('text') description: string;
  @Column({ default: true }) available: boolean;
  @Column('decimal', { precision: 12, scale: 2 }) price: number;
  @Column({ nullable: true }) origin?: string;
  @Column({ nullable: true }) season?: string;
  @Column({ name: 'image_url', nullable: true }) imageUrl?: string;
}
@Entity('crafts')
export class Craft extends OwnedRecord {
  @Column() name: string;
  @Column('decimal', { precision: 12, scale: 2 }) price: number;
  @Column('int') quantity: number;
  @Column() material: string;
  @Column({ default: true }) available: boolean;
  @Column() origin: string;
  @Column('text') description: string;
  @Column({ name: 'image_url', nullable: true }) imageUrl?: string;
}
@Entity('farms')
export class Farm extends OwnedRecord {
  @Column() name: string;
  @Column() location: string;
  @Column('text') services: string;
  @Column('decimal', { precision: 12, scale: 2 }) price: number;
  @Column('int') capacity: number;
  @Column('text') description: string;
  @Column({ name: 'image_url', nullable: true }) imageUrl?: string;
  @Column({ default: true }) available: boolean;
}
@Entity('tours')
export class Tour extends OwnedRecord {
  @Column() title: string;
  @Column('decimal', { precision: 12, scale: 2 }) price: number;
  @Column({ name: 'image_url', nullable: true }) imageUrl?: string;
  @Column('date') date: string;
  @Column() time: string;
  @Column() location: string;
  @Column('decimal', { name: 'duration_hours', precision: 5, scale: 2 })
  durationHours: number;
  @Column('text') description: string;
  @ManyToOne(() => Farm, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'farm_id' })
  farm?: Farm;
}
@Entity('promotions')
export class Promotion extends OwnedRecord {
  @Column() title: string;
  @Column('text') description: string;
  @Column('date', { name: 'start_date' }) startDate: string;
  @Column('date', { name: 'end_date' }) endDate: string;
}
