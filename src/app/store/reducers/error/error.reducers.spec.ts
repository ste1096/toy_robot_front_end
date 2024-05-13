import { ResetError, SaveError } from '../../actions';
import { errorReducer, ErrorState } from './error.reducers';

describe('Error Reducer', () => {
  const initialState: ErrorState = '';

  it('should return the initial state', () => {
    const action = {} as any;
    const state = errorReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should handle NEW_ERROR action', () => {
    const errorMessage = 'Test error message';
    const action = new SaveError(errorMessage);
    const state = errorReducer(initialState, action);
    expect(state).toEqual(errorMessage);
  });

  it('should handle RESET_ERROR action', () => {
    const action = new ResetError();
    const state = errorReducer('Some error', action);
    expect(state).toEqual(initialState);
  });

  it('should return current state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = errorReducer('Some error', action as any);
    expect(state).toEqual('Some error');
  });
});
