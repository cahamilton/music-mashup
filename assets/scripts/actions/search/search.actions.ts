/** @format */

import axios, { AxiosResponse } from 'axios';
import type { Action } from 'redux';
import type { ActionDefault } from '../actions';
import type { AppThunk } from '../../types/AppThunk.type';
import type { StateInfo } from '../../reducers/info/info.reducers';
import type { StateSearchQuery } from '../../reducers/search/search.query.reducers';
import type { StateSearchResultsMatches } from '../../reducers/search/search.results.reducers';
import type { ActionInfoUpdate } from '../info/info.actions';
import { infoUpdate } from '../info/info.actions';
import { biographySearch } from '../biography/biography.actions';
import logger from '../../utilities/logger';

export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_UPDATE = 'SEARCH_UPDATE';
export const SEARCH_RESULTS_VISIBLE_TOGGLE = 'SEARCH_RESULTS_VISIBLE_TOGGLE';

export interface ActionSearchPending extends Action {
  type: typeof SEARCH_PENDING;
}

export interface ActionSearchUpdate extends Action {
  type: typeof SEARCH_UPDATE;
  payload: {
    query: StateSearchQuery;
    matches: StateSearchResultsMatches;
  };
}

export interface ActionSearchResultsToggle extends Action {
  type: typeof SEARCH_RESULTS_VISIBLE_TOGGLE;
}

export type ActionsSearchLoading =
  | ActionDefault
  | ActionSearchPending
  | ActionInfoUpdate;

export type ActionsSearchQuery = ActionDefault | ActionSearchUpdate;

export type ActionsSearchResults =
  | ActionDefault
  | ActionSearchUpdate
  | ActionSearchResultsToggle;

/**
 * Update search pending state
 */
export const searchPending = (): ActionSearchPending => ({
  type: SEARCH_PENDING,
});

/**
 * Update search results
 * @param {Object} payload
 */
export const searchUpdate = (payload: {
  query: StateSearchQuery;
  matches: StateSearchResultsMatches;
}): ActionSearchUpdate => ({
  type: SEARCH_UPDATE,
  payload,
});

/**
 * Update search result visible state
 */
export const searchResultsVisibleToggle = (): ActionSearchResultsToggle => ({
  type: SEARCH_RESULTS_VISIBLE_TOGGLE,
});

/**
 * Trigger Search by MusicBrainz ID
 * @param musicBrainzId
 */
export const searchByArtistMbid = (
  musicBrainzId: string,
): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      const url = `/api/info/${musicBrainzId}`;
      const response: AxiosResponse = await axios.get(url);
      const { data }: { data: StateInfo } = response.data;
      const { relationWikidata } = data;

      dispatch(infoUpdate(data));
      dispatch(biographySearch(musicBrainzId, relationWikidata));
    } catch (error) {
      logger.error(error);

      dispatch(searchPending());
    }
  };
};

/**
 * Trigger Search by Artist name
 * @param artist
 */
export const searchByArtistName = (artist: string): AppThunk<Promise<void>> => {
  return async (dispatch) => {
    try {
      dispatch(searchPending());

      const url = `/api/search/${encodeURIComponent(artist)}`;
      const response: AxiosResponse = await axios.get(url);
      const { data } = response.data;

      dispatch(searchUpdate(data));
      dispatch(searchByArtistMbid(data.matches[0].mbid));
    } catch (error) {
      logger.error(error);

      dispatch(searchPending());
    }
  };
};
