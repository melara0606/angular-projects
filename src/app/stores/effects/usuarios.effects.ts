import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

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
        catchError((error) => of(new usuarioActions.UsuariosFails(error)))
      )
    )
  );

  @Effect({ dispatch: true })
  statusUsuario$ = this.$action.pipe(
    ofType(usuarioActions.UsuariosTypesActions.DeleteStatus),
    mergeMap((user) => {
      return this.usuariosService.updateUsuarioState(user['usuarioCod']).pipe(
        map((data) => new usuarioActions.UsuarioUpdateUser(data, user['usuarioCod'])),
        catchError((error) => of(new usuarioActions.UsuariosFails(error)))
      );
    })
  );
}
