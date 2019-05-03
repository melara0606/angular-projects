import { AppState } from '../../app.reducers';
import { Usuario } from './../../models/Usuario';
import { Perfil } from './../../models/Perfil';
import * as usuarioAction from '../actions/usuarios.actions';

export interface UsuarioState {
  items: Usuario[];
  loading: boolean;
  perfiles: Perfil[];
}

export interface AppState extends AppState {
  usuarios: UsuarioState[];
}

export const InitialState: UsuarioState = {
  items: [],
  perfiles: [],
  loading: false,
};

export function usuarioReducers(
  state = InitialState, action: usuarioAction.usuariosActionsUnion
): UsuarioState {

  switch (action.type) {
    case usuarioAction.UsuariosTypesActions.CargarUsuario: {
      return {
        items: [],
        perfiles: [],
        loading: true
      };
    }
    case usuarioAction.UsuariosTypesActions.GetItems: {
      let $filter: any[] = [];
      let $perfiles = null;
      const count = action.payload.length;

      if (action.payload) {
        action.payload.forEach((item, index) => {
          if (index === (count - 1)) {
            $perfiles = item;
          } else {
            $filter.push(item);
          }
        });
      }
      return {
        loading: false,
        items: [...$filter],
        perfiles: [...$perfiles]
      };
    }

    case usuarioAction.UsuariosTypesActions.GetFails: {
      console.log(action.error);
      return {
        items: [],
        perfiles: [],
        loading: false
      };
    }

    case usuarioAction.UsuariosTypesActions.DeleteStatus: {
      return {
        ...state,
        loading: true
      };
    }

    case usuarioAction.UsuariosTypesActions.UpdateUser: {
      const filter: any[] = state.items.map((item) => {
        if (item['usuario_cod'] === action.userCod) {
          return action.data;
        }
        return item;
      });
      return {
        ...state,
        loading: false,
        items: filter
      };
    }

    case usuarioAction.UsuariosTypesActions.UpdateUserType: {
      return {
        ...state,
        loading: true
      };
    }

    default:
      return state;
  }
}
