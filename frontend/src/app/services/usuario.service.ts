import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimientosInventario } from '../models/MovimientosInventario';
import { LoginService } from './login.service'; // Asegúrate de importar LoginService

@Injectable({
  providedIn: 'root'
})
export class MovimientoProductosService {

  private apiUrl = 'http://localhost:3000/v1/api/movimientos_inventario'; // Asegúrate de tener el API base configurado

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Obtener todos los movimientos
  getAllMovimientos(): Observable<any> {
    const token = this.loginService.getToken();

    // Si el token no existe, puedes manejarlo de acuerdo a tu flujo de navegación
    if (!token) {
      // Redirigir al login si no hay token
      return new Observable(); // O manejar el error como prefieras
    }

    // Crear los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud GET con los encabezados de autorización
    return this.http.get(this.apiUrl, { headers });
  }

  // Obtener un movimiento por su ID
  getMovimientoById(id: number): Observable<any> {
    const token = this.loginService.getToken();

    if (!token) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo movimiento
  createMovimiento(movimiento: MovimientosInventario): Observable<any> {
    const token = this.loginService.getToken();

    if (!token) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, movimiento, { headers });
  }

  // Actualizar un movimiento existente
  updateMovimiento(id: number, movimiento: MovimientosInventario): Observable<any> {
    const token = this.loginService.getToken();

    if (!token) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/${id}`, movimiento, { headers });
  }

  // Eliminar un movimiento
  deleteMovimiento(id: number): Observable<any> {
    const token = this.loginService.getToken();

    if (!token) {
      return new Observable();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
