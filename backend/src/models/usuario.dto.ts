export class CreateUsuarioDto {
    nombre: string;
    apellido: string;
    foto: string;
    correo: string;
    contraseña: string;
    rol: string;
}

export class UpdateUsuarioDto {
    nombre?: string;
    apellido?: string;
    foto?: string;
    correo?: string;
    contraseña?: string;
    rol?: string;
}