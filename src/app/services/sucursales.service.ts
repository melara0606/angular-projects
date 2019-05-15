import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Sucursal } from './../models/Sucursal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  get() {
    return this.httpClient.get('sucursales').pipe(map(data => data['records']));
  }

  darbaja(id: number) {
    return this.httpClient.delete(`sucursales/${id}`).pipe(map(data => data['record']));
  }

  add(sucursal: Sucursal) {
    return this.httpClient.post('sucursales', { ...sucursal }).pipe(map(data => data['record']));
  }

  edit(sucursal: Sucursal) {
    return this.httpClient.put(`sucursales/${sucursal.sucursal_cod}`, { ...sucursal }).pipe(map(data => data['record']));
  }
}
