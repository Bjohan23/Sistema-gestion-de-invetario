import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/v1/api/register';
  private baseUrl2 = 'http://localhost:3000/v1/api/usuarios';
  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

  create(usuario: Usuario): Observable<Object> {
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
  updateEmployee(id: number, value: Usuario): Observable<Object> {
    const token = this.loginService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return new Observable(); // Retorna un observable vacío o puedes lanzar un error
    }

    // Crear los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const usuarioActualizar = {
      id: value.id,  // ID del usuario a actualizar
      username: value.username || '',  // Nombre de usuario
      activo: value.activo !== undefined ? value.activo : true,  // Asegúrate de enviar un valor booleano para 'activo'
      rol: value.rol || 'Usuario'  // Valor predeterminado de 'rol' si no se proporciona
    };
    // Asegúrate de que la URL esté correcta y el id se pase bien
    const url = `${this.baseUrl2}/${id}`; // Debería ser `${this.baseUrl2}/${id}` si el id es parte de la URL

    // Realizar la solicitud PUT con los datos y los encabezados
    return this.http.put(url, value, { headers });
  }
  deleteEmployee(id: number): Observable<any> {
    const token = this.loginService.getToken();

    // Verifica si el token existe
    if (!token) {
      // Si no hay token, redirige al login o maneja la falta de token
      this.router.navigate(['/login']);
      return new Observable(); // Retorna un observable vacío o lanza un error
    }

    // Crear los encabezados con el token (Asegúrate de instanciar correctamente HttpHeaders)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud DELETE con los encabezados de autorización
    return this.http.delete(`${this.baseUrl2}/${id}`, { headers });
  }



}