import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import MdEditor from 'react-markdown-editor-lite';
import { TextField, InputLabel, FormControl } from '@material-ui/core';
import { UPDATE_ADVICE } from '../../services/Mutations/index';
import { Title, UploadCloud, ProductSelect } from '../index';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormEditAdvice = (props) => {
  const initialState = {
    advice: {
      id: props.advice.id,
      title__en: props.advice.title__en || '',
      title__zh: props.advice.title__zh || '',
      statement__en: props.advice.statement__en || '',
      statement__zh: props.advice.statement__zh || '',
      author: props.advice.author || '',

      contentWhy__en: {
        text: props.advice.contentWhy__en.text || '',
        html: props.advice.contentWhy__en.html || '',
      },
      contentWhy__zh: {
        text: props.advice.contentWhy__zh.text || '',
        html: props.advice.contentWhy__zh.html || '',
      },
      contentWhat__en: {
        text: props.advice.contentWhat__en.text || '',
        html: props.advice.contentWhat__en.html || '',
      },
      contentWhat__zh: {
        text: props.advice.contentWhat__zh.text || '',
        html: props.advice.contentWhat__zh.html || '',
      },
      contentHow__en: {
        text: props.advice.contentHow__en.text || '',
        html: props.advice.contentHow__en.html || '',
      },
      contentHow__zh: {
        text: props.advice.contentHow__zh.text || '',
        html: props.advice.contentHow__zh.html || '',
      },

      imageUrlWhy: props.advice.imageUrlWhy || '',
      authorWhy: props.advice.authorWhy || '',
      linkWhy: props.advice.link__yes || '',

      imageUrlWhat: props.advice.imageUrlWhat || '',
      authorWhat: props.advice.authorWhat || '',
      linkWhat: props.advice.linkWhat || '',

      products: props.advice.products || [],
    },
    error: false,
    show: false,
    hasError: false,
  };
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [values, setValues] = useState(initialState);
  const {
    advice: {
      title__en,
      title__zh,
      statement__en,
      statement__zh,
      author,
      contentWhy__en,
      contentWhy__zh,
      contentWhat__en,
      contentWhat__zh,
      contentHow__en,
      contentHow__zh,
      imageUrlWhy,
      authorWhy,
      linkWhy,
      imageUrlWhat,
      authorWhat,
      linkWhat,
      products,
    },
    error,
  } = values;
  const handleProducts = (e, selected) => {
    const idsObj = selected.map((select) => {
      return {
        id: select.id,
      };
    });
    setValues({
      ...values,
      advice: {
        ...values.advice,
        products: idsObj,
      },
    });
  };
  let alert = error ? (
    <p className="alert alert-danger p3 text-center"> You don't have permission to create</p>
  ) : (
    ''
  );
  return (
    <div className="form__container">
      <Title title={'Edit Advice'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={UPDATE_ADVICE}
          onCompleted={() =>
            setValues({
              ...values,
              show: true,
            })
          }
          onError={() =>
            setValues({
              ...values,
              hasError: true,
            })
          }
        >
          {(uploadAdvice) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
                  id,
                  title__en,
                  title__zh,
                  statement__en,
                  statement__zh,
                  author,
                  contentWhy__en,
                  contentWhy__zh,
                  contentWhat__en,
                  contentWhat__zh,
                  contentHow__en,
                  contentHow__zh,
                  imageUrlWhy,
                  authorWhy,
                  linkWhy,
                  imageUrlWhat,
                  authorWhat,
                  linkWhat,
                  date,
                  products,
                } = values.advice;
                setValues({
                  ...values,
                  error: false,
                });
                const input = {
                  id,
                  title__en,
                  title__zh,
                  statement__en,
                  statement__zh,
                  author,
                  contentWhy__en,
                  contentWhy__zh,
                  contentWhat__en,
                  contentWhat__zh,
                  contentHow__en,
                  contentHow__zh,
                  imageUrlWhy,
                  authorWhy,
                  linkWhy,
                  imageUrlWhat,
                  authorWhat,
                  linkWhat,
                  date,
                  products,
                };
                uploadAdvice({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <UploadCloud
                      text_btn={'UPLOAD PHOTO WHY'}
                      name_folder={'advices'}
                      checkUploadResult={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            imageUrlWhy: e.url,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form__input--box">
                    <img className="form__image" src={imageUrlWhy} alt="" />
                  </div>

                  <div className="form__input--box">
                    <UploadCloud
                      name_folder={'advices'}
                      text_btn={'UPLOAD PHOTO WHAT'}
                      checkUploadResult={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            imageUrlWhat: e.url,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form__input--box">
                    <img className="form__image" src={imageUrlWhat} alt="" />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="authorWhy"
                      label="Author Why"
                      className={'form__input'}
                      value={authorWhy}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            authorWhy: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="linkWhy"
                      label="Link Why"
                      className={'form__input'}
                      value={linkWhy}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            linkWhy: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>

                  <div className="form__input--box short">
                    <TextField
                      id="authorWhat"
                      label="Author What"
                      className={'form__input'}
                      value={authorWhat}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            authorWhat: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="linkWhat"
                      label="Link What"
                      className={'form__input'}
                      value={linkWhat}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            linkWhat: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="title__en"
                      label="Title En"
                      className={'form__input'}
                      value={title__en}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            title__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="title__zh"
                      label="Title Zh"
                      className={'form__input'}
                      value={title__zh}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            title__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="author"
                      label="Author"
                      className={'form__input'}
                      value={author}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            author: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="statement__en"
                      label="Statment EN"
                      className={'form__input'}
                      value={statement__en}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            statement__en: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="statement__zh"
                      label="Statement ZH"
                      className={'form__input'}
                      value={statement__zh}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          advice: {
                            ...values.advice,
                            statement__zh: e.target.value,
                          },
                        })
                      }
                      margin="normal"
                    />
                  </div>
                  <ProductSelect onHandleProducts={handleProducts} productsSelect={products} />
                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content Why in Zh</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={contentWhy__en ? contentWhy__en.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(content) =>
                          setValues({
                            ...values,
                            advice: {
                              ...values.advice,
                              contentWhy__en: {
                                html: content.html,
                                text: content.text,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </div>

                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content Why in Zh</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={contentWhy__zh ? contentWhy__zh.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(content) =>
                          setValues({
                            ...values,
                            advice: {
                              ...values.advice,
                              contentWhy__zh: {
                                html: content.html,
                                text: content.text,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content What in Zh</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={contentWhat__en ? contentWhat__en.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(content) =>
                          setValues({
                            ...values,
                            advice: {
                              ...values.advice,
                              contentWhat__en: {
                                html: content.html,
                                text: content.text,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </div>

                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content What in Zh</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={contentWhat__zh ? contentWhat__zh.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(content) =>
                          setValues({
                            ...values,
                            advice: {
                              ...values.advice,
                              contentWhat__zh: {
                                html: content.html,
                                text: content.text,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content How in Zh</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={contentHow__en ? contentHow__en.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(content) =>
                          setValues({
                            ...values,
                            advice: {
                              ...values.advice,
                              contentHow__en: {
                                html: content.html,
                                text: content.text,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </div>

                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content How in Zh</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={contentHow__zh ? contentHow__zh.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={(content) =>
                          setValues({
                            ...values,
                            advice: {
                              ...values.advice,
                              contentHow__zh: {
                                html: content.html,
                                text: content.text,
                              },
                            },
                          })
                        }
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="form__buttons">
                <Link to={'/panel/advices'}>
                  <button className="btn btn-danger">CANCEL</button>
                </Link>
                <button type="submit" className="btn btn-success">
                  SAVE ADVICE
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
            props.history.push('/panel/advices');
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

export default withRouter(FormEditAdvice);
