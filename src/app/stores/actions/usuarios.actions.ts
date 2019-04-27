import { Usuario } from './../../models/Usuario';
import { Action } from '@ngrx/store';

export enum UsuariosTypesActions {
  CargarUsuario = '[Usuarios] Load usuarios',
  GetItems = '[Usuarios] Get items usuarios',
  GetFails = '[Usuarios] Fails usuarios',
  DeleteStatus = '[Usuarios] Status usuarios',
  UpdateUser = '[Usuario] Update Informaction User',
}

export class UsuariosLoad implements Action {
  readonly type = UsuariosTypesActions.CargarUsuario;
}

export class UsuariosFails implements Action {
  readonly type = UsuariosTypesActions.GetFails;
  constructor(public error: any) { }
}

export class UsuariosGetItems implements Action {
  readonly type = UsuariosTypesActions.GetItems;
  constructor(public payload: Usuario[]) { }
}

export class UsuarioDeleteStatus implements Action {
  readonly type = UsuariosTypesActions.DeleteStatus;
  constructor(public usuarioCod: string) { }
}

export class UsuarioUpdateUser implements Action {
  readonly type = UsuariosTypesActions.UpdateUser;
  constructor(public data: any[], public userCod: string) { }
}

export type usuariosActionsUnion = UsuariosGetItems | UsuariosLoad | UsuariosFails | UsuarioDeleteStatus | UsuarioUpdateUser;
