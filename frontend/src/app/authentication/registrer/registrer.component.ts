import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
@Component({
  selector: 'app-registrer',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './registrer.component.html',
  styleUrl: './registrer.component.css'
})
export class RegistrerComponent {
  errorMessage: string = '';
  Usuario: Usuario = new Usuario();
  submitted = false;
  showModal: boolean = false;
  constructor( private UsuarioService: UsuarioService, private router: Router) {}
  newEmployee(): void {
    this.submitted = false;
    this.Usuario = new Usuario();
  }
  goToRegister() {
    this.router.navigate(['/login']);  // Corregí la ruta a '/register'
  }
 ngOnInit() {
  }  
  
  save() {
    if (!this.Usuario.username || !this.Usuario.password || !this.Usuario.rol) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.UsuarioService.create(this.Usuario).subscribe({
      next: (data) => {
        this.showModal = true;  // Muestra el modal
        setTimeout(() => {
          this.router.navigate(['/login']); // Cambia la ruta después de 10 segundos
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al registrar';
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.save();

  }
}
