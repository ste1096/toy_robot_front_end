import { createFeatureSelector } from '@ngrx/store';

import { CommandState } from '../../reducers';

// Selector functions
export const selectCommand = createFeatureSelector<CommandState>('command');
