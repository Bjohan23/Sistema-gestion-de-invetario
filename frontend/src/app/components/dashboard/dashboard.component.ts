import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  role: string | null = '';
  isSidebarVisible = false; // Controla la visibilidad de la sidebar
  constructor(private router: Router, private loginService: LoginService) { }


  isUsuarioActive(): boolean {
    return this.router.url === 'gestion-usuario';
  }
  ngOnInit() {

    // Recuperar el rol para usarlo en el componente
    this.role = this.loginService.getRol();
    console.log('Rol recuperado:', this.role);
  }
  isActive(ruta: string): boolean {
    console.log('Rol recuperado:', this.router.url);
    return this.router.url === ruta;
  }
  gotoAdonde(nombre: String) {
    this.router.navigate([nombre]);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible; // Cambia el estado de la visibilidad
    console.log('Dashboard', this.isSidebarVisible);
  }
}
