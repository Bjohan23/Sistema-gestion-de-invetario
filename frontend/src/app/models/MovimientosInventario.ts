export class MovimientosInventario  {
    id: number;
    producto_id: number;
    cantidad: number;
    tipo: 'Ingreso' | 'Egreso';
    estado: 'Realizado' | 'No Compleado' ;
    fecha: Date;
    motivo: string;

    constructor(
        id?: number,
        producto_id?: number,
        cantidad?: number,
        tipo?: 'Ingreso' | 'Egreso',
        estado?: 'Realizado' | 'No Compleado',
        fecha?: Date,
        motivo?: string
    ) {
        this.id = id ?? 0;
        this.producto_id = producto_id ?? 0;
        this.cantidad = cantidad ?? 0;
        this.tipo = tipo ?? 'Ingreso';
        this.estado = estado ?? 'Realizado';
        this.fecha = fecha ?? new Date();
        this.motivo = motivo ?? '';
    }
}
