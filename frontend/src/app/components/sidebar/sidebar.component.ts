import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DashboardComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  role: string | null = '';
  authUser: string | null = '';
  constructor(private loginService: LoginService) {}
  ngOnInit() {
    this.authUser = this.loginService.getUser();
    // Recuperar el rol para usarlo en el componente
    this.role = this.loginService.getRol();
 
  }
  logout() {
    localStorage.clear();  // Limpiar todo el localStorage
    // Redirigir al login o a la página principal si lo deseas
    window.location.href = '/login';  // Redirige a la página de login
  }
}
