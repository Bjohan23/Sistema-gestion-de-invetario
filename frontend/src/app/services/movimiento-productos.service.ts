import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientosInventario } from '../models/MovimientosInventario';
@Injectable({
  providedIn: 'root'
})
export class MovimientoProductosService {

  private apiUrl = 'http://localhost:3000/v1/api/movimientos_inventario'; // Asegúrate de tener el API base configurado

  constructor(private http: HttpClient) {}

  // Obtener todos los movimientos
  getAllMovimientos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Obtener un movimiento por su ID
  getMovimientoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo movimiento
  createMovimiento(movimiento: MovimientosInventario): Observable<any> {
    return this.http.post(this.apiUrl, movimiento);
  }

  // Actualizar un movimiento existente
  updateMovimiento(id: number, movimiento: MovimientosInventario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, movimiento);
  }

  // Eliminar un movimiento
  deleteMovimiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
