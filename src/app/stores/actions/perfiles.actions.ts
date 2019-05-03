import { Action } from '@ngrx/store';
import { Perfil } from 'src/app/models/Perfil';

export enum PerfilesTypesActions {
  GetFails = '[Perfiles] Fails perfiles',

  GetItems = '[Perfiles] Get items perfiles',
  CargarPerfiles = '[Perfiles] Load perfiles',

  Add = '[Perfiles] Add new perfil',
  AddSucess = '[Perfiles] Add new perfil success',

  UpdatePerfil = '[Perfiles] Update Informaction Perfil',
  UpdatePerfilSucess = '[Perfiles] Update Informaction Success',

  // Perfil
  GetItem       = '[Perfil] Get item perfil',
  GetItemSucces = '[Perfil] Get item perfil success',
  DeleteItem    = '[Perfil] Eliminar item recurso',
  DeleteItemSucess = '[Perfil] Eliminar item recurso success',

  // Recursos
  AddRecurso            = '[Recurso] Add recurso the perfil',
  AddRecursoSuccess     = '[Recurso] Add recurso the perfil success',
  UpdateRecurso         = '[Recurso] Update recurso the perfil',
  UpdateRecursoSuccess  = '[Recurso] Update recurso the perfil success',
}

export class PerfilesLoad implements Action {
  readonly type = PerfilesTypesActions.CargarPerfiles;
}

export class PerfilesFails implements Action {
  readonly type = PerfilesTypesActions.GetFails;
  constructor(public error: any) { }
}

export class PerfilesGetItems implements Action {
  readonly type = PerfilesTypesActions.GetItems;
  constructor(public payload: Perfil[]) { }
}

export class PerfilesAddItem implements Action {
  readonly type = PerfilesTypesActions.Add;
  constructor(public nombre: string) { }
}

export class PerfilesAddPush implements Action {
  readonly type = PerfilesTypesActions.AddSucess;
  constructor(public payload: any) { }
}

export class PerfilesEditItem implements Action {
  readonly type = PerfilesTypesActions.UpdatePerfil;
  constructor(public id: number, public nombre: string) { }
}

export class PerfilesEditPop implements Action {
  readonly type = PerfilesTypesActions.UpdatePerfilSucess;
  constructor(public id: number, public payload: any) { }
}

// Perfil Actions
export class PerfilItem implements Action {
  readonly type = PerfilesTypesActions.GetItem;
  constructor(public id: number) {}
}

export class PerfilDelete implements Action {
  readonly type = PerfilesTypesActions.DeleteItem;
  constructor(public payload: any) {}
}

export class PerfilItemSucess implements Action {
  readonly type = PerfilesTypesActions.GetItemSucces;
  constructor(public payload: any) {}
}

export class PerfilDeleteSucess implements Action {
  readonly type = PerfilesTypesActions.DeleteItemSucess;
  constructor(public payload: any) {}
}

// Recursos
export class PerfilRecursoAdd implements Action {
  readonly type = PerfilesTypesActions.AddRecurso;
  constructor(public payload: any) {}
}

export class PerfilRecursoAddSucess implements Action {
  readonly type = PerfilesTypesActions.AddRecursoSuccess;
  constructor(public payload: any) {}
}

export class PerfilRecursoUpdate implements Action {
  readonly type = PerfilesTypesActions.UpdateRecurso;
  constructor(public payload: any) {}
}

export class PerfilRecursoUpdateSucess implements Action {
  readonly type = PerfilesTypesActions.UpdateRecursoSuccess;
  constructor(public payload: any) {}
}

// tslint:disable-next-line: max-line-length
export type PerfilesActionsUnion = PerfilesGetItems | PerfilesLoad
  | PerfilesFails | PerfilesAddItem | PerfilesAddPush
  | PerfilesEditItem | PerfilesEditPop | PerfilItem | PerfilItemSucess
  | PerfilDelete | PerfilDeleteSucess | PerfilRecursoAdd | PerfilRecursoAddSucess
  | PerfilRecursoUpdate | PerfilRecursoUpdateSucess;
