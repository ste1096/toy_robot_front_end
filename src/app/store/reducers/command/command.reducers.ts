import { AxisModel, CommandEnum, FacingEnum } from '../../../models';
import { CommandActions, CommandActionTypes } from '../../actions';

export type CommandState = {
  history: { command: CommandEnum; axis?: AxisModel; facing?: FacingEnum }[];
  axis: AxisModel;
  facing: FacingEnum;
  report: boolean;
};

export const initialStateCommand: CommandState = {
  history: [],
  axis: { x: -1, y: -1 },
  facing: null,
  report: false,
};

export function commandReducer(state = initialStateCommand, action: CommandActions): CommandState {
  switch (action?.type) {
    case CommandActionTypes.PLACE_Command:
      return {
        ...initialStateCommand,
        axis: { x: action.payload?.axis?.x, y: action.payload?.axis?.y },
        facing: action.payload?.facing,
        report: state.report,
        history: [
          {
            command: CommandEnum.PLACE,
            axis: { x: action.payload?.axis?.x, y: action.payload?.axis?.y },
            facing: action.payload?.facing,
          },
        ],
      };
    case CommandActionTypes.MOVE_Command:
      return {
        ...state,
        axis: { x: action.payload?.x, y: action.payload?.y },
        history: [...state.history, { command: CommandEnum.MOVE }],
      };
    case CommandActionTypes.LEFT_Command: {
      return { ...state, facing: action.payload, history: [...state.history, { command: CommandEnum.LEFT }] };
    }
    case CommandActionTypes.RIGHT_Command: {
      return { ...state, facing: action.payload, history: [...state.history, { command: CommandEnum.RIGHT }] };
    }
    case CommandActionTypes.REPORT_Command: {
      return { ...state, report: action.payload };
    }
    default:
      return state;
  }
}
