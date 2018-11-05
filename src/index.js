import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import style from './index.scss';

const Application = () => {
  ReactDOM.render(
    <div className={style.appContainer}>
      <div>CONTENT</div>
    </div>,
    document.getElementById('app'),
  );
};

Application();

export default hot(module)(Application);
