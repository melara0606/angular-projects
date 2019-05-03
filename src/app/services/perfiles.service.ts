import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  constructor(private http: HttpClient) { }

  getPerfiles() {
    return this.http.get(`perfiles`).pipe(
      map((data) => data['records'])
    );
  }

  add(data: any) {
    return this.http.post(`perfiles`, data)
      .pipe(map((result: any) => result['record']));
  }

  edit(id: number, nombre: string) {
    return this.http.put(`perfiles/${id}`, {
      nombre
    }).pipe(map((result: any) => result['record']));
  }

  getById(payload: any) {
    return this.http.get(`perfiles/${payload.id}`)
      .pipe(map((result: any) => result['record']));
  }

  deleteById(recurso: any) {
    const { perfil_id, recurso_id } = recurso.payload;
    return this.http.delete(`perfiles/${perfil_id}/recursos/${recurso_id}`);
  }

  recursosNotIn(perfil: number) {
    return this.http.get(`perfiles/recursos/${perfil}/not`);
  }

  addRecurso(payload: any) {
    payload.consultar = true;
    return this.http.post(`perfiles/${payload.perfil}/recursos`, payload).pipe(
      map((data) => data['record'])
    );
  }

  updateRecurso(payload: any) {
    return this.http.put(`perfiles/${payload.perfil_id}/recursos/${payload.recurso_id}`, payload).pipe(map((data) => data['record']));
  }
}
