import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CargaAcademicaService {
  constructor(
    public http: HttpClient
  ) { }

  getHorario(type: string) {
    return this.http.get(`horarios?type=${type}`).pipe(map(data => data['records']));
  }

  getNivel(type: string = 'INGLES') {
    return this.http.get(`niveles?type=${type}`).pipe(map(data => data['records']));
  }

  getNivelTopics(nivelType: number) {
    return this.http.get(`niveles/${ nivelType }/topics`).pipe(map(data => data['records']));
  }
}
