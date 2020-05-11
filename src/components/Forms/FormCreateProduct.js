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
  FormGroup,
  FormControlLabel,
  Switch,
  Select,
} from '@material-ui/core';
import { NEW_PRODUCT } from '../../services/Mutations/index';
import { TypeOfProducts } from '../../utils/Constants';
import { Title, UploadCloud } from '../index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormCreateProduct = (props) => {
  const initialState = {
    name__en: '',
    name__zh: '',
    price: '',
    link: '',
    newness: false,
    imageUrl: '',
    description__en: '',
    description__zh: '',
    brand: '',
    category: '',
    error: false,
    show: false,
    hasError: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (name) => (event) => {
    if (name === 'newness') {
      setState({ ...state, [name]: event.target.checked });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const handleImage = (event) => {
    setState({ ...state, imageUrl: event.url });
  };

  const { error } = state;
  let respuesta = error ? (
    <p className="alert alert-danger p3 text-center"> all fields are required</p>
  ) : (
    ''
  );

  const clearState = () => {
    setState({ ...initialState });
  };

  return (
    <div className="form__container">
      <Title title={'Create Product'} heading={4} addClass={'form__title'} />
      {respuesta}
      <div className="form__box">
        <Mutation
          mutation={NEW_PRODUCT}
          onCompleted={() =>
            setState({
              ...state,
              show: true,
            })
          }
          onError={() =>
            setState({
              ...state,
              hasError: true,
            })
          }
        >
          {(setProduct) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  name__en,
                  name__zh,
                  price,
                  link,
                  newness,
                  imageUrl,
                  description__en,
                  description__zh,
                  brand,
                  category,
                } = state;
                if (name__en === '' || price === '' || category === '') {
                  setState({
                    error: true,
                  });
                  return;
                }
                setState({
                  error: false,
                });
                const input = {
                  name__en,
                  name__zh,
                  price: Number(price),
                  link,
                  newness,
                  imageUrl,
                  description__en,
                  description__zh,
                  brand,
                  category,
                };
                setProduct({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box newness">
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        id="newness"
                        checked={state.newness}
                        onChange={handleChange('newness')}
                        value={state.newness}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    }
                    label="Newness"
                  />
                </FormGroup>
              </div>

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
                  <div className="form__input--box short">
                    <TextField
                      id="name__en"
                      label="Name in EN"
                      className={'form__input'}
                      value={state.name__en}
                      onChange={handleChange('name__en')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="name__zh"
                      label="Name in ZH"
                      className={'form__input'}
                      value={state.name__zh}
                      onChange={handleChange('name__zh')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="price"
                      label="Price"
                      className={'form__input'}
                      value={state.price}
                      onChange={handleChange('price')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="brand"
                      label="Brand"
                      className={'form__input'}
                      value={state.brand}
                      onChange={handleChange('brand')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box">
                    <TextField
                      id="description__en"
                      label="Description in EN"
                      className={'form__input'}
                      value={state.description__en}
                      onChange={handleChange('description__en')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="description__zh"
                      label="Description in ZH"
                      className={'form__input'}
                      value={state.description__zh}
                      onChange={handleChange('description__zh')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box ">
                    <TextField
                      id="link"
                      label="Link"
                      className={'form__input'}
                      value={state.link}
                      onChange={handleChange('link')}
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box">
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
                        {TypeOfProducts.map((product) => (
                          <MenuItem key={product.value} value={product.value}>
                            {product.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>

              <div className="form__buttons">
                <Link to={'/panel/products'}>
                  <button className="btn btn-danger">CANCEL</button>
                </Link>
                <button type="submit" className="btn btn-success">
                  ADD PRODUCT
                </button>
              </div>
            </form>
          )}
        </Mutation>
      </div>
      <SweetAlert
        show={state.show}
        title="GOOD!"
        text="The client was saved succesfull"
        onConfirm={() => {
          clearState();
          setState({ show: false });
          props.history.push('/panel/products');
        }}
      />
      <SweetError
        show={state.hasError}
        title="HEY!"
        type="warning"
        text="Something happend in Data Base"
        onConfirm={() => {
          clearState();
          setState({ hasError: false });
        }}
      />
    </div>
  );
};

export default withRouter(FormCreateProduct);
