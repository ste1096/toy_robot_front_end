import { AppState } from '../../app.state';
import { ErrorState } from '../../reducers';
import { selectError } from './error.selectors';

describe('Store > Error > Selectors', () => {
  //ErrorState
  const createErrorState = (): ErrorState => 'Error';

  //AppState
  const createState = (): AppState => ({
    command: undefined,
    error: createErrorState(),
  });

  it('should selectError from ErrorState', () => {
    const state = createState();
    const expected = selectError.projector(state.error);
    expect(expected).toEqual(state.error);
  });
});
