import { AppState } from '../../app.reducers';
import { Usuario } from './../../models/Usuario';
import * as usuarioAction from '../actions/usuarios.actions';

export interface UsuarioState {
  items: Usuario[];
  loading: boolean;
}

export interface AppState extends AppState {
  usuarios: UsuarioState[];
}

export const InitialState: UsuarioState = {
  items: [],
  loading: false,
};

export function usuarioReducers(
  state = InitialState, action: usuarioAction.usuariosActionsUnion
): UsuarioState {

  switch (action.type) {
    case usuarioAction.UsuariosTypesActions.CargarUsuario : {
      return {
        items: [],
        loading: true
      };
    }
    case usuarioAction.UsuariosTypesActions.GetItems: {
      return {
        items: [...action.payload],
        loading: false
      };
    }

    case usuarioAction.UsuariosTypesActions.GetFails: {
      return {
        items: [],
        loading: false
      };
    }

    default:
      return state;
  }
}
