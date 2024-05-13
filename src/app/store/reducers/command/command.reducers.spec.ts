import { AxisModel, CommandEnum, FacingEnum } from '../../../models';
import { LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand } from '../../actions';
import { commandReducer, CommandState } from './command.reducers';

describe('Command Reducer', () => {
  const initialState: CommandState = {
    history: [],
    axis: { x: -1, y: -1 },
    facing: null,
    report: false,
  };

  const testAxis: AxisModel = { x: 2, y: 3 };
  const testFacing: FacingEnum = FacingEnum.NORTH;

  it('should return the initial state', () => {
    const action = {} as any;
    const state = commandReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle PLACE_Command action', () => {
    const action = new PlaceCommand({ axis: testAxis, facing: testFacing });
    const state = commandReducer(initialState, action);
    expect(state.axis).toEqual(testAxis);
    expect(state.facing).toEqual(testFacing);
    expect(state.history.length).toEqual(1);
    expect(state.history[0].command).toEqual(CommandEnum.PLACE);
  });

  it('should handle MOVE_Command action', () => {
    const action = new MoveCommand({ x: 1, y: 1 });
    const state = commandReducer(initialState, action);
    expect(state.axis).toEqual({ x: 1, y: 1 });
    expect(state.history.length).toEqual(1);
    expect(state.history[0].command).toEqual(CommandEnum.MOVE);
  });

  it('should handle LEFT_Command action', () => {
    const action = new LeftCommand(FacingEnum.NORTH);
    const state = commandReducer(initialState, action);
    expect(state.facing).toEqual(FacingEnum.NORTH);
    expect(state.history.length).toEqual(1);
    expect(state.history[0].command).toEqual(CommandEnum.LEFT);
  });

  it('should handle RIGHT_Command action', () => {
    const action = new RightCommand(FacingEnum.NORTH);
    const state = commandReducer(initialState, action);
    expect(state.facing).toEqual(FacingEnum.NORTH);
    expect(state.history.length).toEqual(1);
    expect(state.history[0].command).toEqual(CommandEnum.RIGHT);
  });

  it('should handle REPORT_Command action', () => {
    const action = new ReportCommand(true);
    const state = commandReducer(initialState, action);
    expect(state.report).toEqual(true);
  });
});
