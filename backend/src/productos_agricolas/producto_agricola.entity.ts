import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { UsuarioEntity } from '../models/usuario.entity';
import { ElementoPromocionable } from '../elemento-promocionable/elemento-promocionable.entity';

@Entity()
export class ProductoAgricolaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    tipo: string;
    
    @Column()
    descripcion: string;

    @Column({ nullable: true })
    disponibilidad: boolean;

    @Column()
    precio: number;

    @Column({ nullable: true })
    origen: string;

    @Column({ nullable: true })
    temporada: string;

    @Column({ nullable: true })
    imagen: string;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.productosAgricola)
    usuario: UsuarioEntity;

    @OneToOne(() => ElementoPromocionable, elementoPromocionable => elementoPromocionable.productoAgricola, { nullable: true })
    elementoPromocionable: ElementoPromocionable;
}