import React from 'react';

import style from './index.scss';

const Layout = ({ children }) => (
  <div className={style.layout}>
    <header className={style.header}>Fun with Animals!</header>
    <div className={style.content}>
      {children}
    </div>
  </div>
);

export default Layout;
