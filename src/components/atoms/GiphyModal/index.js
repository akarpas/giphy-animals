import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.scss';

const GiphyModal = (props) => {
  const { location } = props;
  const { state } = location;
  const { giphies, index } = state;
  const giphy = giphies[index];
  const isFirstGiphy = index === 0;
  const isLastGiphy = index === (giphies.length - 1);

  return (
    <div className={style.overlay}> {/* eslint-disable-line */}
      <div className={style.card}>
        <div className={style.controls}>
          <Link
            to={{ pathname: `/animal/${index - 1}`, state: { giphies, index: isFirstGiphy ? index : index - 1 } }}
            type="button"
            style={isFirstGiphy ? { color: 'white', cursor: 'default' } : {}}
            className={style.arrow}
          >
            &lsaquo;
          </Link>
          <Link to="/animal" type="button" className={style.close}>Close</Link>
          <Link
            to={{ pathname: `/animal/${index + 1}`, state: { giphies, index: isLastGiphy ? index : index + 1 } }}
            type="button"
            style={isLastGiphy ? { color: 'white', cursor: 'default' } : {}}
            className={style.arrow}
          >
            &rsaquo;
          </Link>
        </div>
        <div className={style.giphyContainer}>
          <img src={giphy.url} alt={giphy.title} className={style.gif} height="80vw" />
        </div>
      </div>
    </div>
  );
};

export default GiphyModal;
