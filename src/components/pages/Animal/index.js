import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import random from 'lodash.random';
import Layout from '../../organisms/Layout';
import GiphyRandom from '../../molecules/GiphyRandom';
import * as giphyActions from '../../../actions/giphy';
import style from './index.scss';

class Animal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      giphyIndex: random(0, 5),
      gallery: false,
      galleryItems: 20,
    };
    this.changeGiphy = this.changeGiphy.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('scroll', this.handleScroll);
    const { location, dispatch, history } = this.props;
    const { query } = location;
    if (query === undefined) {
      history.push('/');
    } else {
      giphyActions.fetchGiphies(dispatch, query);
      this.timer = setInterval(this.changeGiphy, 4500);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('scroll', this.handleScroll);
    const { dispatch } = this.props;
    clearInterval(this.timer);
    giphyActions.clearGiphies(dispatch);
  }

  handleVisibilityChange() {
    const { visibilityState } = document;
    if (visibilityState === 'visible') {
      this.setState({ pause: false });
    } else {
      this.setState({ pause: true });
    }
  }

  changeGiphy() {
    const { pause } = this.state;
    if (!pause) {
      const { giphies } = this.props;
      const numberOfGiphies = giphies.length;
      const giphyIndex = random(0, numberOfGiphies - 1);
      this.setState({ giphyIndex });
    }
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      const { galleryItems } = this.state;
      if (galleryItems < 100) {
        setTimeout(() => {
          this.setState({ galleryItems: galleryItems + 10 });
        }, 500);
      }
    }
  }

  handleView(e) {
    e.preventDefault();
    const { gallery } = this.state;
    if (gallery) {
      this.timer = setInterval(this.changeGiphy, 4500);
      this.setState({ galleryItems: 20 });
    } else {
      clearInterval(this.timer);
    }
    this.setState({ gallery: !gallery });
  }

  handleClick(e) {
    e.preventDefault();
    const { giphyIndex } = this.state;
    const { giphies } = this.props;
    const numberOfGiphies = giphies.length;
    const newGiphyIndex = random(0, numberOfGiphies - 1);
    const isSameIndex = newGiphyIndex === giphyIndex;
    if (isSameIndex && giphyIndex < numberOfGiphies - 1) {
      this.setState({ giphyIndex: newGiphyIndex + 1 });
    } else if (isSameIndex && giphyIndex > 0) {
      this.setState({ giphyIndex: newGiphyIndex - 1 });
    } else {
      this.setState({ giphyIndex: newGiphyIndex });
    }
    clearInterval(this.timer);
    this.timer = setInterval(this.changeGiphy, 4500);
  }

  render() {
    const { loading, giphies } = this.props;
    const { giphyIndex, gallery, galleryItems } = this.state;
    const giphy = giphies && giphies[giphyIndex];
    const clonedGiphies = giphies && giphies.slice();
    const giphiesGallery = giphies && clonedGiphies.splice(0, galleryItems);

    return (
      <Layout>
        <div className={style.content}>
          <div className={style.controls}>
            <button onClick={e => this.handleView(e)} className={style.button} type="button">
              {gallery ? 'Random' : 'Gallery'}
            </button>
            {!gallery
              && <button onClick={e => this.handleClick(e)} className={style.button} type="button">Flip</button>}
            <Link className={style.link} to="/">
              <button className={style.button} type="button">Change</button>
            </Link>
          </div>
          {loading && <div className={style.loading}>Loading Giphy...</div>}
          {(giphy && !gallery) && (<GiphyRandom giphy={giphy} />)}
          {(giphy && gallery)
            && (
              <div className={style.gallery}>
                {giphiesGallery.map((singleGiphy) => {
                  const key = singleGiphy.url.split('media/')[1];
                  return (
                    <div key={`${key}-container`} className={style.gifContainer}>
                      <img
                        key={key}
                        src={singleGiphy.url}
                        alt={singleGiphy.title}
                        className={style.gifGallery}
                        height="20vw"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          {(galleryItems < 100 && gallery)
            && <div className={style.giphiesLoading}>There are more giphies coming...</div>}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ giphy }) => ({ ...giphy });

export default withRouter(connect(mapStateToProps)(Animal));
