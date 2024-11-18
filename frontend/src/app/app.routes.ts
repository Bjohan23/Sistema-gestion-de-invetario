import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrerComponent } from './authentication/registrer/registrer.component';
import { authGuard } from './guards/auth.guard';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'gestion-usuario', component: UsuariosComponent, canActivate: [authGuard]},
    { path: 'sidebar', component: SidebarComponent, canActivate: [authGuard] },
    { path: 'categorias', component: CategoriasComponent, canActivate: [authGuard]},
    { path: 'productos', component: ProductosComponent, canActivate: [authGuard]},
    { path: 'register', component: RegistrerComponent },
    { path: 'movimiento', component: MovimientosComponent, canActivate:[authGuard]},
    { path: 'home', component: DashboardComponent, canActivate: [authGuard] },  // Ruta protegida
    { path: 'auditoria', component: AuditoriaComponent, canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
