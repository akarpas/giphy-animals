import configureStore from 'redux-mock-store';
import giphyReducer from '../../src/reducers/giphy';
import { fetchGiphies } from '../../src/actions/giphy';

import { SET_GIPHIES, GIPHIES_LOADING } from '../../src/actions/types';

const mockStore = configureStore();
const store = mockStore();

describe('get giphies from giphy api', () => {
  beforeEach(async () => {
    store.clearActions();
    await fetchGiphies(store.dispatch, 'elephant');
  });

  it('handles actions of type GIPHIES_LOADING', async () => {
    const { payload } = store.getActions()[0];
    const action = {
      type: GIPHIES_LOADING,
      payload,
    };
    const newState = await giphyReducer({ giphies: [] }, action);
    expect(newState).toEqual({
      giphies: [],
      loading: true,
      error: null,
    });
  });

  it('handles actions of type SET_GIPHIES', async () => {
    const { payload } = store.getActions()[1];
    const action = {
      type: SET_GIPHIES,
      payload,
    };
    const newState = await giphyReducer({ giphies: [] }, action);
    expect(newState.giphies.length).toBeGreaterThan(1);
    expect(newState.giphies[0].url).toBeTruthy();
    expect(newState.giphies[0].url).toContain('https');
    expect(newState.giphies[0].title).toBeTruthy();
  });
});
