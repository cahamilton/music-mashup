import reducers from '../../reducers';

import {
  SEARCH_PENDING,
  SEARCH_QUERY_UPDATE,
  SEARCH_RESULTS_MATCHES_UPDATE,
  SEARCH_RESULTS_VISIBLE_TOGGLE,
} from '../../../actions/search/search.actions';

describe('search.reducers', () => {
  test(SEARCH_PENDING, () => {
    const state = {
      search: {
        loading: false,
      },
    };
    const action = {
      type: SEARCH_PENDING,
    };
    const expected = {
      search: {
        loading: true,
      },
    };
    const store = reducers(state, action);
    expect(store.search.loading).toEqual(expected.search.loading);
  });

  test(SEARCH_QUERY_UPDATE, () => {
    const state = {
      search: {
        query: '',
      },
    };
    const action = {
      type: SEARCH_QUERY_UPDATE,
      payload: 'foo fighters',
    };
    const expected = {
      search: {
        query: 'foo fighters',
      },
    };
    const store = reducers(state, action);
    expect(store.search.query).toEqual(expected.search.query);
  });

  test(SEARCH_RESULTS_MATCHES_UPDATE, () => {
    const state = {
      search: {
        results: {
          matches: [],
        },
      },
    };
    const action = {
      type: SEARCH_RESULTS_MATCHES_UPDATE,
      payload: [{
        name: 'Foo Fighters',
        mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
        thumbnail: {
          '1x': 'https://lastfm-img2.akamaized.net/i/u/34s/195ef60b5ce4442c938dc1af0fb83158.png',
          '2x': 'https://lastfm-img2.akamaized.net/i/u/64s/195ef60b5ce4442c938dc1af0fb83158.png',
        },
      }],
    };
    const expected = {
      search: {
        results: {
          matches: [{
            name: 'Foo Fighters',
            mbid: '67f66c07-6e61-4026-ade5-7e782fad3a5d',
            thumbnail: {
              '1x': 'https://lastfm-img2.akamaized.net/i/u/34s/195ef60b5ce4442c938dc1af0fb83158.png',
              '2x': 'https://lastfm-img2.akamaized.net/i/u/64s/195ef60b5ce4442c938dc1af0fb83158.png',
            },
          }],
        },
      },
    };
    const store = reducers(state, action);
    expect(store.search.results.matches).toEqual(expected.search.results.matches);
  });

  test(SEARCH_RESULTS_VISIBLE_TOGGLE, () => {
    const state = {
      search: {
        results: {
          visible: false,
        },
      },
    };
    const action = {
      type: SEARCH_RESULTS_VISIBLE_TOGGLE,
    };
    const expected = {
      search: {
        results: {
          visible: true,
        },
      },
    };
    const store = reducers(state, action);
    expect(store.search.results.visible).toEqual(expected.search.results.visible);
  });
});
