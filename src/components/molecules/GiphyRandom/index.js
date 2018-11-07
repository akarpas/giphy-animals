import React from 'react';

import style from './index.scss';

const GiphyRandom = (props) => {
  const { giphy } = props;

  return (
    <div className={style.giphyContainer}>
      <img src={giphy.url} alt={giphy.title} className={style.gif} height="80vw" />
    </div>
  );
};

export default GiphyRandom;
