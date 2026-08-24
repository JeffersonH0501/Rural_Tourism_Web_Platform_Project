import { IsString, IsNumber, IsArray, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFincasDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly ubicacion: string;

  @IsString()
  @IsString()
  readonly servicios: string;

  @IsNumber()
  @IsNotEmpty()
  readonly precio: number;

  @IsNumber()
  @IsNotEmpty()
  readonly capacidad: number;

  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @IsString()
  @IsNotEmpty()
  readonly imagen: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly disponibilidad: boolean;
}
