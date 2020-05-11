import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { NEW_CLIENT } from '../../services/Mutations/index';
import { Title } from '../index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormCreateClient = (props) => {
  const initialState = {
    name: '',
    surname: '',
    company: '',
    years: '',
    type: '',
    email: '',
    seller: '',
    error: false,
    show: false,
    hasError: false,
  };
  const [values, setValues] = React.useState(initialState);
  const clearState = () => {
    setValues({ ...initialState });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const { error } = values;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> all fields are required</p>
  ) : (
    ''
  );
  const { id } = props.session.getUser;

  return (
    <div className="form__container">
      <Title title={'Create client'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={NEW_CLIENT}
          onCompleted={() =>
            setValues({
              show: true,
            })
          }
          onError={() => setValues({ hasError: true })}
        >
          {(setClient) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const { name, surname, company, years, type, email } = values;
                if (
                  name === '' ||
                  surname === '' ||
                  type === '' ||
                  company === '' ||
                  years === ''
                ) {
                  setValues({
                    error: true,
                  });
                  return;
                }
                setValues({
                  error: false,
                });
                const input = {
                  name,
                  surname,
                  company,
                  email,
                  type,
                  years: Number(years),
                  seller: id,
                };
                setClient({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <TextField
                  id="name"
                  label="Name"
                  className={'form__input'}
                  value={values.name}
                  onChange={handleChange('name')}
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <TextField
                  id="standard-surname"
                  label="Surname"
                  className={'form__input'}
                  value={values.surname}
                  onChange={handleChange('surname')}
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <TextField
                  id="company"
                  label="Company"
                  className={'form__input'}
                  value={values.company}
                  onChange={handleChange('company')}
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <TextField
                  id="email"
                  label="Email"
                  className={'form__input'}
                  value={values.email}
                  onChange={handleChange('email')}
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <TextField
                  id="years"
                  label="Years"
                  className={'form__input'}
                  value={values.years}
                  onChange={handleChange('years')}
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <FormControl className={'form__input form__input--select'}>
                  <InputLabel htmlFor="age-simple">Type</InputLabel>
                  <Select
                    value={values.type}
                    onChange={handleChange('type')}
                    inputProps={{
                      name: 'age',
                      id: 'age',
                    }}
                  >
                    <MenuItem value={'BASIC'}>BASIC</MenuItem>
                    <MenuItem value={'PREMIUM'}>PREMIUM</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form__buttons">
                <Link to={'/panel/clients'}>
                  <button className="btn btn-danger">CANCEL</button>
                </Link>
                <button type="submit" className="btn btn-success">
                  ADD CLIENT
                </button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
      <SweetAlert
        show={values.show}
        title="GOOD!"
        text="The client was saved succesfull"
        onConfirm={() => {
          clearState();
          setValues({ show: false });
          props.history.push('/panel/clients');
        }}
      />
      <SweetError
        show={values.hasError}
        title="HEY!"
        type="warning"
        text="Something happend in Data Base"
        onConfirm={() => {
          clearState();
          setValues({ hasError: false });
        }}
      />
    </div>
  );
};

export default withRouter(FormCreateClient);
