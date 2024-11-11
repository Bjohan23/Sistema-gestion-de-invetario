import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  role: string | null = '';
  constructor(private loginService: LoginService) {}
  ngOnInit() {
 
    // Recuperar el rol para usarlo en el componente
    this.role = this.loginService.getRol();
    console.log('Rol recuperado:', this.role);
  }
}
