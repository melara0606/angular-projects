import { Routes } from '@angular/router';

// Perfiles y usuarios
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

// Personales
import { personalesRouting } from './personales/personales.routing';
import { PersonalesComponent } from './personales/personales.component';

export const dashboardRouting: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'perfiles', component: PerfilesComponent },
  { path: ':id/perfil', component: PerfilComponent },

  // Routes for personales
  {
    path: 'personales',
    component: PersonalesComponent,
    children: personalesRouting
  },
  { path: '**', redirectTo: 'perfiles', pathMatch: 'full' },
];
