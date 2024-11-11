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
    this.UsuarioService.create(this.Usuario)
      .subscribe({
        next:(data)=>{
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          this.errorMessage = 'Error al registrar';
        }
      }
        
      );
    this.Usuario = new Usuario();
   
  }

  onSubmit() {
    this.submitted = true;
    this.save();

  }
}
