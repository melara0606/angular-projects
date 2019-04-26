import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Http Module
import { HttpClientModule } from '@angular/common/http';

// components
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoutComponent } from './logout/logout.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    LogoutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    LoadingComponent,
    NavbarComponent,
    SidebarComponent,
    LogoutComponent,
    FooterComponent,
    RouterModule
  ]
})
export class SharedModule { }
