import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { fetchGiphies } from '../../src/actions/giphy';
import createStore from '../../src/store';
import Animal from '../../src/components/pages/Animal';

const mockStore = configureStore();
const store = createStore({});

let wrapper;

const initialState = {
  giphy: {
    giphies: [],
    loading: false,
    error: null,
  },
};

beforeEach(() => {
  wrapper = mount(
    <Provider store={store} initialState={initialState}>
      <MemoryRouter initialEntries={[{ pathname: '/animal', query: 'lion' }]}>
        <Animal />
      </MemoryRouter>
    </Provider>,
  );
});

afterEach(() => {
  wrapper.unmount();
});

it('renders without crashing', () => {
  wrapper.render();
});

describe('main content', () => {
  it('contains a header', () => {
    expect(wrapper.find('header').length).toEqual(1);
  });
  it('contains a loading text', () => {
    expect(wrapper.find('.loading').length).toEqual(1);
  });
  it('contains two buttons for changing view to Random and to Change animals', () => {
    expect(wrapper.find('button').length).toEqual(2);
    expect(wrapper.find('button').at(0).props().children).toContain('Random');
    expect(wrapper.find('button').at(1).props().children).toContain('Change');
  });
});

describe('on load, has a gallery of inital 20 giphies', () => {
  beforeEach(async () => {
    mockStore().clearActions();
    await fetchGiphies(mockStore().dispatch, 'lion');
    wrapper.update();
  }, 10000);
  afterAll(() => { // eslint-disable-line
    wrapper.unmount();
  });
  setTimeout(() => {
    it('contains a gallery container for all the giphies', () => {
      expect(wrapper.find('.gallery').length).toEqual(1);
    });
    it('contains 20 images for the giphy', () => {
      expect(wrapper.find('img').length).toEqual(20);
    });
    it('receives an array of giphy urls and is not loading', () => {
      expect(typeof store.getState().giphy.giphies).toBe('object');
      expect(typeof store.getState().giphy.giphies).toBe('object');
      expect(store.getState().giphy.giphies[0].url).toBeTruthy();
      expect(store.getState().giphy.giphies[0].url).toContain('https');
      expect(store.getState().giphy.loading).toBe(false);
    });
  }, 1000);
});
