import React from 'react';
import { Link } from 'react-router-dom';

import style from './index.scss';

const GiphyGallery = (props) => {
  const { giphies, allGiphies } = props;

  return (
    <div className={style.gallery}>
      {giphies.map((giphy, index) => {
        const key = giphy.url.split('media/')[1];
        return (
          <Link
            to={{ pathname: `/animal/${index}`, state: { giphies: allGiphies, index } }}
            key={`${key}-container`}
            className={style.gifContainer}
          >
            <img
              key={key}
              src={giphy.url}
              alt={giphy.title}
              className={style.gif}
              height="20vw"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default GiphyGallery;
