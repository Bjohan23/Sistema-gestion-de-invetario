import { Component } from '@angular/core';
import { AuditoriaProducto } from '../../models/AuditoriaProducto';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { AuditorioProductosService } from '../../services/auditorio-productos.service';
@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [DashboardComponent, ProfileComponent, CommonModule],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.css'
})
export class AuditoriaComponent {
  auditoriaProductos: any[] = [];  // Almacena los registros obtenidos
  errorMessage: string = '';  // Para mostrar errores si ocurren

  constructor(private auditoriaProductosService: AuditorioProductosService) {}

  ngOnInit(): void {
    this.loadAuditoriaProductos();  // Cargar los registros al inicializar el componente
  }

  // Método para cargar todos los registros de auditoría de productos
  loadAuditoriaProductos(): void {
    this.auditoriaProductosService.getAllAuditoriaProductos().subscribe(
      (response) => {
        this.auditoriaProductos = response.data;  // Almacenar los registros obtenidos
      },
      (error) => {
        this.errorMessage = 'Ocurrió un error al obtener los datos de auditoría.';  // Manejo de errores
        console.error(error);
      }
    );
  }
}
