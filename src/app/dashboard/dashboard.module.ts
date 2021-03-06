import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { PersonalAddComponent } from './personales/personal-add/personal-add.component';
import { PersonalListComponent } from './personales/personal-list/personal-list.component';
import { NivelesComponent } from './niveles/niveles.component';
import { HorariosComponent } from './horarios/horarios.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { EmptyComponent } from './empty/empty.component';

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
    PersonalesComponent,
    PersonalAddComponent,
    PersonalListComponent,
    NivelesComponent,
    HorariosComponent,
    SucursalesComponent,
    SucursalesListComponent,
    EmptyComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    SharedModule,
    TextMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild( routes ),
    StoreModule.forFeature('usuarios', usuarioReducers),
    StoreModule.forFeature('perfiles', perfilesReducers),
  ]
})
export class DashboardModule { }
