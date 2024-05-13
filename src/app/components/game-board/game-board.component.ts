import { Subscription } from 'rxjs';

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AxisModel, FacingEnum } from '../../models';
import { CommandState } from '../../store/reducers';
import { selectCommand } from '../../store/selectors';

@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  @ViewChild('gameBoard') gameBoardRef: ElementRef;

  @Input() axisDimensions: AxisModel;

  constructor(readonly store: Store) {}

  facingEmum = FacingEnum;
  command: CommandState;
  isReady = false;
  showReport = false;

  subscriptions: Subscription[] = [];

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
}
