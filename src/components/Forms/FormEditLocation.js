import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { TypeRecycling, DistrictHK, TypeOfCoollection } from '../../utils/Constants';
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
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { UPDATE_LOCATION } from '../../services/Mutations/index';
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

const FormEditLocation = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    locationPoint: {
      id: props.locationPoint.id,
      name: props.locationPoint.name || '',
      content__en: props.locationPoint.content__en || '',
      content__zh: props.locationPoint.content__zh || '',
      address: props.locationPoint.address || '',
      imageUrl: props.locationPoint.imageUrl || '',
      webUrl: props.locationPoint.webUrl || '',
      lat: props.locationPoint.lat || '',
      lng: props.locationPoint.lng || '',
      tel: props.locationPoint.tel || '',
      contact: props.locationPoint.contact || '',
      email: props.locationPoint.email || '',
      opening: props.locationPoint.opening || '',
      facebook: props.locationPoint.facebook || '',
      recycleBy: props.locationPoint.recycleBy || [],
      district: props.locationPoint.district || '',
      category: props.locationPoint.category || '',
    },
    error: false,
    show: false,
    hasError: false,
  };
  const [values, setValues] = useState(initialState);

  const {
    locationPoint: {
      name,
      content__en,
      content__zh,
      address,
      imageUrl,
      webUrl,
      lat,
      lng,
      category,
      district,
      recycleBy,
      tel,
      contact,
      email,
      opening,
      facebook,
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
          mutation={UPDATE_LOCATION}
          onCompleted={() => {
            setValues({
              ...values,
              show: true,
            });
          }}
          onError={() => setValues({ hasError: true })}
        >
          {(uploadLocation) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  id,
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
                  district,
                  category,
                } = values.locationPoint;

                setValues({
                  ...values,
                  error: false,
                });
                const input = {
                  id,
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
                  district,
                  category,
                };

                uploadLocation({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <UploadCloud
                      name_folder={'locations'}
                      checkUploadResult={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            imageUrl: e.url,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form__input--box">
                    <img className="form__image" src={imageUrl} alt="" />
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
                          locationPoint: {
                            ...values.locationPoint,
                            name: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="address"
                      label="Address"
                      className={'form__input'}
                      value={address}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            address: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="content__en"
                      label="Content in EN"
                      className={'form__input'}
                      value={content__en}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            content__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="content__zh"
                      label="Content in ZH"
                      className={'form__input'}
                      value={content__zh}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            content__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="webUrl"
                      label="webUrl"
                      className={'form__input'}
                      value={webUrl}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            webUrl: e.target.value,
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
                          locationPoint: {
                            ...values.locationPoint,
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
                          locationPoint: {
                            ...values.locationPoint,
                            lng: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="tel"
                      label="tel"
                      className={'form__input'}
                      value={tel}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            tel: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="contact"
                      label="contact"
                      className={'form__input'}
                      value={contact}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            contact: e.target.value,
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
                          locationPoint: {
                            ...values.locationPoint,
                            email: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="opening"
                      label="opening"
                      className={'form__input'}
                      value={opening}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            opening: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="facebook"
                      label="facebook"
                      className={'form__input'}
                      value={facebook}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          locationPoint: {
                            ...values.locationPoint,
                            facebook: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="category-simple">Category</InputLabel>
                      <Select
                        value={category}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            locationPoint: {
                              ...values.locationPoint,
                              category: e.target.value,
                            },
                          })
                        }
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
                        value={district}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            locationPoint: {
                              ...values.locationPoint,
                              district: e.target.value,
                            },
                          })
                        }
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
                        value={recycleBy || []}
                        MenuProps={MenuProps}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            locationPoint: {
                              ...values.locationPoint,
                              recycleBy: e.target.value,
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
                        {TypeRecycling.map((type) => (
                          <MenuItem
                            key={type}
                            value={type}
                            style={getStyles(type, TypeRecycling, theme)}
                          >
                            {type}
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
                  EDIT LOCATION
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
            props.history.push('/panel/locations');
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

export default withRouter(FormEditLocation);
