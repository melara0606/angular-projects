import { AuthGuardService } from './../services/auth.guard.service';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// reducers
import { usuarioReducers } from '../stores/reducers/usuarios.reducers';

// components
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { dashboardRouting } from './dashboard.routing';

const routes: Routes = [
  {
    path: '',
    children: dashboardRouting,
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    UsuariosComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild( routes ),
    StoreModule.forFeature('usuarios', usuarioReducers)
  ]
})
export class DashboardModule { }
