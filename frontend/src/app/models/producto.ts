export class Producto{
    id: number;
    nombre: string;
    categoria_id: number;
    descripcion: string;
    precio: number;
    stock: number;
    activo: boolean;

    constructor(
        id?: number,
        nombre?: string,
        categoria_id?: number,
        descripcion?: string,
        precio?: number,
        stock?: number,
        activo?: boolean
    ){
        this.id =id ?? 0;
        this.nombre = nombre ?? '',
        this.categoria_id = categoria_id ?? 0;
        this.descripcion = descripcion ?? '';
        this.precio = precio ?? 0;
        this.stock = stock ?? 0;
        this.activo = activo ?? true;
    }
}
