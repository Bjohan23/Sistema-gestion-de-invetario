import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  authUser: string | null = '';
  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit() {
    this.authUser = this.loginService.getUser(); 
  }

  logout() {
    localStorage.clear();  // Limpiar todo el localStorage
    // Redirigir al login o a la página principal si lo deseas
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
