import React, { Component, Fragment } from 'react';
import { Title } from '../../components/index';
import { CREATE_USER } from '../../services/Mutations/index';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withSwalInstance } from 'sweetalert2-react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import swal from 'sweetalert2';
const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const initialState = {
  name: '',
  user: '',
  password: '',
  repeatPassword: '',
  rol: '',
  message: '',
  show: false,
  hasError: false,
};

class Register extends Component {
  state = {
    ...initialState,
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validadFrom = () => {
    const { user, password, repeatPassword, name, rol } = this.state;
    const noValid =
      !user || !this.validateEmail() || !name || !rol || !password || password !== repeatPassword;

    return noValid;
  };

  validateEmail = () => {
    const { user } = this.state;
    const emailValid = user.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (emailValid) {
      return true;
    }
    return false;
  };
  createNewUser = (e, createUser, error) => {
    const { user, password, name, rol } = this.state;
    e.preventDefault();
    createUser({
      variables: { user, name, rol, password },
    }).then();
  };

  cleanState = () => {
    this.setState({
      ...initialState,
    });
  };

  render() {
    // const rolUser = this.props.session.getUser.rol

    // const redirect = (rolUser !== "ADMIN") ? <Redirect to="/" /> : ''

    return (
      <Fragment>
        {/* {redirect} */}
        <Title title="new user" />
        <div className="row justify-content-center">
          <Mutation
            mutation={CREATE_USER}
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
            {(createUser, { loading, error, data }) => (
              <form className="col-md-3" onSubmit={(e) => this.createNewUser(e, createUser, error)}>
                <div className="form-row">
                  <TextField
                    fullWidth
                    id="name_reg"
                    label="Name"
                    autoComplete="Name"
                    name={'name'}
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    id="user_reg"
                    label="Email"
                    autoComplete="Email"
                    name={'user'}
                    value={this.state.user}
                    onChange={this.handleInputChange}
                    margin="normal"
                  />
                  {/* <small className="form-text text-muted">
                    (has to be a email)
                  </small> */}
                </div>
                <div className="form-row">
                  <TextField
                    fullWidth
                    id="password_reg"
                    label="password"
                    autoComplete="Password"
                    name={'password'}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    id="repeatpassword_reg"
                    label="Repeat password"
                    name={'repeatPassword'}
                    value={this.state.repeatPassword}
                    onChange={this.handleInputChange}
                    margin="normal"
                  />
                </div>
                <FormControl fullWidth>
                  <InputLabel htmlFor="rol">ROL</InputLabel>
                  <Select value={this.state.rol} onChange={this.handleInputChange} name="rol">
                    <MenuItem value={'ADMIN'}>Admin</MenuItem>
                    <MenuItem value={'SELLER'}>SELLER</MenuItem>
                  </Select>
                </FormControl>
                <button
                  disabled={this.validadFrom()}
                  type="submit"
                  className="btn btn-success float-right"
                >
                  Crear Usuario
                </button>
              </form>
            )}
          </Mutation>
        </div>
        <SweetAlert
          show={this.state.show}
          title="GOOD!"
          text="The User was saved succesfull"
          onConfirm={() => {
            this.setState({ show: false });
            this.props.history.push('/login');
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
      </Fragment>
    );
  }
}

export default withRouter(Register);
