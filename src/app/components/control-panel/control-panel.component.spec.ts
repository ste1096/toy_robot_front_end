import { of } from 'rxjs';
import gameConfig from 'src/assets/game-config.json';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CommandEnum, FacingEnum } from '../../models';
import { LeftCommand, MoveCommand, ReportCommand, RightCommand, SaveError } from '../../store/actions';
import { AppState } from '../../store/app.state';
import { selectCommand, selectError } from '../../store/selectors';
import { ControlPanelComponent } from './control-panel.component';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let store: MockStore;

  const initialState: AppState = {
    command: {
      history: [{ command: CommandEnum.PLACE, axis: { x: 0, y: 0 }, facing: FacingEnum.NORTH }],
      axis: { x: 0, y: 0 },
      facing: FacingEnum.NORTH,
      report: false,
    },
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
      declarations: [ControlPanelComponent],

      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlPanelComponent);
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

  it('should set isReady to true when command history contains PLACE command', () => {
    const commandState = {
      history: [{ command: 'PLACE' }],
      axis: { x: 0, y: 0 },
      facing: FacingEnum.NORTH,
      report: false,
    };
    spyOn(store, 'pipe').and.returnValue(of(commandState));
    fixture.detectChanges();
    expect(component.isReady).toBe(true);
  });

  it('should dispatch MoveCommand when onMove is called and isReady is true', () => {
    const spy = spyOn(store, 'dispatch');
    component.isReady = true;
    component.onMove();
    expect(spy).toHaveBeenCalledWith(new MoveCommand({ x: 0, y: 1 }));
  });

  it('should dispatch LeftCommand when onLeft is called and isReady is true', () => {
    const spy = spyOn(store, 'dispatch');
    component.isReady = true;
    component.onLeft();
    expect(spy).toHaveBeenCalledWith(new LeftCommand(FacingEnum.WEST));
  });

  it('should dispatch RightCommand when onRight is called and isReady is true', () => {
    const spy = spyOn(store, 'dispatch');
    component.isReady = true;
    component.onRight();
    expect(spy).toHaveBeenCalledWith(new RightCommand(FacingEnum.EAST));
  });

  it('should dispatch ReportCommand when onReport is called', () => {
    const spy = spyOn(store, 'dispatch');
    component.isReady = true;
    component.onReport();
    expect(spy).toHaveBeenCalledWith(new ReportCommand(true));
  });
});

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let store: MockStore;

  const initialState: AppState = {
    command: {
      history: [{ command: CommandEnum.PLACE, axis: { x: 0, y: 0 }, facing: FacingEnum.NORTH }],
      axis: { x: 5, y: 5 },
      facing: FacingEnum.NORTH,
      report: false,
    },
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
      declarations: [ControlPanelComponent],

      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    component.axisDimensions = gameConfig.axisDimensions;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should dispatch SaveError when onMove is called and is an invalid move', () => {
    const spy = spyOn(store, 'dispatch');
    component.isReady = true;
    component.onMove();
    expect(spy).toHaveBeenCalledWith(new SaveError('Seriously? Bad move! You trying to get me suicided?'));
  });
});
