import { TourEntity } from '../tour/tour.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { UsuarioEntity } from '../models/usuario.entity';

@Entity()
export class Finca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ubicacion: string;

  @Column()
  servicios: string;

  @Column('decimal')
  precio: number;

  @Column('int')
  capacidad: number;

  @Column('text')
  descripcion: string;

  @Column()
  imagen: string;

  @Column('boolean')
  disponibilidad: boolean;

  @OneToOne(() => TourEntity, tour => tour.finca)
  @JoinColumn()
  tour: TourEntity;

  @ManyToOne(() => UsuarioEntity, usuario => usuario.fincas)
  usuario: UsuarioEntity;
}
