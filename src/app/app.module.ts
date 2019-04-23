import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulo de JwtModule
import { JwtModule } from '@auth0/angular-jwt';

// Modulos personalizados
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => window.localStorage.getItem('token'),
        whitelistedDomains: [environment.server]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
