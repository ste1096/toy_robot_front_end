import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  NEW_ERROR = '[Error] New error',
  RESET_ERROR = '[Error] Reset error',
}

export class SaveError implements Action {
  readonly type = ErrorActionTypes.NEW_ERROR;

  constructor(public payload: string) {}
}

export class ResetError implements Action {
  readonly type = ErrorActionTypes.RESET_ERROR;
}

export type ErrorActions = SaveError | ResetError;
