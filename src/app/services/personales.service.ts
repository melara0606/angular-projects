import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonalesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get('personales').pipe(
      map((result) => result['records'])
    );
  }

  searchById(dui: string) {
    return this.http.post('personales/verify-dui', { dui }).pipe(map((result) => {
      return result['count'];
    }));
  }

  addPersonal(personalObject: any) {
    return this.http.post('personales', personalObject).pipe(map((result) => result['record'][0] ));
  }

  editPersonal(id: number, personalObject: any) {
    return this.http.put(`personales/${ id }`, personalObject).pipe(map(result => result['record']));
  }

  getById(id: number) {
    return this.http.get(`personales/${id}`).pipe(map(record => record['record']));
  }
}
