    export class Categoria{
        id: number;
        descripcion: string;
        nombre: string;

        constructor(
            id?: number,
            descripcion?: string,
            nombre?: string
        ){
            this.id = id ?? 0;
            this.descripcion = descripcion ?? '';
            this.nombre = nombre ?? '';
        }
    }