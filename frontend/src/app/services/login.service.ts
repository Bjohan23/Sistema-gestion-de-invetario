import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/v1/api/login';
  private tokenkey = 'authToken';
  private rolkey = 'authRol';
  private userkey = 'authUser';
  private iduser = 'authIdUser';
  constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Observable<any>{
      const loginData = { username, password };
      return this.http.post(`${this.baseUrl}`, loginData);
    }

        
    setToken(token: string) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.tokenkey, token);
        console.log(token);
      }
    }
    
    // Método para obtener el token almacenado
    getToken(): string | null {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(this.tokenkey);
      }
      return null;
    }
    
    setRol(rol: string) {
      if (typeof window !== 'undefined') {
        return localStorage.setItem(this.rolkey, rol);
      }
      return null;
    }

    getRol(): string | null {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(this.rolkey);
      }
      return null;
    }

    setUser(user: string){
      if (typeof window !== 'undefined') {
        return localStorage.setItem(this.userkey, user);
      }
      return null;
    }

    getUser(): string | null{
      if (typeof window !== 'undefined') {
        return localStorage.getItem(this.userkey);
      }
      return null;
    }
    // Método para eliminar el token y realizar logout
    logout() {
      localStorage.removeItem(this.tokenkey);
      this.router.navigate(['/login']);
    }
}
