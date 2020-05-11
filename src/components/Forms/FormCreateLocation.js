import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Input,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Title, UploadCloud } from '../index';
import { TypeRecycling, DistrictHK, TypeOfCoollection } from '../../utils/Constants';
import { NEW_LOCATION } from '../../services/Mutations/index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, TypeRecycling, theme) {
  return {
    fontWeight:
      TypeRecycling.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FormCreateLocation = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    name: '',
    content__en: '',
    content__zh: '',
    address: '',
    imageUrl: '',
    webUrl: '',
    lat: '',
    lng: '',
    tel: '',
    contact: '',
    email: '',
    opening: '',
    facebook: '',
    recycleBy: [],
    category: '',
    district: '',
    message: '',
    error: false,
    empty: false,
    show: false,
    hasError: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleImage = (event) => {
    setState({ ...state, imageUrl: event.url });
  };

  const { error } = state;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );
  const { empty } = state;
  let alert_empty = empty ? (
    <p className="alert alert-danger p3 text-center">
      {' '}
      You must at least add name, district, category and Recyle by
    </p>
  ) : (
    ''
  );

  const clearState = () => {
    setState({ ...initialState });
  };

  return (
    <div className="form__container">
      <Title title={'Create Location'} heading={4} addClass={'form__title'} />
      {alert}
      {alert_empty}
      <div className="form__box">
        <Mutation
          mutation={NEW_LOCATION}
          onCompleted={() =>
            setState({
              ...state,
              show: true,
            })
          }
          onError={(error) => {
            setState({
              ...state,
              message: error.message,
              hasError: true,
            });
          }}
        >
          {(setLocation) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  name,
                  content__en,
                  content__zh,
                  address,
                  imageUrl,
                  webUrl,
                  lat,
                  lng,
                  tel,
                  contact,
                  email,
                  opening,
                  facebook,
                  recycleBy,
                  category,
                  district,
                } = state;

                if (name === '' || recycleBy === '' || district === '' || category === '') {
                  setState({
                    ...state,
                    empty: true,
                  });
                  return;
                }
                setState({
                  ...state,
                  error: false,
                  empty: false,
                });
                const input = {
                  name,
                  content__en,
                  content__zh,
                  address,
                  imageUrl,
                  webUrl,
                  lat: Number(lat),
                  lng: Number(lng),
                  tel,
                  contact,
                  email,
                  opening,
                  facebook,
                  recycleBy,
                  category,
                  district,
                };

                setLocation({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <UploadCloud
                      name_folder={'locations'}
                      checkUploadResult={(event) => handleImage(event)}
                    />
                  </div>
                  <div className="form__input--box">
                    <img className="form__image" src={state.imageUrl} alt="" />
                  </div>

                  <div className="form__input--box">
                    <TextField
                      id="name"
                      label="Name"
                      className={'form__input'}
                      value={state.name}
                      onChange={handleChange('name')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="address"
                      label="Address"
                      className={'form__input'}
                      value={state.content}
                      onChange={handleChange('address')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="content__en"
                      label="Content in EN"
                      className={'form__input'}
                      value={state.content}
                      onChange={handleChange('content__en')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="content__zh"
                      label="Content in ZH"
                      className={'form__input'}
                      value={state.content}
                      onChange={handleChange('content__zh')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="webUrl"
                      label="webUrl"
                      className={'form__input'}
                      value={state.webUrl}
                      onChange={handleChange('webUrl')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="lat"
                      label="lat"
                      className={'form__input'}
                      value={state.lat}
                      onChange={handleChange('lat')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="lng"
                      label="lng"
                      className={'form__input'}
                      value={state.lng}
                      onChange={handleChange('lng')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="tel"
                      label="Tel"
                      className={'form__input'}
                      value={state.tel}
                      onChange={handleChange('tel')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="contact"
                      label="Contact"
                      className={'form__input'}
                      value={state.contact}
                      onChange={handleChange('contact')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="email"
                      label="Email"
                      className={'form__input'}
                      value={state.email}
                      onChange={handleChange('email')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="opening"
                      label="Opening hours"
                      className={'form__input'}
                      value={state.opening}
                      onChange={handleChange('opening')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="facebook"
                      label="Facebook"
                      className={'form__input'}
                      value={state.facebook}
                      onChange={handleChange('facebook')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="category-simple">Category</InputLabel>
                      <Select
                        value={state.category || ''}
                        onChange={handleChange('category')}
                        inputProps={{
                          name: 'category',
                          id: 'category-simple',
                        }}
                      >
                        {TypeOfCoollection.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="district-simple">District</InputLabel>
                      <Select
                        value={state.district || ''}
                        onChange={handleChange('district')}
                        inputProps={{
                          name: 'district',
                          id: 'district-simple',
                        }}
                      >
                        {DistrictHK.map((district) => (
                          <MenuItem key={district} value={district}>
                            {district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form__input--box">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="select-multiple-chip">Type of Recycle</InputLabel>

                      <Select
                        multiple
                        value={state.recycleBy || []}
                        MenuProps={MenuProps}
                        onChange={handleChange('recycleBy')}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => {
                          return (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          );
                        }}
                      >
                        {TypeRecycling.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, TypeRecycling, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="form__buttons">
                <Link to={'/panel/locations'}>
                  <button className="btn btn-danger">CANCEL</button>
                </Link>
                <button type="submit" className="btn btn-success">
                  ADD LOCATION
                </button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
      <SweetAlert
        show={state.show}
        title="GOOD!"
        text="The link was saved succesfull"
        onConfirm={() => {
          clearState();
          setState({
            ...state,
            show: false,
          });
          props.history.push('/panel/locations');
        }}
      />
      <SweetError
        show={state.hasError}
        title="HEY!"
        type="warning"
        text={state.message}
        onConfirm={() => {
          clearState();
          setState({
            ...state,
            hasError: false,
          });
        }}
      />
    </div>
  );
};

export default withRouter(FormCreateLocation);
