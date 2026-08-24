/* eslint-disable prettier/prettier */
import { UsuarioEntity } from '../models/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArtesaniasEntity {
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column()
    Nombre: string;

    @Column()
    Precio: number;

    @Column()
    Cantidad: number;

    @Column()
    Material: string;

    @Column()
    Disponibilidad: boolean;

    @Column()
    Origen: string;

    @Column()
    Descripcion: string;

    @Column()
    Imagen: string

    @ManyToOne(() => UsuarioEntity, usuario => usuario.artesanias)
    usuario: UsuarioEntity;
}
