import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrerComponent } from './authentication/registrer/registrer.component';
import { authGuard } from './guards/auth.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sidebar', component: SidebarComponent, canActivate: [authGuard] },
    { path: 'register', component: RegistrerComponent },
    { path: 'home', component: DashboardComponent, canActivate: [authGuard] },  // Ruta protegida
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
