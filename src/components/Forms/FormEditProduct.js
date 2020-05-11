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
import { UPDATE_PRODUCT } from '../../services/Mutations/index';
import { TypeOfProducts } from '../../utils/Constants';
import { Title, UploadCloud } from '../index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormEditProduct = (props) => {
  const initialState = {
    product: {
      id: props.product.id,
      name__en: props.product.name__en || '',
      name__zh: props.product.name__zh || '',
      price: props.product.price || '',
      link: props.product.link || '',
      newness: props.product.newness || false,
      imageUrl: props.product.imageUrl || '',
      description__en: props.product.description__en || '',
      description__zh: props.product.description__zh || '',
      brand: props.product.brand || '',
      category: props.product.category || '',
    },
    error: false,
    show: false,
    hasError: false,
  };
  const [values, setValues] = useState(initialState);

  const {
    product: {
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
          mutation={UPDATE_PRODUCT}
          onCompleted={() => {
            setValues({
              ...values,
              show: true,
            });
          }}
          onError={() =>
            setValues({
              ...values,
              hasError: true,
            })
          }
        >
          {(uploadProduct) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  id,
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
                } = values.product;

                setValues({
                  ...values,
                  error: false,
                });
                const input = {
                  id,
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

                uploadProduct({
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
                        checked={newness}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            product: {
                              ...values.product,
                              newness: e.target.checked,
                            },
                          })
                        }
                        value={newness}
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
                    <UploadCloud
                      name_folder={'locations'}
                      checkUploadResult={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
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
                      id="name__en"
                      label="Name EN"
                      className={'form__input'}
                      value={name__en}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            name__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="name__zh"
                      label="Name ZH"
                      className={'form__input'}
                      value={name__zh}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            name__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="price"
                      label="Price"
                      className={'form__input'}
                      value={price}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            price: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="brand"
                      label="Brand"
                      className={'form__input'}
                      value={brand}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            content__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="description__en"
                      label="Description in EN"
                      className={'form__input'}
                      value={description__en}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            description__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="description__zh"
                      label="Description in ZH"
                      className={'form__input'}
                      value={description__zh}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            description__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="link"
                      label="Link"
                      className={'form__input'}
                      value={link}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          product: {
                            ...values.product,
                            link: e.target.value,
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
                            product: {
                              ...values.product,
                              category: e.target.value,
                            },
                          })
                        }
                      >
                        {TypeOfProducts.map((procutType) => (
                          <MenuItem key={procutType.value} value={procutType.value}>
                            {procutType.name}
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
                  EDIT PRODUCT
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
            props.history.push('/panel/products');
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

export default withRouter(FormEditProduct);
