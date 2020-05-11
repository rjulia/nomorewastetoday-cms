import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CloseSession } from '../../auth/Index';
import Button from '@material-ui/core/Button';
import './Header.scss';

const Header = ({ session, message }) => {
  let bar =
    session && session.getUser ? (
      <NavigationAuth message={message} session={session} />
    ) : (
      <NavigationNoAuth />
    );
  return <nav className="navbar__main d-flex">{bar}</nav>;
};

const NavigationNoAuth = () => (
  <Fragment>
    <Link className="navbar__main--button" to="/login">
      <Button variant="contained" color="primary">
        Log In
      </Button>
    </Link>
  </Fragment>
);

const NavigationAuth = ({ session, message }) => (
  <Fragment>
    <div className="navbar__main--dialog">
      <p className="navbar__main--message">{message}</p>
      <Link to="/panel/home">
        <Button variant="contained" color="primary">
          PANEL
        </Button>
      </Link>
      <CloseSession model={'button'} />
    </div>
  </Fragment>
);

export default Header;
