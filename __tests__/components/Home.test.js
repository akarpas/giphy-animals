import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/components/pages/Home';

let wrapper;

beforeEach(() => {
  wrapper = mount(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  );
});

afterEach(() => {
  wrapper.unmount();
});

it('renders without crashing', () => {
  wrapper.render();
});

describe('header and title', () => {
  it('contains a header', () => {
    expect(wrapper.find('header').length).toEqual(1);
  });
  it('contains the correct header title', () => {
    expect(wrapper.find('header').text()).toContain('Fun with Animals!');
  });
  it('contains the correct title', () => {
    expect(wrapper.find('.title').length).toEqual(1);
    expect(wrapper.find('.title').text()).toContain('Choose your favorite animal');
  });
});

describe('main content', () => {
  it('contains a main content div for the animals', () => {
    expect(wrapper.find('.animals').length).toEqual(1);
  });
  it('contains 5 buttons for the animals', () => {
    expect(wrapper.find('button').length).toEqual(5);
  });
});
