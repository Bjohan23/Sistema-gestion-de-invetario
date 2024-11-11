  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { LoginService } from './login.service'; 
  @Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    private baseUrl = 'http://localhost:3000/v1/api/register';
    private baseUrl2 = 'http://localhost:3000/v1/api/usuarios';
    constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

    create(usuario: Object): Observable<Object> { 
      return this.http.post(`${this.baseUrl}`, usuario); 
    } 

    getEmployeesList(): Observable<any> { 
      const token = this.loginService.getToken();
    
      // Verifica si el token existe
      if (!token) {
        // Si no hay token, redirige al login o maneja la falta de token
        this.router.navigate(['/login']);
        return new Observable(); // Retorna un observable vacío o puedes lanzar un error
      }
    
      // Crear los encabezados con el token (Asegúrate de instanciar correctamente HttpHeaders)
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    
      // Realizar la solicitud GET con los encabezados de autorización
      return this.http.get(`${this.baseUrl2}`, { headers });
    }
    updateEmployee(id: number, value: any): Observable<Object> { 
      const token = this.loginService.getToken();
      if (!token) {
        // Si no hay token, redirige al login o maneja la falta de token
        this.router.navigate(['/login']);
        return new Observable(); // Retorna un observable vacío o puedes lanzar un error
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put(`${this.baseUrl}/${id}`, value); 
    } 
   

  }
