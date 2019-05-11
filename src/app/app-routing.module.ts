import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { Error403Component } from './redirect/error403/error403.component';
import { ResetPasswordComponent } from './shared/reset-password/reset-password.component';

// services
import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset/:id', component: ResetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'error403', component: Error403Component },
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [ AuthGuardService ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
