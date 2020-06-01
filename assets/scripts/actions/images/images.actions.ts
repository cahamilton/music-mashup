/** @format */

import axios, { AxiosResponse } from 'axios';
import type { Action } from 'redux';
import type { ActionDefault } from '../actions';
import type { AppThunk } from '../../types/AppThunk.type';
import type { StateImagesResults } from '../../reducers/images/images.results.reducers';
import logger from '../../utilities/logger';

export const IMAGES_PENDING = 'IMAGES_PENDING';
export const IMAGES_UPDATE = 'IMAGES_UPDATE';

export interface ActionImagesPending extends Action {
  type: typeof IMAGES_PENDING;
}

export interface ActionImagesUpdate extends Action {
  type: typeof IMAGES_UPDATE;
  payload?: StateImagesResults;
}

export type ActionsImagesLoading =
  | ActionDefault
  | ActionImagesPending
  | ActionImagesUpdate;

export type ActionsImagesResults = ActionDefault | ActionImagesUpdate;

/**
 * Update images pending state
 */
export const imagesPending = (): ActionImagesPending => ({
  type: IMAGES_PENDING,
});

/**
 * Update images
 * @param payload
 */
export const imagesUpdate = (payload = {}): ActionImagesUpdate => ({
  type: IMAGES_UPDATE,
  payload,
});

/**
 * Trigger search for artist images
 */
export const imagesSearch = (): AppThunk<Promise<void> | boolean> => {
  return (dispatch, getState) => {
    const state = getState();
    const musicBrainzId = state.info.mbid;

    if (!musicBrainzId) {
      dispatch(imagesUpdate());
      return false;
    }

    return (async () => {
      try {
        dispatch(imagesPending());

        const url = `/api/images/${musicBrainzId}`;
        const response: AxiosResponse = await axios.get(url);
        const { data } = response.data;

        dispatch(imagesUpdate(data));
      } catch (error) {
        logger.error(error);

        dispatch(imagesPending());
      }
    })();
  };
};
