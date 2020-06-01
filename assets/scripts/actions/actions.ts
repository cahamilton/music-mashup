/** @format */

import type { Action } from 'redux';

export const DEFAULT = 'DEFAULT';

export interface ActionDefault extends Action {
  type: typeof DEFAULT;
  payload?: any;
}
