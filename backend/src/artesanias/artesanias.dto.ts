import {IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUrl} from 'class-validator';

export class ArtesaniasDto {
    @IsString()
    @IsNotEmpty()
    readonly Nombre: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly Precio: number;
    
    @IsNumber()
    @IsNotEmpty()
    readonly Cantidad: number;

    @IsString()
    @IsNotEmpty()
    readonly Material: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly Disponibilidad: boolean;

    @IsString()
    @IsNotEmpty()
    readonly Origen: string;

    @IsString()
    @IsNotEmpty()
    readonly Descripcion: string;

    @IsString()
    @IsNotEmpty()
    readonly Imagen: string;
}
