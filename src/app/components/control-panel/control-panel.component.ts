import { Subscription } from 'rxjs';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AxisModel, FacingEnum } from '../../models';
import { LeftCommand, MoveCommand, ReportCommand, RightCommand, SaveError } from '../../store/actions';
import { CommandState } from '../../store/reducers';
import { selectCommand } from '../../store/selectors';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  @Input() axisDimensions: AxisModel;

  command: CommandState;
  isReady = false;
  subscriptions: Subscription[] = [];

  constructor(readonly store: Store) {}

  ngOnInit() {
    const sub = this.store.pipe(select(selectCommand)).subscribe((command) => {
      this.command = command;
      this.isReady = !!command?.history.find((h) => h.command === 'PLACE');
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions?.forEach((sub) => sub?.unsubscribe());
  }

  onMove() {
    try {
      if (this.isReady) {
        const newAxis = this.calculateAxis(this.command?.axis, this.command?.facing);
        this.store.dispatch(new MoveCommand(newAxis));
      }
    } catch (e) {
      this.store.dispatch(new SaveError(e.message));
    }
  }

  onLeft() {
    if (this.isReady) {
      const updatedFacing = this.calculateFacing(this.command?.facing, 'left');
      this.store.dispatch(new LeftCommand(updatedFacing));
    }
  }

  onRight() {
    if (this.isReady) {
      const updatedFacing = this.calculateFacing(this.command?.facing, 'right');
      this.store.dispatch(new RightCommand(updatedFacing));
    }
  }

  onReport() {
    if (this.isReady) {
      this.store.dispatch(new ReportCommand(true));
    }
  }

  protected calculateAxis(axis: AxisModel, facing: FacingEnum) {
    let newAxis: AxisModel;
    switch (facing) {
      case FacingEnum.NORTH: {
        newAxis = { x: axis.x, y: axis.y + 1 };
        break;
      }
      case FacingEnum.EAST: {
        newAxis = { x: axis.x + 1, y: axis.y };
        break;
      }
      case FacingEnum.SOUTH: {
        newAxis = { x: axis.x, y: axis.y - 1 };
        break;
      }
      case FacingEnum.WEST: {
        newAxis = { x: axis.x - 1, y: axis.y };
        break;
      }
    }
    if (!(newAxis.x >= 0 && newAxis.x < this.axisDimensions.x && newAxis.y >= 0 && newAxis.y < this.axisDimensions.y)) {
      throw new Error('Seriously? Bad move! You trying to get me suicided?');
    }
    return newAxis;
  }

  protected calculateFacing(source: FacingEnum, command: 'left' | 'right') {
    const enumLength = Object.keys(FacingEnum).length / 2;
    switch (command) {
      case 'left': {
        return (source - 1 + enumLength) % enumLength;
      }
      case 'right': {
        return (source + 1) % enumLength;
      }
    }
    return source;
  }
}
