import { Action } from '@ngrx/store';

import { AxisModel, FacingEnum } from '../../../models';

export enum CommandActionTypes {
  PLACE_Command = '[Command] Place Command',
  MOVE_Command = '[Command] Move Command',
  LEFT_Command = '[Command] Left Command',
  RIGHT_Command = '[Command] Right Command',
  REPORT_Command = '[Command] Report Command',
}

/**
 * Command
 */
export class PlaceCommand implements Action {
  readonly type = CommandActionTypes.PLACE_Command;
  constructor(public payload: { axis: AxisModel; facing: FacingEnum }) {}
}

export class MoveCommand implements Action {
  readonly type = CommandActionTypes.MOVE_Command;
  constructor(public payload: AxisModel) {}
}

export class LeftCommand implements Action {
  readonly type = CommandActionTypes.LEFT_Command;
  constructor(public payload: FacingEnum) {}
}

export class RightCommand implements Action {
  readonly type = CommandActionTypes.RIGHT_Command;
  constructor(public payload: FacingEnum) {}
}

export class ReportCommand implements Action {
  readonly type = CommandActionTypes.REPORT_Command;
  constructor(public payload: boolean) {}
}

export type CommandActions = PlaceCommand | MoveCommand | LeftCommand | RightCommand | ReportCommand;
