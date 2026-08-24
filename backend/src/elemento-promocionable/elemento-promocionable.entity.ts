import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Promocion } from '../promocion/promocion.entity';
import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';

@Entity()
export class ElementoPromocionable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoElemento: string;

  @Column()
  nombre: string;

  @Column('text')
  descripcion: string;

  @OneToOne(() => Promocion, promocion => promocion.elementoPromocionable)
  promocion: Promocion;

  @OneToOne(() => ProductoAgricolaEntity, productoAgricola => productoAgricola.elementoPromocionable, { nullable: true, cascade: true })
  @JoinColumn()
  productoAgricola: ProductoAgricolaEntity;

}
