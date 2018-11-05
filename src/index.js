import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import createStore from './store';
import Home from './components/pages/Home';

import style from './index.scss';

const store = createStore({});

const Application = () => {
  ReactDOM.render(
    <div className={style.appContainer}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>,
    document.getElementById('app'),
  );
};

Application();

export default hot(module)(Application);
