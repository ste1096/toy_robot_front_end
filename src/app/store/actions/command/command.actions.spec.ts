import { AxisModel, FacingEnum } from '../../../models';
import {
  CommandActionTypes,
  LeftCommand,
  MoveCommand,
  PlaceCommand,
  ReportCommand,
  RightCommand,
} from './command.actions';

describe('Command Actions', () => {
  const axis: AxisModel = { x: 1, y: 1 };
  const facing: FacingEnum = FacingEnum.NORTH;

  it('should create a PlaceCommand action', () => {
    const action = new PlaceCommand({ axis, facing });
    expect(action.type).toEqual(CommandActionTypes.PLACE_Command);
    expect(action.payload.axis).toEqual(axis);
    expect(action.payload.facing).toEqual(facing);
  });

  it('should create a MoveCommand action', () => {
    const action = new MoveCommand(axis);
    expect(action.type).toEqual(CommandActionTypes.MOVE_Command);
    expect(action.payload).toEqual(axis);
  });

  it('should create a LeftCommand action', () => {
    const action = new LeftCommand(facing);
    expect(action.type).toEqual(CommandActionTypes.LEFT_Command);
    expect(action.payload).toEqual(facing);
  });

  it('should create a RightCommand action', () => {
    const action = new RightCommand(facing);
    expect(action.type).toEqual(CommandActionTypes.RIGHT_Command);
    expect(action.payload).toEqual(facing);
  });

  it('should create a ReportCommand action', () => {
    const action = new ReportCommand(true);
    expect(action.type).toEqual(CommandActionTypes.REPORT_Command);
    expect(action.payload).toEqual(true);
  });
});
