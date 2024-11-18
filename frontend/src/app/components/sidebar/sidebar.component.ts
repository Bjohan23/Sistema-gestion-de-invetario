import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { ReporteService } from '../../services/reporte.service';
import { Reporte } from '../../models/Reporte';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DashboardComponent, CommonModule, ProfileComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  reporte: Reporte = new Reporte(); // Almacena el reporte actual
  isLoading: boolean = false; // Controla el estado de carga
  reporteCargado: boolean = false; // Controla si el reporte está cargado
  role: string = ''; // Almacena el rol del usuario
  authUser: any; // Información del usuario autenticado

  constructor(
    private reporteService: ReporteService,
    private productosService: ProductosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkAndCreateReporte();
    this.loadReportes(); // Verifica si existe el reporte inicial
  }

  // Método para verificar si existe un reporte, si no, lo crea
  checkAndCreateReporte(): void {
    this.reporteService.getAllReportes().subscribe({
      next: (response) => {
        if (response.data.length === 0) {
          // Si no hay reportes, crea uno nuevo
          this.createInitialReporte();
        } else {
          // Si existe, almacénalo
          this.reporte = response.data[0];
          this.reporteCargado = true;
        }
      },
      error: (error) => {
        console.error('Error al verificar el reporte:', error);
      }
    });
  }

  // Crea un reporte inicial vacío
  createInitialReporte(): void {
    const newReporte = new Reporte(
      0,
      new Date(),
      0, // Total de productos inicial
      0 // Valor total inicial
    );

    this.reporteService.createReporte(newReporte).subscribe({
      next: (response) => {
        this.reporte = response.data;
        this.reporteCargado = true;
      },
      error: (error) => {
        console.error('Error al crear el reporte inicial:', error);
      }
    });
  }

  // Método para cargar productos, calcular los totales y actualizar el reporte
  // Método para cargar productos, calcular los totales y actualizar el reporte
  loadReportes(): void {
    if (!this.reporte) {
      console.error('No hay reporte inicial para actualizar.');
      return;
    }

    this.isLoading = true; // Activa el estado de carga

    this.productosService.getAllProducts().subscribe({
      next: (response) => {
        const productos = response.data;

        console.log(productos);

        // Calcular el total de productos y el valor total
        const totalProductos = productos.reduce(
          (sum: number, producto: any) => sum + (producto.activo ? producto.stock : 0),
          0
        );

        const valorTotal = productos.reduce(
          (sum: number, producto: any) => sum + (producto.activo ? producto.stock * producto.precio : 0),
          0
        );

        // Actualizar el reporte actual con los cálculos
        this.reporte.total_productos = totalProductos;
        this.reporte.valor_total = valorTotal;

        this.reporteService.updateReporte(this.reporte.id, this.reporte).subscribe({
          next: () => {
            console.log('Reporte actualizado exitosamente.');
            this.checkAndCreateReporte();
            this.isLoading = false; // Finaliza el estado de carga
          },
          error: (error) => {
            console.error('Error al actualizar el reporte:', error);
            this.isLoading = false; // Finaliza el estado de carga
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.isLoading = false; // Finaliza el estado de carga
      }
    });
  }

  gotoUsuario() {
    this.router.navigate(['gestion-usuario']);
  }

  gotoCategorias() {
    this.router.navigate(['categorias']);
  }

  gotoProductos() {
    this.router.navigate(['productos']);
  }
  gotoMovimientos() {
    this.router.navigate(['movimiento']);
  }
}
