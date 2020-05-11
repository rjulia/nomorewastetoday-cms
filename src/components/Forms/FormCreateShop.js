import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Input,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Title, UploadCloud } from '../index';
import { TypeOfShopCatagory, ShopRate } from '../../utils/Constants';
import { NEW_SHOP } from '../../services/Mutations/index';
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

function getStyles(name, filterByCatagory, theme) {
  return {
    fontWeight:
      filterByCatagory.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const FormCreateShop = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    name: '',
    address: '',
    phone: '',
    email: '',
    webUrl: '',
    facebook: '',
    instagram: '',
    lng: '',
    lat: '',
    promoded: false,
    imageUrl: '',
    thumbnail: '',
    description: '',
    rate: 0,
    plasticfree: 0,
    category: [],
    message: '',
    error: false,
    show: false,
    hasError: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (name) => (event) => {
    if (name === 'promoded') {
      setState({ ...state, [name]: event.target.checked });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const handleImage = (event) => {
    setState({ ...state, imageUrl: event.url, thumbnail: event.thumbnail_url });
  };
  const { error } = state;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );

  const clearState = () => {
    setState({ ...initialState });
  };

  return (
    <div className="form__container">
      <Title title={'Create Shop'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={NEW_SHOP}
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
          {(setShop) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  name,
                  address,
                  phone,
                  email,
                  webUrl,
                  facebook,
                  instagram,
                  lng,
                  lat,
                  promoded,
                  imageUrl,
                  thumbnail,
                  description,
                  rate,
                  plasticfree,
                  category,
                } = state;

                if (name === '' || address === '') {
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
                  address,
                  phone,
                  email,
                  webUrl,
                  facebook,
                  instagram,
                  lat: Number(lat),
                  lng: Number(lng),
                  promoded,
                  imageUrl,
                  thumbnail,
                  description,
                  rate: Number(rate),
                  plasticfree: Number(plasticfree),
                  category,
                };

                setShop({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <img className="form__image" src={state.imageUrl} alt="" />
                  </div>
                  <div className="form__input--box ">
                    <UploadCloud
                      name_folder={'shops'}
                      checkUploadResult={(event) => handleImage(event)}
                    />
                  </div>

                  <div className="form__input--box large">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.promoded}
                          onChange={handleChange('promoded')}
                          value={state.promoded}
                          color="primary"
                        />
                      }
                      label="Promoded"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="name"
                      label="Name"
                      className={'form__input'}
                      value={state.name}
                      onChange={handleChange('name')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box medium">
                    <TextField
                      id="address"
                      label="Address"
                      className={'form__input'}
                      value={state.address}
                      onChange={handleChange('address')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="phone"
                      label="Phone"
                      className={'form__input'}
                      value={state.phone}
                      onChange={handleChange('phone')}
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
                      id="webUrl"
                      label="Web"
                      className={'form__input'}
                      value={state.webUrl}
                      onChange={handleChange('webUrl')}
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
                    <TextField
                      id="instagram"
                      label="Instagram"
                      className={'form__input'}
                      value={state.instagram}
                      onChange={handleChange('instagram')}
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
                  <div className="form__input--box short"></div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="rate-simple">Rate</InputLabel>
                      <Select
                        value={state.rate || 0}
                        onChange={handleChange('rate')}
                        inputProps={{
                          name: 'rate',
                          id: 'rate-simple',
                        }}
                      >
                        {ShopRate.map((rate) => (
                          <MenuItem key={rate} value={rate}>
                            {rate}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="rate-simple">Plastic Free</InputLabel>
                      <Select
                        value={state.plasticfree || 0}
                        onChange={handleChange('plasticfree')}
                        inputProps={{
                          name: 'plasticfree',
                          id: 'plasticfree-simple',
                        }}
                      >
                        {ShopRate.map((plasticfree) => (
                          <MenuItem key={plasticfree} value={plasticfree}>
                            {plasticfree}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="select-multiple-chip">Type of Shop</InputLabel>

                      <Select
                        multiple
                        value={state.category || []}
                        MenuProps={MenuProps}
                        onChange={handleChange('category')}
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
                        {TypeOfShopCatagory.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, TypeOfShopCatagory, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form__input--box">
                    <TextField
                      id="description"
                      label="description"
                      rows="4"
                      multiline
                      rowsMax="4"
                      className={'form__input'}
                      value={state.description}
                      onChange={handleChange('description')}
                      margin="normal"
                    />
                  </div>
                </div>
              </div>

              <div className="form__buttons">
                <Link to={'/panel/shops'}>
                  <button className="btn btn-danger">CANCEL</button>
                </Link>
                <button type="submit" className="btn btn-success">
                  ADD SHOP
                </button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
      <SweetAlert
        show={state.show}
        title="GOOD!"
        text="The Shop was saved succesfull"
        onConfirm={() => {
          clearState();
          setState({ show: false });
          props.history.push('/panel/shops');
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

export default withRouter(FormCreateShop);
