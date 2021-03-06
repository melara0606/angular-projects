import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

// services
import { AppState } from 'src/app/app.reducers';
import { LoginService } from 'src/app/services/login.service';
import { UsuariosLoad, UsuarioDeleteStatus, UsuarioUpdateType } from '../../stores/actions/usuarios.actions';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  public routes: any[];
  public usuarios: any[];
  public perfiles: any[];
  public loading: boolean;
  public closeResult: string;

  constructor(
    public store: Store<AppState>,
    public loginService: LoginService,
    private usuarioService: UsuariosService
  ) {
    this.store.select('usuarios').subscribe(data => {
      this.usuarios = data.items;
      this.loading = data.loading;
      this.perfiles = data.perfiles;
    });

    this.routes = this.loginService.getRouteScope('usuario');
  }

  ngOnInit() {
    this.store.dispatch(new UsuariosLoad());
  }

  darBajaOrActivar(item: any): any {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas dando ${item.estado ? 'desactivar' : 'activar'} a un usuario.`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new UsuarioDeleteStatus(item.usuario_cod));
      }
    });
  }

  async editPerfil(item: any) {
    const map = new Map();
    this.perfiles.filter((element) => {
      return element.id !== item.perfilId;
    }).forEach((index) => {
      map.set(index.id, index.nombre);
    });

    await Swal.fire({
      title: `Cambiar el perfil`,
      input: 'select',
      inputOptions: map,
      inputPlaceholder: '[Perfiles]',
      showCancelButton: true,
      inputValidator: (value) => this.validators(value, '')
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new UsuarioUpdateType({
          TYPE: 'PERFIL',
          perfil_id: result.value
        }, item.usuario_cod));
      }
    });
  }

  // TODO: Poner un placeholder para que se vea mas bonita
  async editPassword(item: any) {
    await Swal.fire({
      input: 'password',
      showCancelButton: true,
      title: `Cambio de contraseña`,
      inputPlaceholder: 'Nueva contraseña',
      inputValidator: (value): Promise<string> => {
        return new Promise((resolve) => {
          if (value === '') {
            resolve('Debes digitar una contraseña entre 8 y 16 caracteres!');
          } else if (value.length < 8 || value.length > 16) {
            resolve('Debes digitar una contraseña entre 8 y 16 caracteres!');
          } else {
            resolve();
          }
        });
      }
    }).then((result) => {
      if (result.value) {
        this.usuarioService.updateUsuario(item.usuario_cod, {
          password: result.value.trim(),
          TYPE: 'PASSWORD'
        }).subscribe(record => {
          Swal.fire({
            title: 'Exito!',
            text: `Hemos cambiado con exito la contraseña del usuario ${ record.email }`,
            type: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Entrar'
          });
        });
      }
    });
  }

  private validators(value: string, type: string): Promise<string> {
    return new Promise((resolve) => {
      if (value === type) {
        resolve('Debes seleccionar un valor!');
      } else {
        resolve();
      }
    });
  }
}
