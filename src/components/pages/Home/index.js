import React from 'react';
import Layout from '../../organisms/Layout';
import style from './index.scss';

const Home = () => (
  <Layout>
    <div className={style.content}>
      <div className={style.title}>Choose your favorite animal:</div>
    </div>
  </Layout>
);

export default Home;
