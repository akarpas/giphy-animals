import axios from 'axios';
import random from 'lodash.random';
import {
  SET_GIPHIES,
  GIPHIES_LOADING,
  CLEAR_GIPHIES,
  SET_ERROR,
} from './types';

export const fetchGiphies = async (dispatch, animal) => {
  dispatch({
    type: GIPHIES_LOADING,
    payload: null,
  });
  const offset = random(0, 2);
  const query = `${animal}+cute+funny`;
  const apiUrlBase = 'https://api.giphy.com/v1/gifs/search?api_key=ORGc6tSoegWwcMO8kJ4JQDEHeB1J11So&limit=100&q=';
  const url = `${apiUrlBase}${query}&rating=g&offset=${offset}`;
  const response = await axios.get(url);
  const { data, status, statusText } = response;
  if (status !== 200) {
    // TODO: check if error message - test with wrong api key
    return dispatch({
      type: SET_ERROR,
      payload: { status, statusText },
    });
  }
  return dispatch({
    type: SET_GIPHIES,
    payload: data,
  });
};

export const clearGiphies = dispatch => dispatch({
  type: CLEAR_GIPHIES,
  payload: null,
});
