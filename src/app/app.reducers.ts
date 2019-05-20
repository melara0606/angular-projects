import { ActionReducerMap } from '@ngrx/store';
import { LessonsState } from './store-app/app.store';
import { createReducers } from './store-app/app.reducers';

export interface AppState {
  items: LessonsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  items: createReducers
};
