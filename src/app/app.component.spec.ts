import { Subscription } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import {
  ControlPanelComponent,
  GameBoardComponent,
  PlaceDashboardComponent,
  ReportDashboardComponent,
} from './components';
import { RangeSizePipe, ReversePipe } from './pipes';
import { ResetError } from './store/actions';
import { AppState } from './store/app.state';
import { selectCommand, selectError } from './store/selectors';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;

  const initialState: AppState = {
    command: {
      history: [],
      axis: { x: -1, y: -1 },
      facing: null,
      report: false,
    },
    error: 'test error',
  };

  const mockStore = {
    selectors: [
      {
        selector: selectCommand,
        value: initialState.command,
      },
      {
        selector: selectError,
        value: initialState.error,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PlaceDashboardComponent,
        GameBoardComponent,
        ReportDashboardComponent,
        ControlPanelComponent,
        RangeSizePipe,
        ReversePipe,
      ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set error when error is emitted from store', () => {
    expect(component.error).toBe('test error');
  });

  it('should reset error when handleError is called', () => {
    const spy = spyOn(store, 'dispatch').and.callThrough();
    component.handleError();
    expect(spy).toHaveBeenCalledWith(new ResetError());
  });

  it('should unsubscribe from subscriptions on component destroy', () => {
    const unsubscribeSpy = spyOn(Subscription.prototype, 'unsubscribe');
    fixture.destroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
