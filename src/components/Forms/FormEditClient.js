import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { withRouter, Link } from 'react-router-dom';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { UPDATE_CLIENT } from '../../services/Mutations';
import { Title } from '../index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormEditClient = (props) => {
  const initialState = {
    client: {
      id: props.client.id,
      name: props.client.name || '',
      surname: props.client.surname || '',
      company: props.client.company || '',
      years: props.client.years || '',
      type: props.client.type || '',
      email: props.client.email || '',
    },
    error: false,
    show: false,
    hasError: false,
  };

  const [values, setValues] = useState(initialState);
  const { name, surname, company, years, type, email, error } = values.client;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );
  return (
    <div className="form__container">
      <Title title={'Edit client'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={UPDATE_CLIENT}
          onCompleted={() =>
            setValues({
              ...values,
              show: true,
            })
          }
          onError={() => setValues({ hasError: true })}
        >
          {(updateClient) => (
            <form
              className="col-12"
              onSubmit={(e) => {
                e.preventDefault();
                const { id, name, surname, company, years, type, email } = values.client;

                setValues({
                  ...values,
                  error: false,
                });
                const input = {
                  id,
                  name,
                  surname,
                  company,
                  years: Number(years),
                  type,
                  email,
                };

                updateClient({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <TextField
                  id="name"
                  label="Name"
                  className={'form__input'}
                  value={name}
                  onChange={(e) =>
                    setValues({
                      client: {
                        ...values.client,
                        name: e.target.value,
                      },
                    })
                  }
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <TextField
                  id="standard-surname"
                  label="Surname"
                  className={'form__input'}
                  value={surname}
                  onChange={(e) =>
                    setValues({
                      client: {
                        ...values.client,
                        surname: e.target.value,
                      },
                    })
                  }
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <TextField
                  id="company"
                  label="Company"
                  className={'form__input'}
                  value={company}
                  onChange={(e) =>
                    setValues({
                      client: {
                        ...values.client,
                        company: e.target.value,
                      },
                    })
                  }
                  margin="normal"
                />
              </div>

              <div className="form__input--box">
                <TextField
                  id="email"
                  label="Email"
                  className={'form__input'}
                  value={email}
                  onChange={(e) =>
                    setValues({
                      client: {
                        ...values.client,
                        email: e.target.value,
                      },
                    })
                  }
                  margin="normal"
                />
              </div>

              <div className="form__input--box">
                <TextField
                  id="years"
                  label="Years"
                  className={'form__input'}
                  value={years}
                  onChange={(e) =>
                    setValues({
                      client: {
                        ...values.client,
                        years: e.target.value,
                      },
                    })
                  }
                  margin="normal"
                />
              </div>
              <div className="form__input--box">
                <FormControl className={'form__input form__input--select'}>
                  <InputLabel htmlFor="age-simple">Type</InputLabel>
                  <Select
                    value={type}
                    onChange={(e) =>
                      setValues({
                        client: {
                          ...values.client,
                          type: e.target.value,
                        },
                      })
                    }
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
                  SAVE CLIENT
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
          setValues({
            ...values,
            show: false,
          });
          props.refetch().then(() => {
            props.history.push('/panel/clients');
          });
        }}
      />
      <SweetError
        show={values.hasError}
        title="HEY!"
        type="warning"
        text="Something happend in Data Base"
        onConfirm={() => setValues({ ...values, hasError: false })}
      />
    </div>
  );
};
// withRouter is hight component, and now we have push in router
export default withRouter(FormEditClient);
