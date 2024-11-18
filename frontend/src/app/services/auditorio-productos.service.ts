import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { AuditoriaProducto } from '../models/AuditoriaProducto';
@Injectable({
  providedIn: 'root'
})
export class AuditorioProductosService {
  private baseUrl = 'http://localhost:3000/v1/api/auditoriaproducto'; // Cambia la URL base si es necesario

  constructor(private http: HttpClient, private loginservice: LoginService) {}

  // Obtener todos los registros de auditoría de productos
  getAllAuditoriaProductos(): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();
    return this.http.get(`${this.baseUrl}/`,  {headers});
  }

  // Obtener un registro de auditoría de producto por ID
  getAuditoriaProductoById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();
    return this.http.get(`${this.baseUrl}/${id}`, {headers});
  }

  // Crear un nuevo registro de auditoría de producto
  createAuditoriaProducto(auditoriaProductoData: AuditoriaProducto): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();
    return this.http.post(`${this.baseUrl}/`, auditoriaProductoData,  {headers});
  }
  private getAuthHeaders(): HttpHeaders | null {
    const token = this.loginservice.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
