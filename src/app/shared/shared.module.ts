import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Http Module
import { HttpClientModule } from '@angular/common/http';

// components
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
