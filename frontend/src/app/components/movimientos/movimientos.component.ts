import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovimientosInventario } from '../../models/MovimientosInventario';
import { MovimientoProductosService } from '../../services/movimiento-productos.service';
import { ProfileComponent } from '../profile/profile.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Producto } from '../../models/producto';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [DashboardComponent, FormsModule, CommonModule, ProfileComponent],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.css'
})
export class MovimientosComponent {
  movimientos: MovimientosInventario[] = []; // Lista de movimientos
  movimiento: MovimientosInventario = new MovimientosInventario(); // Movimiento seleccionado para registrar
  productos: Producto[] = []; // Lista de productos
  showRegistrarNuevo: boolean = false; // Controla el modal de registro
  showDeleteAlert: boolean = false; // Controla la alerta de confirmación de eliminación
  selectedMovimiento: MovimientosInventario | null = null; // Movimiento seleccionado para eliminar
  showSuccessMessage: boolean = false; // Muestra un mensaje de éxito
  successMessage: string = ''; // Mensaje dinámico de éxito
  nombres: string[] = [];

  constructor(
    private movimientoService: MovimientoProductosService,
    private productoService: ProductosService, // Inyectar el servicio de productos
    private loginService: LoginService,

    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductos(); // Obtener todos los productos primero
  }

  getProductos(): void {
    this.productoService.getAllProducts().subscribe({
      next: (response) => {
        this.productos = response.data; // Guardar los productos en el array
        this.getMovimientos(); // Llamamos a getMovimientos después de tener los productos
      },
      error: (error) => console.error('Error al cargar productos:', error),
    });
  }

  // Obtener todos los movimientos de inventario
  getMovimientos(): void {
    this.movimientoService.getAllMovimientos().subscribe({
      next: (response) => {
        this.movimientos = response.data;
        console.log(this.movimientos);
        // Limpiar el array de nombres antes de llenarlo
        console.log(this.productos);
        // Asignar el nombre del producto a cada movimiento
        this.movimientos.forEach(movimiento => {
          const producto = this.productos.find(producto => producto.id === movimiento.producto_id);

          if (producto) {
            // Insertar el nombre del producto en el array de nombres
            this.nombres.push(producto.nombre);
          } else {
            // Si el producto no se encuentra, podemos insertar un valor por defecto
            this.nombres.push('Producto no encontrado');
          }
        });

        // Si deseas ver los nombres cargados
        console.log(this.nombres);
      },
      error: (error) => console.error('Error al cargar movimientos:', error),
    });
  }

  // Abrir el modal para registrar un nuevo movimiento
  openModalRegistrar(): void {
    this.movimiento = new MovimientosInventario(); // Limpiar los campos
    this.showRegistrarNuevo = true;
  }

  // Cerrar el modal de registro
  closeRegistrarNuevo(): void {
    this.showRegistrarNuevo = false;
  }

  // Guardar un nuevo movimiento
  save(): void {
    if (!this.movimiento.producto_id || !this.movimiento.cantidad || !this.movimiento.tipo || !this.movimiento.estado || !this.movimiento.fecha || !this.movimiento.motivo) {
      alert("Por favor complete todos los campos.");
      return;
    }
    console.log('PRODUCTOs  ', this.productos)
    console.log('PRODUCTO SELECCIONADO', this.movimiento.producto_id)
    // Buscar el producto seleccionado por su ID

    const productoSeleccionado = this.productos.find(producto => producto.id === Number(this.movimiento.producto_id));

    if (!productoSeleccionado) {
      alert('Producto no encontrado.');
      return;
    }

    // Actualizar el stock según el tipo de movimiento
    if (this.movimiento.tipo === 'Ingreso') {
      // Incrementar el stock
      productoSeleccionado.stock += this.movimiento.cantidad;
    } else if (this.movimiento.tipo === 'Egreso') {
      // Decrementar el stock (asegurándonos de no bajar el stock a un número negativo)
      if (productoSeleccionado.stock >= this.movimiento.cantidad) {
        productoSeleccionado.stock -= this.movimiento.cantidad;
      }
    }

    // Llamar al servicio para registrar el movimiento
    this.movimientoService.createMovimiento(this.movimiento).subscribe({
      next: (response) => {
        // Actualizar el producto en el backend con el nuevo stock
        this.productoService.updateProduct(productoSeleccionado.id, productoSeleccionado).subscribe({
          next: () => {
            this.successMessage = '¡Movimiento registrado y stock actualizado exitosamente!';
            this.showSuccessMessage = true;
            setTimeout(() => this.showSuccessMessage = false, 3000); // Ocultar el mensaje después de 3 segundos
            this.getMovimientos(); // Actualizar la lista de movimientos
            this.closeRegistrarNuevo(); // Cerrar el modal de registro
          },
          error: (error) => {
            alert('Error al actualizar el producto');
            console.error(error);
          },
        });
      },
      error: (error) => {
        alert('Error al registrar el movimiento');
        console.error(error);
      },
    });
  }


  // Abrir la alerta para confirmar la eliminación
  openEliminar(movimiento: MovimientosInventario): void {
    this.selectedMovimiento = movimiento;
    this.showDeleteAlert = true;
  }

  // Cancelar la eliminación
  cancelDelete(): void {
    this.selectedMovimiento = null;
    this.showDeleteAlert = false;
  }

  // Confirmar la eliminación
  // Confirmar la eliminación
// Confirmar la eliminación
confirmDelete(): void {
  if (this.selectedMovimiento) {  // Verificar si 'selectedMovimiento' no es null
    // Primero, obtener el producto afectado
    const productoAfectado = this.productos.find(producto => producto.id === this.selectedMovimiento?.producto_id);
    
    if (productoAfectado) {
      // Si el movimiento fue un egreso, aumentamos el stock
      if (this.selectedMovimiento.tipo === 'Egreso') {
        productoAfectado.stock += this.selectedMovimiento.cantidad;
      }
      // Si fue un ingreso, debemos restar la cantidad (esto depende de la lógica de tu sistema)
      else if (this.selectedMovimiento.tipo === 'Ingreso') {
        productoAfectado.stock -= this.selectedMovimiento.cantidad;
      }
      
      // Actualizamos el producto en el backend
      this.productoService.updateProduct(productoAfectado.id, productoAfectado).subscribe({
        next: () => {
          // Ahora eliminamos el movimiento
          this.movimientoService.deleteMovimiento(this.selectedMovimiento?.id!).subscribe({  // Usar el operador de afirmación '!'
            next: () => {
              this.successMessage = '¡Movimiento eliminado y stock actualizado exitosamente!';
              this.showSuccessMessage = true;
              setTimeout(() => this.showSuccessMessage = false, 3000); // Ocultar el mensaje después de 3 segundos
              this.getMovimientos(); // Actualizar la lista de movimientos
              this.cancelDelete(); // Cerrar la alerta de eliminación
            },
            error: (error) => {
              alert('Error al eliminar el movimiento');
              console.error(error);
            },
          });
        },
        error: (error) => {
          alert('Error al actualizar el producto');
          console.error(error);
        }
      });
    }
  } else {
    console.error('No se ha seleccionado un movimiento');
  }
}


}
