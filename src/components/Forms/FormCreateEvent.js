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
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Title, UploadCloud } from '../index';
import { NEW_EVENT } from '../../services/Mutations/index';
import { filterByCatagory, typeOfState } from '../../utils/Constants';
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

const FormCreateEvent = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const initialState = {
    title: '',
    content__en: '',
    content__zh: '',
    place: '',
    lng: '',
    lat: '',
    imageUrl: '',
    webUrl: '',
    date: '',
    email: '',
    facebook: '',
    recomendations: '',
    category: [],
    stateEvent: '',
    message: '',
    error: false,
    empty: false,
    show: false,
    hasError: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (name) => (event) => {
    if (name === 'date') {
      setState({ ...state, [name]: event });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
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

  const clearState = () => {
    setState({ ...initialState });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="form__container">
        <Title title={'Create Event'} heading={4} addClass={'form__title'} />
        {alert}
        <div className="form__box">
          <Mutation
            mutation={NEW_EVENT}
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
            {(setEvent) => (
              <form
                noValidate
                autoComplete="off"
                onSubmit={(event) => {
                  event.preventDefault();
                  const {
                    title,
                    place,
                    content__en,
                    content__zh,
                    imageUrl,
                    webUrl,
                    date,
                    lng,
                    lat,
                    email,
                    facebook,
                    recomendations,
                    category,
                    stateEvent,
                  } = state;

                  if (title === '' || place === '' || date === '') {
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
                    title,
                    place,
                    content__en,
                    content__zh,
                    imageUrl,
                    webUrl,
                    date,
                    lat: Number(lat),
                    lng: Number(lng),
                    email,
                    facebook,
                    recomendations,
                    category,
                    stateEvent,
                  };

                  setEvent({
                    variables: { input },
                  });
                }}
              >
                <div className="form__input--box">
                  <div className="form_imput--boxotherinputs">
                    <div className="form__input--box">
                      <UploadCloud
                        name_folder={'events'}
                        checkUploadResult={(event) => handleImage(event)}
                      />
                    </div>
                    <div className="form__input--box">
                      <img className="form__image" src={state.imageUrl} alt="" />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="title"
                        label="Title"
                        className={'form__input'}
                        value={state.title}
                        onChange={handleChange('title')}
                        margin="normal"
                      />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="place"
                        label="Place"
                        className={'form__input'}
                        value={state.place}
                        onChange={handleChange('place')}
                        margin="normal"
                      />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="content__en"
                        label="Content in ES"
                        className={'form__input'}
                        value={state.content__en}
                        onChange={handleChange('content__en')}
                        margin="normal"
                      />
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="content__zh"
                        label="Content in ZH"
                        className={'form__input'}
                        value={state.content__zh}
                        onChange={handleChange('content__zh')}
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
                        id="webUrl"
                        label="Website Url"
                        className={'form__input'}
                        value={state.webUrl}
                        onChange={handleChange('webUrl')}
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
                        id="facebook"
                        label="Facebook"
                        className={'form__input'}
                        value={state.facebook}
                        onChange={handleChange('facebook')}
                        margin="normal"
                      />
                    </div>

                    <div className="form__input--box short">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date"
                        label="Date event"
                        format="MM/dd/yyyy"
                        value={state.date || new Date()}
                        onChange={handleChange('date')}
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
                    <div className="form__input--box short">
                      <FormControl className={'form__input form__input--select'}>
                        <InputLabel htmlFor="category-simple">State of Event</InputLabel>
                        <Select
                          value={state.stateEvent}
                          onChange={handleChange('stateEvent')}
                          inputProps={{
                            name: 'stateEvent',
                            id: 'category-simple',
                          }}
                        >
                          {typeOfState.map((stateE) => (
                            <MenuItem key={stateE.value} value={stateE.value}>
                              {stateE.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="form__input--box">
                      <TextField
                        id="recomendations"
                        label="Recomendations for the event"
                        className={'form__input'}
                        value={state.recomendations}
                        onChange={handleChange('recomendations')}
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
                    ADD EVENT
                  </button>
                </div>
              </form>
            )}
          </Mutation>
        </div>
        <SweetAlert
          show={state.show}
          title="GOOD!"
          text="The Event was saved succesfull"
          onConfirm={() => {
            clearState();
            setState({ show: false });
            props.history.push('/panel/events');
          }}
        />
        <SweetError
          show={state.hasError}
          title="HEY!"
          type="warning"
          text={state.message}
          onConfirm={() => {
            setState({
              ...state,
              hasError: false,
            });
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default withRouter(FormCreateEvent);
