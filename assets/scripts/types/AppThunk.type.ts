/** @format */

import type { Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { AppState } from '../reducers/reducers';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
