import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}
  goToRegister() {
    this.router.navigate(['/register']);  // Corregí la ruta a '/register'
  }
  onSubmit() {
    if (!this.username || !this.password ) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }
    // Llamar al servicio de login para autenticar al usuario
    this.loginService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guardar el token cuando el login sea exitoso
        this.loginService.setToken(response.data.token);
        this.loginService.setRol(response.data.rol)
        // Redirigir al dashboard después del login
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Si ocurre un error, mostrar un mensaje
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
