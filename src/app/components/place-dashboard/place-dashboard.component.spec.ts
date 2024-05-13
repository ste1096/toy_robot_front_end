import gameConfig from 'src/assets/game-config.json';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FacingEnum } from '../../models';
import { RangeSizePipe } from '../../pipes';
import { PlaceCommand } from '../../store/actions';
import { AppState } from '../../store/app.state';
import { selectCommand, selectError } from '../../store/selectors';
import { PlaceDashboardComponent } from './place-dashboard.component';

describe('PlaceDashboardComponent', () => {
  let component: PlaceDashboardComponent;
  let fixture: ComponentFixture<PlaceDashboardComponent>;
  let store: MockStore;

  const initialState: AppState = {
    command: { history: [], axis: { x: 0, y: 0 }, facing: FacingEnum.NORTH, report: false },
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
      declarations: [PlaceDashboardComponent, RangeSizePipe],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceDashboardComponent);
    component = fixture.componentInstance;
    component.axisDimensions = gameConfig.axisDimensions;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form).toBeTruthy();
    expect(component.fControlPlaceX).toBeTruthy();
    expect(component.fControlPlaceY).toBeTruthy();
    expect(component.fControlFacing).toBeTruthy();
  });

  it('should dispatch PlaceCommand when onPlace is called with valid form', () => {
    const spy = spyOn(store, 'dispatch');
    component.form.patchValue({ xplace: 1, yplace: 2, facing: FacingEnum.NORTH });
    component.onPlace();
    const expectedPayload = {
      axis: { x: 1, y: 2 },
      facing: FacingEnum.NORTH,
    };
    expect(spy).toHaveBeenCalledWith(new PlaceCommand(expectedPayload));
  });

  it('should mark all form controls as touched when onPlace is called with invalid form', () => {
    const spy = spyOn(component.form, 'markAllAsTouched');
    component.onPlace();
    expect(spy).toHaveBeenCalled();
  });
});
