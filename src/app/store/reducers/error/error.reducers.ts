import { ErrorActions, ErrorActionTypes } from '../../actions';

// State for this feature (Interview)
export type ErrorState = string;

export const initialStateError = '';

export function errorReducer(state = initialStateError, action: ErrorActions): ErrorState {
  switch (action.type) {
    case ErrorActionTypes.NEW_ERROR:
      return action.payload;
    case ErrorActionTypes.RESET_ERROR:
      return initialStateError;
    default:
      return state;
  }
}
