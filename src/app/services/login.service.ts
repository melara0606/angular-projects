import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/Usuario';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `http://localhost:8080/v1/auth/login`;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  login(usuario: Usuario) {
    return this.http.post(this.url, {
      ...usuario
    });
  }

  changePassword(data: any) {
    return this.http.post(`${ this.url }/change-password`, {
      ...data
    });
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.getTokenLocalStorage());
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

  getRoutesApplication() {
    const decoded = this.jwtHelper.decodeToken(this.getTokenLocalStorage());
    return decoded.data[1];
  }

  getUserData() {
    const { usuario, personal } = this.jwtHelper.decodeToken(this.getTokenLocalStorage()).data[0];
    return {
      nombres: personal.nombres,
      apellidos: personal.apellidos,
      email: usuario.email,
      photo: usuario.photo
    };
  }

  getRouteScope($scope = '') {
    const data = this.jwtHelper.decodeToken(this.getTokenLocalStorage());
    return data.scope.filter((item) => {
      return item.substring(0, item.indexOf('.')) === $scope;
    });
  }
}
