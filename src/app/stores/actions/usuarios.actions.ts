import { Usuario } from './../../models/Usuario';
import { Action } from '@ngrx/store';

export enum UsuariosTypesActions {
  CargarUsuario = '[Usuarios] Load usuarios',
  GetItems = '[Usuarios] Get items usuarios',
  GetFails = '[Usuarios] Fails usuarios',
}

export class UsuariosLoad implements Action {
  readonly type = UsuariosTypesActions.CargarUsuario;
}

export class UsuariosFails implements Action {
  readonly type = UsuariosTypesActions.GetFails;
}

export class UsuariosGetItems implements Action {
  readonly type = UsuariosTypesActions.GetItems;
  constructor(public payload: Usuario[]) { }
}

export type usuariosActionsUnion = UsuariosGetItems | UsuariosLoad | UsuariosFails;
