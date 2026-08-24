import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ElementoPromocionable } from '../elemento-promocionable/elemento-promocionable.entity';

@Entity()
export class Promocion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  descripcion: string;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @OneToOne(() => ElementoPromocionable, (elementoPromocionable) => elementoPromocionable.promocion, { nullable: true })
  @JoinColumn()
  elementoPromocionable: ElementoPromocionable;
}
