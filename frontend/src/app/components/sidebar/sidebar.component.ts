import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DashboardComponent, CommonModule, ProfileComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  role: string | null = '';
  authUser: string | null = '';
  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit() {
    this.authUser = this.loginService.getUser();
    // Recuperar el rol para usarlo en el componente
    this.role = this.loginService.getRol();
 
  }

  gotoUsuario() {
    this.router.navigate(['gestion-usuario']);
  }

  gotoCategorias(){
    this.router.navigate(['categorias'])
  }
}
