import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:8080/v1/auth/login';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  login(usuario: Usuario) {
    return this.http.post(this.url, {
      ...usuario
    });
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired( this.getTokenLocalStorage() );
  }

  isViewTokenDecode() {
    return this.jwtHelper.decodeToken( this.getTokenLocalStorage() );
  }

  setTokenLocalStorage(token: string, TYPE: string = 'SET') {
    if (TYPE === 'SET') {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  }

  getTokenLocalStorage() {
    return (window.localStorage.getItem('token'));
  }
}
