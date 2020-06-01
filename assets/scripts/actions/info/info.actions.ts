/** @format */

import type { Action } from 'redux';
import type { ActionDefault } from '../actions';
import type { StateInfo } from '../../reducers/info/info.reducers';

export const INFO_UPDATE = 'INFO_UPDATE';

export interface ActionInfoUpdate extends Action {
  type: typeof INFO_UPDATE;
  payload: StateInfo;
}

export type ActionsInfo = ActionDefault | ActionInfoUpdate;

/**
 * Update artist info
 * @param payload
 */
export const infoUpdate = (payload: StateInfo): ActionInfoUpdate => ({
  type: INFO_UPDATE,
  payload,
});
