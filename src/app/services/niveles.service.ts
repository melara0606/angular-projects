import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NivelesService {
  constructor(
    public httpCliente: HttpClient
  ) { }

  getNiveles() {
    return this.httpCliente.get('niveles').pipe(map(result => result['records']));
  }

  add(item: any) {
    return this.httpCliente.post('niveles', {...item}).pipe(map(records => records['record']));
  }

  edit(id: string, item: any) {
    return this.httpCliente.put(`niveles/${ id }`, { ...item }).pipe(map(records => records['record']));
  }

  editTopics(id, data) {
    return this.httpCliente.put(`niveles/topics/${ id }`, data).pipe(map(records => records['record']));
  }

  addTopics(id, data) {
    return this.httpCliente.post(`niveles/${id}/topics`, data).pipe(map(records => records['record']));
  }
}
