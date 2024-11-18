    export class Reporte {
        id: number;
        fecha: Date;
        total_productos: number;
        valor_total: number;
    
        constructor(
        id?: number,
        fecha?: Date,
        total_productos?: number,
        valor_total?: number
        ) {
        this.id = id ?? 0;
        this.fecha = fecha ?? new Date(); // Fecha actual como predeterminada
        this.total_productos = total_productos ?? 0;
        this.valor_total = valor_total ?? 0;
        }
    }
    