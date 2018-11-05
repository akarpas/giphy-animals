import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Home from './components/pages/Home';

import style from './index.scss';

const Application = () => {
  ReactDOM.render(
    <div className={style.appContainer}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>,
    document.getElementById('app'),
  );
};

Application();

export default hot(module)(Application);
