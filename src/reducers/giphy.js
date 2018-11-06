import {
  SET_GIPHIES,
  GIPHIES_LOADING,
  CLEAR_GIPHIES,
  SET_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  giphies: [],
  loading: false,
  error: null,
};

const setGiphies = (state, payload) => { // eslint-disable-line
  const { data } = payload;
  const giphies = data.map(giphy => ({ url: giphy.embed_url, title: giphy.title }));
  return { ...state, giphies, loading: false, error: null };
};

const setLoading = state => ({ ...state, loading: true, error: null });

const clearAvatars = state => ({ ...state, giphies: [], error: null });

const setError = (state, error) => ({ ...state, giphies: [], loading: false, error });


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_GIPHIES:
      return setGiphies(state, action.payload);
    case GIPHIES_LOADING:
      return setLoading(state);
    case CLEAR_GIPHIES:
      return clearAvatars(state);
    case SET_ERROR:
      return setError(state, action.payload);
    default:
      return state;
  }
}
