import configureStore from 'redux-mock-store';
import { fetchGiphies } from '../../src/actions/giphy';
import { SET_GIPHIES, GIPHIES_LOADING } from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('fetchGiphies', () => {
  beforeEach(async () => {
    store.clearActions();
    await fetchGiphies(store.dispatch, 'dog');
  });

  it('has the correct type and payload for loading', () => {
    expect(store.getActions()[0].type).toEqual(GIPHIES_LOADING);
    expect(store.getActions()[0].payload).toEqual(null);
  });

  it('has the correct type and payload for fetching giphies', () => {
    expect(store.getActions()[1].type).toEqual(SET_GIPHIES);
    expect(store.getActions()[1].payload).toBeTruthy();
    expect(typeof store.getActions()[1].payload).toBe('object');
  });
});
