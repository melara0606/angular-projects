import { Routes } from '@angular/router';

// Perfiles y usuarios
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NivelesComponent } from './niveles/niveles.component';

// Horarios
import { HorariosComponent } from './horarios/horarios.component';

// Personales
import { PersonalesComponent } from './personales/personales.component';
import { personalesRouting } from './personales/personales.routing';

// Sucursales
import { sucursalesRouting } from './sucursales/sucursales.routing';
import { SucursalesComponent } from './sucursales/sucursales.component';

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
  {
    path: 'niveles',
    component: NivelesComponent
  },
  {
    path: 'horarios',
    component: HorariosComponent
  },
  {
    path: 'sucursales',
    component: SucursalesComponent,
    children: sucursalesRouting
  },
  { path: '**', redirectTo: 'perfiles', pathMatch: 'full' },
];
