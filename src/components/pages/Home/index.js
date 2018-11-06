import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Layout from '../../organisms/Layout';
import style from './index.scss';

const Home = () => {
  const animals = ['cat', 'dog', 'lion', 'monkey', 'elephant'];
  return (
    <Layout>
      <div className={style.content}>
        <div className={style.title}>Choose your favorite animal:</div>
        <div className={style.animals}>
          {animals.map(animal => (
            <Link className={style.link} key={`link-${animal}`} to={{ pathname: '/animal', query: animal }}>
              <button className={style.button} id={animal} key={animal} type="button">{animal}</button>
            </Link>))}
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Home);
