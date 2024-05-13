import { Subscription } from 'rxjs';
import gameConfig from 'src/assets/game-config.json';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AxisModel } from './models';
import { ResetError } from './store/actions';
import { selectError } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  error: string;
  subscriptions: Subscription[] = [];

  axisDimensions: AxisModel = gameConfig?.axisDimensions;

  constructor(private store: Store) {}

  ngOnInit() {
    const sub = this.store.pipe(select(selectError)).subscribe((error) => {
      this.error = error;
      if (this.error) {
        this.handleError();
      }
    });
    this.subscriptions.push(sub);
  }

  handleError() {
    alert(this.error);
    this.store.dispatch(new ResetError());
  }

  ngOnDestroy() {
    this.subscriptions?.forEach((sub) => sub?.unsubscribe());
  }
}
