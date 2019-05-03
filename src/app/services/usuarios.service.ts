import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(
    private http: HttpClient
  ) { }

  getUsuarios() {
    return this.http.get('usuarios').pipe(map((data) => {
      return data['records'];
    }));
  }

  updateUsuarioState(usuarioCod: string) {
    return this.http.delete(`usuarios/${usuarioCod}`).pipe(map((data) => data['record']));
  }

  updateUsuario(usuarioCode: any, data: any) {
    return this.http.put(`usuarios/${usuarioCode}`, data)
      .pipe(map((result: any) => result['record'] ));
  }
}
