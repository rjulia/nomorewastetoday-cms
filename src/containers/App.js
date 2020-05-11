import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from '../scenes/Home/Home';
import PanelLayout from '../scenes/Panel/PanelLayout';
import NotFound from '../scenes/NotFound';
import { Login, Session, Register } from '../auth/Index';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme';
import '../styles.scss';

const ProtectedRoute = ({ session, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      session.getUser ? (
        <Component {...props} session={session} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const App = ({ refetch, session }) => {
  let name = undefined;
  let getUser;
  if (session !== undefined && session.getUser !== null) {
    getUser = session.getUser;
    name = getUser.name ? getUser.name : getUser.user;
  }
  const message = name ? `Welcolme: ${name}` : ' Debes iniciar sesion';

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="container-fluid app-cms">
          <Switch>
            <Route exact path="/" render={() => <Home session={session} message={message} />} />
            <Route
              exact
              path="/register"
              render={() => <Register session={session} message={message} />}
            />
            <Route
              exact
              path="/login"
              render={() => <Login refetch={refetch} session={session} />}
            />
            <ProtectedRoute path="/panel" session={session} component={PanelLayout} />
            {/* <Route exact path="/panel" render={(props) => (getUser) ? (<PanelLayout session={session} />) : (<Redirect to="/login" />)} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};
const RootSession = Session(App);

export { RootSession };
