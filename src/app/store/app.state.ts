import { ActionReducerMap } from '@ngrx/store';

import { commandReducer, CommandState, errorReducer, ErrorState } from './reducers';

export interface AppState {
  command: CommandState;
  error: ErrorState;
}

export const appReducers: ActionReducerMap<AppState> = {
  command: commandReducer,
  error: errorReducer,
};
