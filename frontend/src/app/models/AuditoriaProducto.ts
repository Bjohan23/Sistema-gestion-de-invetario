  export class AuditoriaProducto {
    id: number;
    producto_id: number;
    usuario_id: number;
    accion: 'Actualizar' | 'Registrar' | 'Activado' | 'Desactivado';
    fecha: Date;
    detalles: string;

    constructor(
      id?: number,
      producto_id?: number,
      usuario_id?: number,
      accion?: 'Actualizar' | 'Registrar'  | 'Activado' | 'Desactivado',
      fecha?: Date,
      detalles?: string
    ) {
      this.id = id ?? 0;
      this.producto_id = producto_id ?? 0;
      this.usuario_id = usuario_id ?? 0;
      this.accion = accion ?? 'Registrar';
      this.fecha = fecha ?? new Date(); // Fecha actual como predeterminada
      this.detalles = detalles ?? '';
    }
  }
