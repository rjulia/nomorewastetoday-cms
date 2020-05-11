import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import { UPDATE_LINK } from '../../services/Mutations/index';
import { Title, UploadCloud } from '../index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormEditLink = ({ link, history, refetch }) => {
  const initialState = {
    link: {
      id: link.id || '',
      title__en: link.title__en || '',
      title__zh: link.title__zh || '',
      url: link.url || '',
      content__en: link.content__en || '',
      content__zh: link.content__zh || '',
      imageUrl: link.imageUrl || '',
      category: link.category || '',
    },
    error: false,
    show: false,
    hasError: false,
  };

  const [values, setValues] = useState(initialState);

  const {
    link: { title__en, title__zh, url, content__en, content__zh, imageUrl, category },
    error,
  } = values;
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );
  return (
    <div className="form__container">
      <Title title={'Edit Link'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={UPDATE_LINK}
          onCompleted={() =>
            setValues({
              ...values,
              show: true,
            })
          }
          onError={() => setValues({ hasError: true })}
        >
          {(uploadLink) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  id,
                  title__en,
                  title__zh,
                  url,
                  content__en,
                  content__zh,
                  imageUrl,
                  category,
                } = values.link;

                setValues({
                  ...values,
                  error: false,
                });
                const input = {
                  id,
                  title__en,
                  title__zh,
                  url,
                  content__en,
                  content__zh,
                  imageUrl,
                  category,
                };
                uploadLink({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <UploadCloud
                      name_folder={'links'}
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
                      id="title__en"
                      label="Title EN"
                      className={'form__input'}
                      value={title__en}
                      onChange={(e) =>
                        setValues({
                          link: {
                            ...values.link,
                            title__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="title__zh"
                      label="Tilte ZH"
                      className={'form__input'}
                      value={title__zh}
                      onChange={(e) =>
                        setValues({
                          link: {
                            ...values.link,
                            title__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="url"
                      label="url"
                      className={'form__input'}
                      value={url}
                      onChange={(e) =>
                        setValues({
                          link: {
                            ...values.link,
                            url: e.target.value,
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
                          link: {
                            ...values.link,
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
                          link: {
                            ...values.link,
                            content__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel htmlFor="acategory-simple">Category</InputLabel>
                      <Select
                        value={category}
                        onChange={(e) =>
                          setValues({
                            link: {
                              ...values.link,
                              category: e.target.value,
                            },
                          })
                        }
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
                  SAVE LINK
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
          refetch().then(() => {
            history.push('/panel/links');
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

export default withRouter(FormEditLink);
