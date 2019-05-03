import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AppState } from './../../stores/reducers/perfiles.reducers';
import {
  PerfilesLoad, PerfilesAddItem, PerfilesEditItem
} from 'src/app/stores/actions/perfiles.actions';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.css']
})
export class PerfilesComponent implements OnInit {
  public routes: any[];
  public perfiles: any[];
  public loading: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private loginService: LoginService
  ) {
    this.store.select('perfiles').subscribe((data) => {
      this.perfiles = data['items'];
      this.loading = data['loading'];
    });
    this.routes = this.loginService.getRouteScope('perfil');
  }

  ngOnInit() {
    this.store.dispatch(new PerfilesLoad());
  }

  async onCreatePerfil() {
    if (this.routes.includes('perfil.agregar')) {
      await this.openModal('Nuevo perfil')
        .then(result => {
          if (result.value) {
            this.store.dispatch(new PerfilesAddItem(result.value.trim()));
          }
        });
    }
  }

  async editarPerfil(item: any) {
    if (this.routes.includes('perfil.editar')) {
      const nombre = item.nombre.trim();
      await this.openModal(`Editar ${nombre}`, nombre)
        .then(result => {
          if (result.value) {
            this.store.dispatch(new PerfilesEditItem(item.id, result.value.trim()));
          }
        });
    }
  }

  routeGo(item: any) {
    this.router.navigate([item.id, 'perfil']);
  }

  private openModal(title = '', value = '', placeholder = 'Nombre del perfil (max: 25, min: 5)') {
    return Swal.fire({
      input: 'text',
      title: `${title.trim()}`,
      showCancelButton: true,
      inputValidator: this.validator,
      inputValue: `${value.trim()}`,
      inputPlaceholder: placeholder,
    });
  }

  private validator(value): Promise<string> {
    return new Promise((resolve) => {
      if (value === '') {
        resolve('El nombre del perfil es obligatorio');
      } else if (value.length < 8 || value.length > 26) {
        resolve('Debes digitar un nombre entre 5 y 26 caracteres!');
      } else {
        resolve();
      }
    });
  }
}
