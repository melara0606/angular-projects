import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

// Actions
import * as usuarioActions from '../actions/usuarios.actions';

// servicio
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/models/Usuario';

@Injectable()
export class UsuariosEffects {
  constructor(
    private $action: Actions,
    private usuariosService: UsuariosService
  ) { }

  @Effect()
  cargarUsuarios$ = this.$action.pipe(
    ofType(usuarioActions.UsuariosTypesActions.CargarUsuario),
    switchMap(() =>
      this.usuariosService.getUsuarios().pipe(
        map((users: Usuario[]) => new usuarioActions.UsuariosGetItems(users)),
        catchError((error) => of(new usuarioActions.UsuariosFails()))
      )
    )
  );
}
