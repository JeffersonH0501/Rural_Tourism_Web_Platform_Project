import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ArtesaniasEntity } from '../artesanias/artesanias.entity';
import { ProductoAgricolaEntity } from '../productos_agricolas/producto_agricola.entity';
import { Finca } from '../fincas/fincas.entity';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ nullable: true })
    foto: string;

    @Column()
    correo: string;

    @Column()
    contraseña: string;

    @Column()
    rol: string;

    @OneToMany(() => ArtesaniasEntity, artesania => artesania.usuario)
    artesanias: ArtesaniasEntity[];
    
    @OneToMany(() => ProductoAgricolaEntity, productoAgricola => productoAgricola.usuario)
    productosAgricola: ProductoAgricolaEntity[];

    @OneToMany(() => Finca, finca => finca.usuario)
    fincas: Finca[];
}