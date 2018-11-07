import React from 'react';

import style from './index.scss';

const GiphyGallery = (props) => {
  const { giphies } = props;

  return (
    <div className={style.gallery}>
      {giphies.map((giphy) => {
        const key = giphy.url.split('media/')[1];
        return (
          <div key={`${key}-container`} className={style.gifContainer}>
            <img
              key={key}
              src={giphy.url}
              alt={giphy.title}
              className={style.gifGallery}
              height="20vw"
            />
          </div>
        );
      })}
    </div>
  );
};

export default GiphyGallery;
