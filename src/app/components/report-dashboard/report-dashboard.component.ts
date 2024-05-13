import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ReportCommand } from '../../store/actions';
import { CommandState } from '../../store/reducers';
import { selectCommand } from '../../store/selectors';

@Component({
  selector: 'report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss'],
})
export class ReportDashboardComponent implements OnInit, OnDestroy {
  command: CommandState;
  subscriptions: Subscription[] = [];

  constructor(readonly store: Store) {}

  ngOnInit() {
    const sub = this.store.pipe(select(selectCommand)).subscribe((command) => {
      this.command = command;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions?.forEach((sub) => sub?.unsubscribe());
  }

  onCloseReport() {
    this.store.dispatch(new ReportCommand(false));
  }
}
