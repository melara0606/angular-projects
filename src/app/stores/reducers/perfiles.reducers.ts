import { Perfil } from 'src/app/models/Perfil';
import { AppState } from '../../app.reducers';
import * as perfilesAction from 'src/app/stores/actions/perfiles.actions';

export interface PerfilState {
  items: Perfil[];
  item: Perfil;
  loading: boolean;
}

export interface AppState extends AppState {
  perfiles: PerfilState[];
}

export const InitialState: PerfilState = {
  items: [],
  item: null,
  loading: false,
};

export function perfilesReducers(
  state = InitialState, action: perfilesAction.PerfilesActionsUnion
): PerfilState {

  switch (action.type) {
    case perfilesAction.PerfilesTypesActions.CargarPerfiles: {
      return {
        ...state,
        items: [],
        loading: true
      };
    }
    case perfilesAction.PerfilesTypesActions.GetItems: {
      return {
        ...state,
        loading: false,
        items: [...action.payload]
      };
    }

    case perfilesAction.PerfilesTypesActions.GetFails: {
      return {
        ...state,
        items: [],
        loading: false
      };
    }

    case perfilesAction.PerfilesTypesActions.Add:
    case perfilesAction.PerfilesTypesActions.UpdatePerfil:
    case perfilesAction.PerfilesTypesActions.GetItem:
    case perfilesAction.PerfilesTypesActions.DeleteItem:
    case perfilesAction.PerfilesTypesActions.AddRecurso:
    case perfilesAction.PerfilesTypesActions.UpdateRecurso: {
      return {
        ...state,
        loading: true
      };
    }

    case perfilesAction.PerfilesTypesActions.AddSucess: {
      return {
        ...state,
        loading: false,
        items: [
          ...state.items,
          action.payload
        ]
      };
    }

    case perfilesAction.PerfilesTypesActions.UpdatePerfilSucess: {
      const $filter = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });

      return {
        ...state,
        loading: false,
        items: [...$filter]
      };
    }

    // Perfil
    case perfilesAction.PerfilesTypesActions.GetItemSucces: {
      return {
        ...state,
        loading: false,
        item: { ...action.payload }
      };
    }

    case perfilesAction.PerfilesTypesActions.DeleteItemSucess: {
      const { recurso } = action.payload;
      const $filter = state.item.recursos.filter((item) => {
        return item.recurso_id.toString() !== recurso;
      });

      return {
        ...state,
        loading: false,
        item: {
          ...state.item,
          recursos: [...$filter]
        }
      };
    }

    // Recurso
    case perfilesAction.PerfilesTypesActions.AddRecursoSuccess: {
      return {
        ...state,
        loading: false,
        item: {
          ...state.item,
          recursos: state.item.recursos.concat(action.payload)
        },
      };
    }

    case perfilesAction.PerfilesTypesActions.UpdateRecursoSuccess: {
      return {
        ...state,
        loading: false,
        item: {
          ...state.item,
          recursos: state.item.recursos.map((element) => {
            if (element.recurso_id === action.payload.recurso_id) {
              return action.payload;
            }
            return element;
          })
        }
      };
    }

    default:
      return state;
  }
}
