import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Categoria } from '../models/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private baseUrl = 'http://localhost:3000/v1/api/categorias'; // URL base para las categorías

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router
  ) {}

  // Obtener todas las categorías
  getAllCategories(): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable(); // Retorna un observable vacío si no hay token

    return this.http.get(`${this.baseUrl}`, { headers });
  }

  // Obtener una categoría por ID
  getCategoryById(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  // Crear una nueva categoría
  createCategory(categoria: Categoria): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.post(`${this.baseUrl}`, categoria, { headers });
  }

  // Actualizar una categoría existente
  updateCategory(id: number, categoria: Categoria): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) return new Observable();

    return this.http.put(`${this.baseUrl}/${id}`, categoria, { headers });
  }

  // Eliminar una categoría
  deleteCategory(id: number): Observable<any> {
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
