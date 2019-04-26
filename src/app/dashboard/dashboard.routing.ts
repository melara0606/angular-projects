import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const dashboardRouting: Routes = [
  { path: '', component: UsuariosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
