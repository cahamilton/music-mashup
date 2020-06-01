/** @format */

import axios, { AxiosResponse } from 'axios';
import type { Action } from 'redux';
import type { ActionDefault } from '../actions';
import type { AppThunk } from '../../types/AppThunk.type';
import type { StateBiographyContent } from '../../reducers/biography/biography.content.reducers';
import logger from '../../utilities/logger';

export const BIOGRAPHY_PENDING = 'BIOGRAPHY_PENDING';
export const BIOGRAPHY_UPDATE = 'BIOGRAPHY_UPDATE';

export interface ActionBiographyPending extends Action {
  type: typeof BIOGRAPHY_PENDING;
}

export interface ActionBiographyUpdate extends Action {
  type: typeof BIOGRAPHY_UPDATE;
  payload?: StateBiographyContent;
}

export type ActionsBiographyLoading =
  | ActionDefault
  | ActionBiographyPending
  | ActionBiographyUpdate;

export type ActionsBiographyContent = ActionDefault | ActionBiographyUpdate;

/**
 * Update biography pending state
 */
export const biographyPending = (): ActionBiographyPending => ({
  type: BIOGRAPHY_PENDING,
});

/**
 * Update biography
 * @param payload
 */
export const biographyUpdate = (payload = {}): ActionBiographyUpdate => ({
  type: BIOGRAPHY_UPDATE,
  payload,
});

/**
 * Trigger search for artist biography
 * @param musicBrainzId - Artist MusicBrainz ID
 * @param source - Relationship URL
 */
export const biographySearch = (
  musicBrainzId: string,
  source: string | undefined,
): AppThunk<Promise<void> | boolean> => {
  return (dispatch) => {
    dispatch(biographyPending());

    if (!source) {
      // Clear any existing content
      dispatch(biographyUpdate());
      return false;
    }

    return (async () => {
      try {
        const url = `/api/biography/${musicBrainzId}`;
        const response: AxiosResponse = await axios.post(url, { source });
        const { data } = response.data;

        dispatch(biographyUpdate(data));
      } catch (error) {
        logger.error(error);
      }
    })();
  };
};
