import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get('horarios').pipe(map(records => records['records']));
  }

  add(data: any) {
    return this.http.post('horarios', {...data}).pipe(map(records => records['record']));
  }

  edit(id: string, data: any) {
    return this.http.put(`horarios/${ id }`, data).pipe(map(records => records['record']));
  }
}
