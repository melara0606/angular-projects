import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// routes app
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulo de JwtModule
import { JwtModule } from '@auth0/angular-jwt';

// Store and reducers app
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducers';
import { effectsArray } from './stores/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Modulos personalizados
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { SharedModule } from './shared/shared.module';

// enviroment
import { environment } from 'src/environments/environment';
import { Error403Component } from './redirect/error403/error403.component';

// Bootstrap Module
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Material Design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function tokenGetterFunction() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    Error403Component
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetterFunction,
        whitelistedDomains: [environment.server]
      }
    }),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot( effectsArray )
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