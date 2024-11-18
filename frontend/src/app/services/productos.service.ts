import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Producto } from '../models/producto';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private baseUrl = 'http://localhost:3000/v1/api/productos'; // URL base para los productos

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router
  ) {}

  // Obtener todos los productos
  getAllProducts(): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable(); // Retorna un observable vacío si no hay token

    return this.http.get(`${this.baseUrl}`, { headers });
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  // Crear un nuevo producto
  createProduct(producto: Producto): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.post(`${this.baseUrl}`, producto, { headers });
  }

  // Actualizar un producto existente
  updateProduct(id: number, producto: Producto): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.put(`${this.baseUrl}/${id}`, producto, { headers });
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  // Obtener encabezados de autorización con el token
  private getAuthHeaders(): HttpHeaders | null {
    const token = this.loginService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return null; // Redirige al login si no hay token
    }

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
