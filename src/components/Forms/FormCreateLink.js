import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { Title, UploadCloud } from '../index';
import { NEW_LINK } from '../../services/Mutations/index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormCreateLink = (props) => {
  const initialState = {
    title__en: '',
    title__zh: '',
    url: '',
    content__en: '',
    content__zh: '',
    imageUrl: '',
    category: '',
    message: '',
    error: false,
    show: false,
    hasError: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const { error } = state;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> All fields are required </p>
  ) : (
    ''
  );

  const handleImage = (event) => {
    setState({ ...state, imageUrl: event.url });
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  return (
    <div className="form__container">
      <Title title={'Create Link'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={NEW_LINK}
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
          {(setLink) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  title__en,
                  title__zh,
                  url,
                  content__en,
                  content__zh,
                  imageUrl,
                  category,
                } = state;
                if (title__en === '' || url === '' || category === '') {
                  setState({
                    ...state,
                    error: true,
                  });
                  return;
                }
                setState({
                  ...state,
                  error: false,
                });
                const input = {
                  title__en,
                  title__zh,
                  url,
                  content__en,
                  content__zh,
                  imageUrl,
                  category,
                };
                setLink({
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
                      text_btn={'UPLOAD LOGO'}
                      name_folder={'links'}
                      checkUploadResult={(event) => handleImage(event)}
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="title__en"
                      label="Title En"
                      className={'form__input'}
                      value={state.title__en}
                      onChange={handleChange('title__en')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="title__zh"
                      label="Title En"
                      className={'form__input'}
                      value={state.title__zh}
                      onChange={handleChange('title__zh')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="url"
                      label="url"
                      className={'form__input'}
                      value={state.url}
                      onChange={handleChange('url')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="content__en"
                      label="content__en"
                      className={'form__input'}
                      value={state.content__en}
                      onChange={handleChange('content__en')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="content__zh"
                      label="Content ZH"
                      className={'form__input'}
                      value={state.content__zh}
                      onChange={handleChange('content__zh')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="acategory-simple">Category</InputLabel>
                      <Select
                        value={state.category}
                        onChange={handleChange('category')}
                        inputProps={{
                          name: 'category',
                          id: 'category-simple',
                        }}
                      >
                        <MenuItem value={'ONG'}>ONG</MenuItem>
                        <MenuItem value={'GOVERNMENT'}>GOVERNMENT</MenuItem>
                        <MenuItem value={'PRIVATE'}>PRIVATE COMPANY</MenuItem>
                        <MenuItem value={'SHOP'}>SHOP</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="form__buttons">
                <Link to={'/panel/links'}>
                  <button className="btn btn-danger">CANCEL</button>
                </Link>
                <button type="submit" className="btn btn-success">
                  ADD LINK
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
          props.history.push('/panel/links');
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

export default withRouter(FormCreateLink);
