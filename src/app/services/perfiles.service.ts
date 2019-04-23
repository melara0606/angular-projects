import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  constructor(private http: HttpClient) { }

  getPerfiles() {
    return this.http.get(`perfiles`);
  }
}
