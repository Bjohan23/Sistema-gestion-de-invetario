import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Categoria } from '../../models/categoria';
import { CategoriasService } from '../../services/categorias.service';
import { ProfileComponent } from '../profile/profile.component';
import { LoginService } from '../../services/login.service'; 
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [DashboardComponent, FormsModule, CommonModule, ProfileComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categorias: Categoria[] = []; // Lista de categorías
  categoria: Categoria = new Categoria(); // Categoría seleccionada para editar/crear
  isEditMode: boolean = false; // Indica si está en modo de edición
  showRegistrarNuevo: boolean = false; // Controla el modal de registro/edición
  showDeleteAlert: boolean = false; // Controla la alerta de confirmación de eliminación
  selectedCategoria: Categoria | null = null; // Categoría seleccionada para eliminar
  showSuccessMessage: boolean = false; // Muestra un mensaje de éxito
  successMessage: string = ''; // Mensaje dinámico de éxito

  constructor(
    private categoriaService: CategoriasService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategorias(); // Cargar la lista de categorías al iniciar
  }

  // Obtener todas las categorías
  getCategorias(): void {
    this.categoriaService.getAllCategories().subscribe({
      next: (response) => {
        this.categorias = response.data;
      },
      error: (error) => console.error('Error al cargar categorías:', error),
    });
  }

  // Abrir el modal para registrar una nueva categoría
  openModalRegistrar(): void {
    this.isEditMode = false;
    this.categoria = new Categoria(); // Limpiar el modelo
    this.showRegistrarNuevo = true;
  }

  // Abrir el modal para editar una categoría existente
  openEditModal(categoria: Categoria): void {
    this.isEditMode = true;
    this.categoria = { ...categoria }; // Copiar los datos de la categoría seleccionada
    this.showRegistrarNuevo = true;
  }

  // Cerrar el modal de registro/edición
  closeRegistrarNuevo(): void {
    this.showRegistrarNuevo = false;
    this.categoria = new Categoria(); // Limpiar el modelo
  }

  // Guardar o actualizar una categoría
  save(): void {
    if (this.isEditMode) {
      // Actualizar categoría
      this.categoriaService.updateCategory(this.categoria.id, this.categoria).subscribe({
        next: () => {
          this.getCategorias(); // Actualizar la lista
          this.showSuccess('Categoría actualizada con éxito');
          this.closeRegistrarNuevo();
        },
        error: (error) => console.error('Error al actualizar la categoría:', error),
      });
    } else {
      // Registrar nueva categoría
      this.categoriaService.createCategory(this.categoria).subscribe({
        next: () => {
          this.getCategorias(); // Actualizar la lista
          this.showSuccess('Categoría registrada con éxito');
          this.closeRegistrarNuevo();
        },
        error: (error) => console.error('Error al registrar la categoría:', error),
      });
    }
  }

  // Eliminar una categoría
  openEliminar(categoria: Categoria): void {
    this.selectedCategoria = categoria;
    this.showDeleteAlert = true;
  }

  // Confirmar la eliminación
  confirmDelete(): void {
    if (this.selectedCategoria) {
      this.categoriaService.deleteCategory(this.selectedCategoria.id).subscribe({
        next: () => {
          this.getCategorias(); // Actualizar la lista
          this.showSuccess('Categoría eliminada con éxito');
          this.cancelDelete();
        },
        error: (error) => console.error('Error al eliminar la categoría:', error),
      });
    }
  }

  // Cancelar la acción de eliminación
  cancelDelete(): void {
    this.showDeleteAlert = false;
    this.selectedCategoria = null;
  }

  // Mostrar un mensaje de éxito
  showSuccess(message: string): void {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000); // Ocultar después de 3 segundos
  }
}
