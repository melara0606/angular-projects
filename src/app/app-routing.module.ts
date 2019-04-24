import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth.guard.service';
import { LoginComponent } from './shared/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './shared/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
