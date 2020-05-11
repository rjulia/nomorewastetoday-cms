import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { AUTH_USER } from '../../services/Mutations';
import Header from '../../scenes/Header/Header';
import { Logo } from '../../components';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const initialState = {
  user: '',
  password: '',
};

class Login extends Component {
  state = {
    ...initialState,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  cleanState = () => {
    this.setState({ ...initialState });
  };

  initialSession = (e, authUser) => {
    const { user, password } = this.state;

    e.preventDefault();
    authUser({
      variables: { user, password },
    }).then(async ({ data }) => {
      localStorage.setItem('tokenGraphl', data.authUser.token);
      //ejecutar el query una vez que se haya iniciado sesion
      await this.props.refetch();
      // limpiar el state

      //rediriguir
    });
  };

  validateForm = () => {
    const { user, password } = this.state;
    const noValid = !user || !password;
    return noValid;
  };
  render() {
    const { user, password } = this.state;
    return (
      <Fragment>
        <Header session={this.props.session} message={this.props.message} />
        <div className="landing">
          <div className="access__container">
            <div className="access__logo">
              <Logo />
            </div>
            <div className="access_inputs">
              <h4 className="col-12">ACCESS CMS PANEL</h4>

              <Mutation
                mutation={AUTH_USER}
                variables={{ user, password }}
                onCompleted={(e) => {
                  this.setState({
                    show: true,
                  });
                }}
                onError={(e) => {
                  this.setState({
                    hasError: true,
                    message: e.message,
                  });
                }}
              >
                {(authUser, { loading, error, data }) => {
                  return (
                    <form onSubmit={(e) => this.initialSession(e, authUser)} className="col-12">
                      <TextField
                        id="standard-name"
                        label="User"
                        autoComplete="username email"
                        name={'user'}
                        fullWidth
                        value={this.state.user}
                        onChange={this.handleInputChange}
                        margin="normal"
                      />
                      <TextField
                        id="standard-password-input"
                        label="Password"
                        name={'password'}
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        fullWidth
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                      />
                      <div className="access__button">
                        <Button
                          width="auto"
                          variant="contained"
                          color="primary"
                          disabled={loading || this.validateForm()}
                          type="submit"
                        >
                          Sign In
                        </Button>
                      </div>
                    </form>
                  );
                }}
              </Mutation>

              <SweetAlert
                show={this.state.show}
                title="GOOD!"
                text="Wellcome Again"
                onConfirm={() => {
                  this.setState({ show: false });
                  this.cleanState();
                  this.props.history.push('/panel/home');
                }}
              />
              <SweetError
                show={this.state.hasError}
                title="HEY!"
                type="warning"
                text={this.state.message}
                onConfirm={() =>
                  this.setState({
                    hasError: false,
                    message: '',
                  })
                }
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default withRouter(Login);
