import { Finca } from '../fincas/fincas.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TourEntity {
    @PrimaryGeneratedColumn()
    id: number;
        
    @Column()
    Titulo: string;

    @Column()
    Precio: number;

    @Column()
    Imagen: string;

    @Column()
    Fecha: Date;

    @Column()
    Hora: number;

    @Column()
    Ubicacion: string;

    @Column()
    Duracion: number

    @Column()
    Descripcion: string;

    @OneToOne(() => Finca, finca => finca.tour)
    @JoinColumn()
    finca: Finca;
}
