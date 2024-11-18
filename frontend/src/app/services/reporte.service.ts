import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reporte } from '../models/Reporte';
@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost:3000/v1/api/reportes'; // Asegúrate de configurar correctamente la URL base de la API

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // Obtener todos los reportes
  getAllReportes(): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(this.apiUrl, { headers });
  }

  // Obtener un reporte por ID
  getReporteById(id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo reporte
  createReporte(reporte: Reporte): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, reporte, { headers });
  }

  // Actualizar un reporte existente
  updateReporte(id: number, reporte: Reporte): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, reporte, { headers });
  }

  // Eliminar un reporte
  deleteReporte(id: number): Observable<any> {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
