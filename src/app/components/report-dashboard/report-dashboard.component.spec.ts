import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FacingPipe } from '../../pipes';
import { ReportCommand } from '../../store/actions';
import { AppState } from '../../store/app.state';
import { selectCommand, selectError } from '../../store/selectors';
import { ReportDashboardComponent } from './report-dashboard.component';

describe('ReportDashboardComponent', () => {
  let component: ReportDashboardComponent;
  let fixture: ComponentFixture<ReportDashboardComponent>;
  let store: MockStore;

  const initialState: AppState = {
    command: { history: [], axis: { x: 0, y: 0 }, facing: 0, report: true },
    error: '',
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
      declarations: [ReportDashboardComponent, FacingPipe],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch ReportCommand with false when onCloseReport is called', () => {
    const spy = spyOn(store, 'dispatch');
    component.onCloseReport();
    expect(spy).toHaveBeenCalledWith(new ReportCommand(false));
  });
});
