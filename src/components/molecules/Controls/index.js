import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import style from './index.scss';

const Controls = (props) => {
  const { handleClick, handleView, gallery } = props;

  return (
    <div className={style.controls}>
      <button onClick={handleView} className={style.button} type="button">
        {gallery ? 'Random' : 'Gallery'}
      </button>
      {!gallery
        && <button onClick={handleClick} className={style.button} type="button">Flip</button>}
      <Link className={style.link} to="/">
        <button className={style.button} type="button">Change</button>
      </Link>
    </div>
  );
};

export default withRouter(Controls);
