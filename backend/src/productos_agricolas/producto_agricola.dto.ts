export class CreateProductoAgricolaDto {
    nombre: string;
    tipo: string;
    descripcion: string;
    disponibilidad: boolean;
    precio: number;
    origen: string;
    temporada: string;
    imagen: string;
    elementoPromocionableId?: number;  
}

export class UpdateProductoAgricolaDto {
    nombre?: string;
    tipo?: string;
    descripcion?: string;
    disponibilidad?: boolean;
    precio?: number;
    origen?: string;
    temporada?: string;
    imagen?: string;
    elementoPromocionableId?: number;  
}
