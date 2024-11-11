  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { HttpClient } from '@angular/common/http'; 
  @Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    private baseUrl = 'http://localhost:3000/v1/api/registrer';
    
    constructor(private http: HttpClient, private router: Router) { }
    
    create(usuario: Object): Observable<Object> { 
      return this.http.post(`${this.baseUrl}`, usuario); 
    } 
  }
