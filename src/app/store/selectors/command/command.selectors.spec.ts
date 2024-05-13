import { AppState } from '../../app.state';
import { CommandState, initialStateCommand } from '../../reducers';
import { selectCommand } from './command.selectors';

describe('Store > Command > Selectors', () => {
  //CommandState
  const createCommandState = (): CommandState => initialStateCommand;

  //AppState
  const createState = (): AppState => ({
    command: createCommandState(),
    error: '',
  });

  it('should selectCommand', () => {
    const state = createState();
    const expected = selectCommand.projector(state.command);
    expect(expected).toEqual(state.command);
  });
});
