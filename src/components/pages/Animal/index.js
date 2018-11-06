import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import random from 'lodash.random';
import Layout from '../../organisms/Layout';
import * as giphyActions from '../../../actions/giphy';
import style from './index.scss';

class Animal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      giphyIndex: random(0, 5),
    };
    this.changeGiphy = this.changeGiphy.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
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
    const { dispatch } = this.props;
    clearInterval(this.timer);
    giphyActions.clearGiphies(dispatch);
  }

  changeGiphy() {
    const { giphies } = this.props;
    const numberOfGiphies = giphies.length;
    const giphyIndex = random(0, numberOfGiphies - 1);
    this.setState({ giphyIndex });
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
    const { giphyIndex } = this.state;
    const giphy = giphies && giphies[giphyIndex];

    return (
      <Layout>
        <div className={style.content}>
          <div className={style.giphyContainer}>
            {loading && <div className={style.loading}>Loading Giphy...</div>}
            {giphy
              && (
                <iframe
                  src={giphy.url}
                  className={style.iframe}
                  frameBorder="0"
                  allowFullScreen
                  title={giphy.title}
                />
              )}
          </div>
          <div className={style.controls}>
            <button onClick={e => this.handleClick(e)} className={style.button} type="button">Flip</button>
            <Link className={style.link} to="/">
              <button className={style.button} type="button">Change</button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ giphy }) => ({ ...giphy });

export default withRouter(connect(mapStateToProps)(Animal));