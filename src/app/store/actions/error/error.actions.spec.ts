import { ErrorActionTypes, ResetError, SaveError } from './error.actions';

describe('Error Actions', () => {
  const errorMessage = 'Test error message';

  it('should create a SaveError action', () => {
    const action = new SaveError(errorMessage);
    expect(action.type).toEqual(ErrorActionTypes.NEW_ERROR);
    expect(action.payload).toEqual(errorMessage);
  });

  it('should create a ResetError action', () => {
    const action = new ResetError();
    expect(action.type).toEqual(ErrorActionTypes.RESET_ERROR);
  });
});
