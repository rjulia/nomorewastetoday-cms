import React, { Fragment } from 'react';

import { Logo } from '../../components';
import Header from '../Header/Header';

import './Home.scss';
const Home = ({ session, message }) => {
  return (
    <Fragment>
      <Header session={session} message={message} />
      <div className="landing">
        <div className="access__container">
          <div className="access__logo">
            <Logo />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
