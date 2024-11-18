  import { Component } from '@angular/core';
  import { LoginService } from '../../services/login.service';
  import { Usuario } from '../../models/usuario';
  import { FormsModule } from '@angular/forms'; 
  import { Router } from '@angular/router';
  import { CommonModule } from '@angular/common'; 
  import { UsuarioService } from '../../services/usuarios.service';
  import { DashboardComponent } from '../dashboard/dashboard.component';
  import { ProfileComponent } from '../profile/profile.component';
  @Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [DashboardComponent, FormsModule, CommonModule, ProfileComponent],
    templateUrl: './usuarios.component.html',
    styleUrl: './usuarios.component.css'
  })
  export class UsuariosComponent {
    showPassword: boolean = false;
    showAlertEliminarUserAct: boolean = false;
    showRegistrarNuevo: boolean = false;
    showSuccesUpdate: boolean = false;
    isEditMode: boolean = false;


    showDeleteAlert: boolean = false; // Elimianr
    selectedUser: Usuario | null = null; // Seleccionar User
    showSuccesRegistrer: boolean = false;
    user: Usuario = new Usuario();

    usuarios: Usuario[] = []; // Inicializa un arreglo vacío
    role: string | null = ''; // Rol de Usuario
    authUser: string | null = '';  // Usuario Autenticado


    constructor(  private router: Router, private usuarioService: UsuarioService, private loginService: LoginService) {}
    ngOnInit() {
      this.authUser = this.loginService.getUser();
      // Recuperar el rol para usarlo en el componente
      this.role = this.loginService.getRol();
      this.getUsers();

    }
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
    getUsers() {
      this.usuarioService.getEmployeesList().subscribe((response: any) => {
        if (response.success) {
          this.usuarios = response.data;
        
        }
      });
    }

    openEditModal(user: Usuario){
      this.isEditMode = true;
      this.showRegistrarNuevo = true;
      this.user = {...user};
    }
    openModalRegistrar(): void{
      this.isEditMode = false;
      this.showRegistrarNuevo = true;
    }

    openEliminar(user: Usuario) {
      // Verificar si el usuario seleccionado es el usuario activo (logueado)
      const currentUser = this.loginService.getUser(); // Obtener el usuario activo
    
      if (user.username === currentUser) {
        this.selectedUser = user;
        // Si es el mismo, mostrar un mensaje y detener el flujo 
        this.showAlertEliminarUserAct = true;
       
      }else{
        this.selectedUser = user; // Guardar el usuario seleccionado
        this.showDeleteAlert = true; // Mostrar la alerta de confirmación

      }
    
      // Continuar con el flujo si no es el usuario activo
    }
    
    
    // Confirmar la eliminación
    confirmDelete() {
  
      if (this.selectedUser) {
        
        this.usuarioService.deleteEmployee(this.selectedUser.id).subscribe({
          next: () => {
           
            this.getUsers(); // Actualiza la lista de usuarios
            this.cancelDelete(); // Cierra la alerta
          },
          error: (err) => {
            alert('Error al eliminar el usuario');
            console.error(err);
          }
        });
        const currentUser = this.loginService.getUser(); // Obtener el usuario activo
    
        if (this.selectedUser.username === currentUser){
      
          this.loginService.logout();
        }

      }
    }
    
    // Cancelar la acción de eliminación
    cancelDelete() {
      this.showDeleteAlert = false; // Ocultar la alerta
      this.selectedUser = null; // Limpiar el usuario seleccionado
    }
    cancelDeleteUserAc(){
      this.showAlertEliminarUserAct = false;
      this.selectedUser = null;
    }

    closeRegistrarNuevo(){
      this.showRegistrarNuevo = false;
      this.user = new Usuario();
    }

    save(){
      if (!this.showRegistrarNuevo && this.isEditMode) {
        
        this.usuarioService.updateEmployee(this.user.id, this.user).subscribe({
          next: () =>{
            this.getUsers(); 
            this.closeRegistrarNuevo();
            this.showSuccesUpdate = true;
            this.isEditMode = false;
          },
          error: (err) => console.error('Error al actualizar usuario', err),
        });

      } else {
        // Lógica para registrar nuevo usuario
        this.usuarioService.create(this.user).subscribe({
          next: () => {
            this.getUsers();  // Recargar la lista de usuarios
            this.closeRegistrarNuevo();
            this.showSuccesRegistrer = true; // Cerrar el modal
          },
          error: (err) => console.error('Error al registrar usuario', err),
        });
      }
      this.user = new Usuario(); 
    }

    aceptarRegistro(){
      this.showSuccesRegistrer = false;
    }
    aceptarUpdate(){
      this.showSuccesUpdate = false;
    }
  }
