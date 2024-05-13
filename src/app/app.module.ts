import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import {
  ControlPanelComponent,
  GameBoardComponent,
  PlaceDashboardComponent,
  ReportDashboardComponent,
} from './components';
import { FacingPipe, RangeSizePipe, ReversePipe } from './pipes';
import { appReducers } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    PlaceDashboardComponent,
    ControlPanelComponent,
    ReportDashboardComponent,
    RangeSizePipe,
    ReversePipe,
    FacingPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
