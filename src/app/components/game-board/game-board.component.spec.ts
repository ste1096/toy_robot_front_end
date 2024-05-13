import { of } from 'rxjs';
import gameConfig from 'src/assets/game-config.json';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CommandEnum, FacingEnum } from '../../models';
import { RangeSizePipe, ReversePipe } from '../../pipes';
import { AppState } from '../../store/app.state';
import { selectCommand, selectError } from '../../store/selectors';
import { GameBoardComponent } from './game-board.component';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
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
      declarations: [GameBoardComponent, ReversePipe, RangeSizePipe],
      providers: [provideMockStore(mockStore)],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
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
});
