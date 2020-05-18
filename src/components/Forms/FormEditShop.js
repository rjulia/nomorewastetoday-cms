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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { UPDATE_SHOP } from '../../services/Mutations/index';
import { TypeOfShopCatagory, ShopRate } from '../../utils/Constants';
import { Title, UploadCloud } from '../index';
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

const FormEditShop = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    shop: {
      id: props.shop.id,
      name: props.shop.name || '',
      address: props.shop.address || '',
      phone: props.shop.phone || '',
      email: props.shop.email || '',
      webUrl: props.shop.webUrl || '',
      facebook: props.shop.facebook || '',
      instagram: props.shop.instagram || '',
      lng: props.shop.lng || '',
      lat: props.shop.lat || '',
      promoded: props.shop.promoded || false,
      imageUrl: props.shop.imageUrl || '',
      thumbnail: props.shop.thumbnail || '',
      description: props.shop.description || '',
      rate: props.shop.rate || 0,
      plasticfree: props.shop.plasticfree || 0,
      category: props.shop.category || [],
    },
    error: false,
    show: false,
    hasError: false,
  };

  const [values, setValues] = useState(initialState);
  const {
    shop: {
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
      description,
      rate,
      plasticfree,
      category,
    },
    error,
  } = values;

  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );
  return (
    <div className="form__container">
      <Title title={'Edit Location'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={UPDATE_SHOP}
          onCompleted={() => {
            setValues({
              ...values,
              show: true,
            });
          }}
          onError={(error) => {
            setValues({
              ...values,
              hasError: true,
            });
          }}
        >
          {(uploadShop) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  id,
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
                } = values.shop;

                setValues({
                  ...values,
                  error: false,
                });
                const input = {
                  id,
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
                uploadShop({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <UploadCloud
                      name_folder={'shops'}
                      checkUploadResult={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            imageUrl: e.url,
                            thumbnail: e.thumbnail_url,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form__input--box">
                    <img className="form__image" src={imageUrl} alt="" />
                  </div>
                  <div className="form__input--box large">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={promoded}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              shop: {
                                ...values.shop,
                                promoded: e.target.checked,
                              },
                            })
                          }
                          value={promoded}
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
                      value={name}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            name: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box medium">
                    <TextField
                      id="address"
                      label="Address"
                      className={'form__input'}
                      value={address}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            address: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="phone"
                      label="Phone"
                      className={'form__input'}
                      value={phone}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            phone: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="email"
                      label="email"
                      className={'form__input'}
                      value={email}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            email: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="webUrl"
                      label="Web"
                      className={'form__input'}
                      value={webUrl}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            webUrl: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="facebook"
                      label="Facebook"
                      className={'form__input'}
                      value={facebook}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            facebook: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="instagram"
                      label="Instagram"
                      className={'form__input'}
                      value={instagram}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            instagram: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="lat"
                      label="lat"
                      className={'form__input'}
                      value={lat}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            lat: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="lng"
                      label="lng"
                      className={'form__input'}
                      value={lng}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            lng: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short"></div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="rate-simple">Rate</InputLabel>
                      <Select
                        value={rate}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            shop: {
                              ...values.shop,
                              rate: e.target.value,
                            },
                          })
                        }
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
                      <InputLabel htmlFor="district-simple">Plastic Free</InputLabel>
                      <Select
                        value={plasticfree}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            shop: {
                              ...values.shop,
                              plasticfree: e.target.value,
                            },
                          })
                        }
                      >
                        {ShopRate.map((plasticfree) => (
                          <MenuItem key={plasticfree} value={plasticfree}>
                            {plasticfree}
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
                        value={category || []}
                        MenuProps={MenuProps}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            shop: {
                              ...values.shop,
                              category: e.target.value,
                            },
                          })
                        }
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
                      value={description}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          shop: {
                            ...values.shop,
                            description: e.target.value,
                          },
                        })
                      }
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
                  EDIT SHOPS
                </button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
      <SweetAlert
        show={values.show}
        title="GOOD!"
        text="The link was saved succesfull"
        onConfirm={() => {
          setValues({
            ...values,
            show: false,
          });
          props.refetch().then(() => {
            props.history.push('/panel/shops');
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

export default withRouter(FormEditShop);
