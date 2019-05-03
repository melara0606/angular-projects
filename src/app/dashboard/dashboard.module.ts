import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// reducers
import { usuarioReducers } from '../stores/reducers/usuarios.reducers';
import { perfilesReducers } from '../stores/reducers/perfiles.reducers';

// components
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { dashboardRouting } from './dashboard.routing';
// Perfiles
import { PerfilesPipe } from './perfiles.pipe';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { PerfilComponent } from './perfiles/perfil/perfil.component';
import { ListUsuarioComponent } from './perfiles/perfil/list-usuario/list-usuario.component';
import { ListRecursosComponent } from './perfiles/perfil/list-recursos/list-recursos.component';
import { PersonalesComponent } from './personales/personales.component';

const routes: Routes = [
  {
    path: '',
    children: dashboardRouting,
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    PerfilesPipe,
    PerfilComponent,
    PerfilesComponent,
    UsuariosComponent,
    DashboardComponent,
    ListUsuarioComponent,
    ListRecursosComponent,
    PersonalesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild( routes ),
    StoreModule.forFeature('usuarios', usuarioReducers),
    StoreModule.forFeature('perfiles', perfilesReducers),
  ]
})
export class DashboardModule { }
