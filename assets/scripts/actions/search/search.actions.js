/** @format */

import { get } from 'axios';

import { biographySearch } from '../biography/biography.actions';
import { infoUpdate } from '../info/info.actions';
import { videosSearch } from '../videos/videos.actions';

export const SEARCH_PENDING = 'SEARCH_PENDING';

export const SEARCH_QUERY_UPDATE = 'SEARCH_QUERY_UPDATE';

export const SEARCH_RESULTS_MATCHES_UPDATE = 'SEARCH_RESULTS_MATCHES_UPDATE';
export const SEARCH_RESULTS_VISIBLE_TOGGLE = 'SEARCH_RESULTS_VISIBLE_TOGGLE';

/**
 * Update search pending state
 * @returns {{type: string}}
 */
export const searchPending = () => ({
  type: SEARCH_PENDING,
});

/**
 * Update search query
 * @param payload {String} - Artist name
 * @returns {{type: string, payload: string}}
 */
export const searchQueryUpdate = (payload) => ({
  type: SEARCH_QUERY_UPDATE,
  payload,
});

/**
 * Update search result matches
 * @param payload {Array} - An array of Search result matches
 * @returns {{type: string, payload: array}}
 */
export const searchResultsMatchesUpdate = (payload) => ({
  type: SEARCH_RESULTS_MATCHES_UPDATE,
  payload,
});

/**
 * Update search result visible state
 * @returns {{type: string}}
 */
export const searchResultsVisibleToggle = () => ({
  type: SEARCH_RESULTS_VISIBLE_TOGGLE,
});

/**
 * Trigger Search by MusicBrainz ID
 * @param musicBrainzId
 * @return {function(*): Promise<void>}
 */
export const searchByArtistMbid = (musicBrainzId) => (dispatch) => {
  dispatch(searchPending());

  return (async () => {
    const url = `/api/info/${musicBrainzId}`;

    try {
      const response = await get(url);
      const { data } = response.data;
      const { wikidata, youtube } = data.relations;

      dispatch(infoUpdate(data));
      dispatch(biographySearch(musicBrainzId, wikidata));
      dispatch(videosSearch(musicBrainzId, youtube));
    } catch (error) {
      // TODO: Add logger
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      dispatch(searchPending());
    }
  })();
};

/**
 * Trigger Search by Artist name
 * @param artist
 * @returns {function(*): Promise<void>}
 */
export const searchByArtistName = (artist) => (dispatch) => {
  dispatch(searchPending());

  return (async () => {
    const url = `/api/search/${encodeURIComponent(artist)}`;

    try {
      const response = await get(url);
      const { data } = response.data;
      const { query, matches } = data;

      dispatch(searchQueryUpdate(query));
      dispatch(searchResultsMatchesUpdate(matches));
      dispatch(searchByArtistMbid(matches[0].mbid));
    } catch (error) {
      // TODO: Add logger
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      dispatch(searchPending());
    }
  })();
};
