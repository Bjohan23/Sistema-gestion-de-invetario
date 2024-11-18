import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { Producto } from '../../models/producto';
import { Usuario } from '../../models/usuario';
import { Categoria } from '../../models/categoria';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import { AuditoriaProducto } from '../../models/AuditoriaProducto';
import { AuditorioProductosService } from '../../services/auditorio-productos.service';
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [DashboardComponent, FormsModule, CommonModule, ProfileComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  auditorias: AuditoriaProducto = new AuditoriaProducto();
  productos: Producto[] = []; // Lista de productos
  categorias: Categoria[] = []; // Lista de categorías para asociar al producto
  producto: Producto = new Producto(); // Producto seleccionado para editar/crear
  isEditMode: boolean = false; // Indica si está en modo de edición
  showRegistrarNuevo: boolean = false; // Controla el modal de registro/edición
  showDeleteAlert: boolean = false; // Controla la alerta de confirmación de eliminación
  selectedProducto: Producto | null = null; // Producto seleccionado para eliminar
  showSuccessMessage: boolean = false; // Muestra un mensaje de éxito
  successMessage: string = ''; // Mensaje dinámico de éxito
  numero: number = 0;
  usuario: Usuario[] = [];
  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    private auditoria: AuditorioProductosService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductos(); // Cargar la lista de productos al iniciar
    this.getCategorias(); // Cargar la lista de categorías para el select
  }

  // Obtener todos los productos
  getProductos(): void {
    this.productosService.getAllProducts().subscribe({
      next: (response) => {
        this.productos = response.data;
      },
      error: (error) => console.error('Error al cargar productos:', error),
    });
  }

  // Obtener todas las categorías
  getCategorias(): void {
    this.categoriasService.getAllCategories().subscribe({
      next: (response) => {
        this.categorias = response.data;
      },
      error: (error) => console.error('Error al cargar categorías:', error),
    });
  }

  // Abrir el modal para registrar un nuevo producto
  openModalRegistrar(): void {
    this.isEditMode = false;
    this.producto = new Producto(); // Limpiar el modelo
    this.showRegistrarNuevo = true;
  }

  // Abrir el modal para editar un producto existente
  openEditModal(producto: Producto): void {
    this.isEditMode = true;
    this.producto = { ...producto }; // Copiar los datos del producto seleccionado
    this.showRegistrarNuevo = true;
  }
  // Método para obtener el nombre de la categoría por ID
  getCategoriaNombre(categoriaId: number): string {
    const categoria = this.categorias.find(cat => cat.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría'; // Retorna un valor por defecto si no encuentra la categoría
  }

  // Cerrar el modal de registro/edición
  closeRegistrarNuevo(): void {
    this.showRegistrarNuevo = false;
    this.producto = new Producto(); // Limpiar el modelo
  }

  // Guardar o actualizar un producto
  save(): void {
    if (this.isEditMode) {
      console.log('PR AC', this.producto);
      this.auditorias.accion = 'Actualizar';
      this.auditorias.detalles = 'Se Realizo Actualización a Productos';
      this.auditorias.producto_id = this.producto.id;
  
      // Primero actualizar el producto
      this.productosService.updateProduct(this.producto.id, this.producto).subscribe({
        next: () => {
          // Obtener la lista de empleados y asignar el usuario
          this.usuarioService.getEmployeesList().subscribe((response: any) => {
            if (response.success) {
              this.usuario = response.data;
  
              // Buscar el usuario que coincide con el usuario actual
              const user = this.usuario.find((user) => user.username === this.loginService.getUser());
              if (user) {
                this.auditorias.usuario_id = user.id;
                console.log('Usuario encontrado:', this.auditorias.usuario_id);
  
                // Crear la auditoría
                this.auditoria.createAuditoriaProducto(this.auditorias).subscribe(() => {
                  // Actualizar lista de productos
                  this.getProductos();
                  this.showSuccess('Producto actualizado con éxito');
                  this.closeRegistrarNuevo();
                });
              }
            } else {
              console.error('Error en la respuesta:', response);
            }
          });
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      });
    } else {
      // Registrar nuevo producto
      this.auditorias.accion = 'Registrar';
      this.auditorias.detalles = "Se Realizo Registro de Productos";  // Asegúrate que este detalle se asigna correctamente
      
      // Obtener lista de empleados y asignar usuario_id
      this.usuarioService.getEmployeesList().subscribe((response: any) => {
        if (response.success) {
          this.usuario = response.data;
  
          // Buscar el usuario que coincide con el usuario actual
          const user = this.usuario.find((user) => user.username === this.loginService.getUser());
          if (user) {
            this.auditorias.usuario_id = user.id;
            console.log('Usuario encontrado:', this.auditorias.usuario_id);
  
            // Ahora, realizar la creación del producto
            this.productosService.createProduct(this.producto).subscribe({
              next: (response) => {
                // Asignar el producto_id desde la respuesta del servidor
                this.auditorias.producto_id = response.data.id;
                console.log('AUDITORIA', this.auditorias);
  
                // Crear auditoría del producto
                this.auditoria.createAuditoriaProducto(this.auditorias).subscribe(() => {
                  // Actualizar lista de productos
                  this.getProductos(); // Actualizar la lista
                  this.showSuccess('Producto registrado con éxito');
                  this.closeRegistrarNuevo();
                });
              },
              error: (error) => {
                console.error('Error al registrar el producto:', error);
              },
            });
          }
        } else {
          console.error('Error en la respuesta:', response);
        }
      });
  
      // Limpiar los datos de la auditoría después de realizar todo
      // **Aquí es importante que no reinicies `this.auditorias` antes de tiempo**
      //this.auditorias = new AuditoriaProducto(); // Deja esto fuera para evitar perder los datos antes de completar
    }
  }
  

  // Eliminar un producto
  openEliminar(producto: Producto): void {
    this.selectedProducto = producto;
    this.showDeleteAlert = true;
  }

  // Confirmar la eliminación
  confirmDelete(): void {
    if (this.selectedProducto) {
      this.productosService.deleteProduct(this.selectedProducto.id).subscribe({
        next: () => {
          this.getProductos(); // Actualizar la lista
          this.showSuccess('Producto eliminado con éxito');
          this.cancelDelete();
        },
        error: (error) => console.error('Error al eliminar el producto:', error),
      });
    }
  }

  // Cancelar la acción de eliminación
  cancelDelete(): void {
    this.showDeleteAlert = false;
    this.selectedProducto = null;
  }

  // Mostrar un mensaje de éxito
  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000); // Ocultar después de 3 segundos
  }
}
