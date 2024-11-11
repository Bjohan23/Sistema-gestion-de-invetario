import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { UsuarioService } from '../../services/usuario.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [DashboardComponent, FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  showEditModal = false;
  errorMessage: string = '';
  Usuario: Usuario = new Usuario();
  submitted = false;
  users: any[] = [];
  role: string | null = '';
  authUser: string | null = '';
  showModal: boolean = false; 

  constructor(  private router: Router, private usuarioService: UsuarioService, private loginService: LoginService) {}
  ngOnInit() {
    this.authUser = this.loginService.getUser();
    // Recuperar el rol para usarlo en el componente
    this.role = this.loginService.getRol();
    this.getUsers();

  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.errorMessage = '';  // Limpiar mensaje de error
    this.Usuario = { id: 0, username: '', password: '', rol: '', activo: 1 };  // Limpiar campos
  }

  newEmployee(): void {
    this.submitted = false;
    this.Usuario = new Usuario();
  }
  logout() {
    localStorage.clear();  // Limpiar todo el localStorage
    // Redirigir al login o a la página principal si lo deseas
    window.location.href = '/login';  // Redirige a la página de login
  }

  getUsers() {
    this.usuarioService.getEmployeesList().subscribe((response: any) => {
      if (response.success) {
        this.users = response.data;
        console.log(this.users);
      }
    });
  }

  save() {
    if (!this.Usuario.username || !this.Usuario.password || !this.Usuario.rol) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.usuarioService.create(this.Usuario).subscribe({
      next: (data) => {
        this.showModal = true;  // Mostrar modal de éxito
        setTimeout(() => {
          this.closeModal();
          // Redirigir después de 3 segundos
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar';
      }
    });
  }

  openEditModal(user: any) {
    this.Usuario = { ...user }; // Cargar el usuario en el formulario
    this.showEditModal = true; // Mostrar el modal
  }

  // Cerrar el modal sin guardar cambios
  closeEditModal() {
    this.showEditModal = false;
    this.Usuario = { id: 0, username: '', password: '', rol: '', activo: 1 };  // Limpiar campos // Limpiar el formulario
  }

  updateUser() {
    if (!this.Usuario.username || !this.Usuario.rol) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.usuarioService.updateEmployee(this.Usuario.id, this.Usuario).subscribe({
      next: () => {
        alert('Usuario actualizado con éxito');
        this.closeEditModal();
        this.getUsers(); // Actualizar la lista de usuarios
      },
      error: (err) => {
        alert('Error al actualizar usuario');
        console.error(err);
      }
    });
  }


  // Acción para enviar el formulario
  onSubmit() {
    this.save();
  }
}
