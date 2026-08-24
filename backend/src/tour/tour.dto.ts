import {IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class TourDto {
    @IsString()
    @IsNotEmpty()
    readonly Titulo: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly Precio: number;
    
    @IsString()
    @IsNotEmpty()
    readonly Imagen: string;

    @IsDate()
    @IsNotEmpty()
    readonly Fecha: Date;

    @IsNumber()
    @IsNotEmpty()
    readonly Hora: number;

    @IsString()
    @IsNotEmpty()
    readonly Ubicacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly Duracion: number;

    @IsString()
    @IsNotEmpty()
    readonly Descripcion: string;
}
