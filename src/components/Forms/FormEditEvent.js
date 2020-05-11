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
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { UPDATE_EVENT } from '../../services/Mutations/index';
import { Title, UploadCloud } from '../index';
import { filterByCatagory } from '../../utils/Constants';
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

const FormEditEvent = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    event: {
      id: props.event.id,
      title: props.event.title || '',
      content__en: props.event.content__en || '',
      content__zh: props.event.content__zh || '',
      place: props.event.place || '',
      lat: props.event.lat || '',
      lng: props.event.lng || '',
      imageUrl: props.event.imageUrl || '',
      webUrl: props.event.webUrl || '',
      date: props.event.date || '',
      email: props.event.email || '',
      facebook: props.event.facebook || '',
      recomendations: props.event.recomendations || '',
      category: props.event.category || [],
    },
    error: false,
    show: false,
    hasError: false,
  };
  const [values, setValues] = useState(initialState);

  const {
    event: {
      title,
      place,
      content__zh,
      content__en,
      date,
      imageUrl,
      webUrl,
      lat,
      lng,
      email,
      category,
      facebook,
      recomendations,
    },
    error,
  } = values;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="form__container">
        <Title title={'Edit Event'} heading={4} addClass={'form__title'} />
        {alert}
        <div className="form__box">
          <Mutation
            mutation={UPDATE_EVENT}
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
                    title,
                    place,
                    content__zh,
                    content__en,
                    date,
                    imageUrl,
                    webUrl,
                    lat,
                    lng,
                    email,
                    category,
                    facebook,
                    recomendations,
                  } = values.event;

                  setValues({
                    ...values,
                    error: false,
                  });
                  const input = {
                    id,
                    title,
                    place,
                    content__zh,
                    content__en,
                    date,
                    imageUrl,
                    webUrl,
                    lat: Number(lat),
                    lng: Number(lng),
                    email,
                    category,
                    facebook,
                    recomendations,
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
                        name_folder={'events'}
                        checkUploadResult={(e) =>
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
                              imageUrl: e.url,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="form__input--box">
                      <img className="form__image" src={imageUrl} alt="" />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="title"
                        label="Title"
                        className={'form__input'}
                        value={title}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
                              title: e.target.value,
                            },
                          })
                        }
                        margin="normal"
                      />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="place"
                        label="place"
                        className={'form__input'}
                        value={place}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
                              place: e.target.value,
                            },
                          })
                        }
                        margin="normal"
                      />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="content__en"
                        label="Content in En"
                        className={'form__input'}
                        value={content__en}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
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
                        label="Content in Zh"
                        className={'form__input'}
                        value={content__zh}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
                              content__zh: e.target.value,
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
                            event: {
                              ...values.event,
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
                            event: {
                              ...values.event,
                              lng: e.target.value,
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
                            event: {
                              ...values.event,
                              webUrl: e.target.value,
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
                            event: {
                              ...values.event,
                              email: e.target.value,
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
                            event: {
                              ...values.event,
                              facebook: e.target.value,
                            },
                          })
                        }
                        margin="normal"
                      />
                    </div>

                    <div className="form__input--box short">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date"
                        label="Date event"
                        format="MM/dd/yyyy"
                        value={date}
                        onChange={(e) => {
                          console.log(e);
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
                              date: e,
                            },
                          });
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </div>

                    <div className="form__input--box short">
                      <FormControl className={'form__input form__input--select'}>
                        <InputLabel htmlFor="select-multiple-chip">Type of Event</InputLabel>
                        <Select
                          multiple
                          value={category}
                          MenuProps={MenuProps}
                          input={<Input id="select-multiple-chip" />}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              event: {
                                ...values.event,
                                category: e.target.value,
                              },
                            })
                          }
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
                          {filterByCatagory.map((name) => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={getStyles(name, filterByCatagory, theme)}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="recomendations"
                        label="recomendations"
                        className={'form__input'}
                        value={recomendations}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            event: {
                              ...values.event,
                              recomendations: e.target.value,
                            },
                          })
                        }
                        margin="normal"
                      />
                    </div>
                  </div>
                </div>

                <div className="form__buttons">
                  <Link to={'/panel/events'}>
                    <button className="btn btn-danger">CANCEL</button>
                  </Link>
                  <button type="submit" className="btn btn-success">
                    EDIT EVENT
                  </button>
                </div>
              </form>
            )}
          </Mutation>
        </div>
        <SweetAlert
          show={values.show}
          title="GOOD!"
          text="The Event was saved succesfull"
          onConfirm={() => {
            setValues({
              ...values,
              show: false,
            });
            props.refetch().then(() => {
              props.history.push('/panel/events');
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
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(FormEditEvent);
