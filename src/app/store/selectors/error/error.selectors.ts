import { createFeatureSelector } from '@ngrx/store';

import { ErrorState } from '../../reducers';

// Selector functions
export const selectError = createFeatureSelector<ErrorState>('error');
