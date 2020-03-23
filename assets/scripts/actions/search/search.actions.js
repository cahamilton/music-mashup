/** @format */

import { biographySearch } from '../biography/biography.actions';
import { infoUpdate } from '../info/info.actions';

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
 * @returns {function(*): Promise<any>}
 */
export const searchByArtistMbid = (musicBrainzId) => (dispatch) => {
  dispatch(searchPending());

  const url = `/api/info/${musicBrainzId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.data)
    .then((response) => {
      const { wikidata } = response.relations;
      dispatch(infoUpdate(response));
      dispatch(biographySearch(musicBrainzId, wikidata));
    })
    .catch((error) => {
      // TODO: Add logger
      // eslint-disable-next-line no-console
      console.error(error);
    })
    .finally(() => {
      dispatch(searchPending());
    });
};

/**
 * Trigger Search by Artist name
 * @param artist
 * @returns {function(*): Promise<any>}
 */
export const searchByArtistName = (artist) => (dispatch) => {
  dispatch(searchPending());

  const url = `/api/search/${encodeURIComponent(artist)}`;

  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.data)
    .then((response) => {
      const { query, matches } = response;
      dispatch(searchQueryUpdate(query));
      dispatch(searchResultsMatchesUpdate(matches));
      dispatch(searchByArtistMbid(matches[0].mbid));
    })
    .catch((error) => {
      // TODO: Add logger
      // eslint-disable-next-line no-console
      console.error(error);
    })
    .finally(() => {
      dispatch(searchPending());
    });
};
