import { Routes } from '@angular/router';

// components
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { PersonalesComponent } from './personales/personales.component';

export const dashboardRouting: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'perfiles', component: PerfilesComponent },
  {
    path: ':id/perfil',
    component: PerfilComponent
  },
  {path: 'personales', component: PersonalesComponent},
  { path: '**', redirectTo: 'perfiles', pathMatch: 'full' },
];
