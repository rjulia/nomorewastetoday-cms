import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { TextField, FormControl, InputLabel } from '@material-ui/core';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { withSwalInstance } from 'sweetalert2-react';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import swal from 'sweetalert2';
import { Title, UploadCloud, ProductSelect } from '../index';
import { NEW_ADVICE } from '../../services/Mutations';
import './Forms.scss';

const SweetAlert = withSwalInstance(swal);
const SweetError = withSwalInstance(swal);

const FormCreateAdvice = (props) => {
  const initialState = {
    title__en: '',
    title__zh: '',
    statement__en: '',
    statement__zh: '',
    author: '',
    contentWhy__en: {
      html: '',
      text: '',
    },
    contentWhy__zh: {
      html: '',
      text: '',
    },
    contentWhat__en: {
      html: '',
      text: '',
    },
    contentWhat__zh: {
      html: '',
      text: '',
    },
    contentHow__en: {
      html: '',
      text: '',
    },
    contentHow__zh: {
      html: '',
      text: '',
    },
    imageUrlWhy: '',
    authorWhy: '',
    linkWhy: '',
    imageUrlWhat: '',
    authorWhat: '',
    linkWhat: '',
    products: [],
    typeOfProduct: '',
    message: '',
    error: false,
    show: false,
    hasError: false,
  };
  const [state, setState] = useState(initialState);
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const handleProducts = (e, selected) => {
    const idsObj = selected.map((select) => {
      return {
        id: select.id,
      };
    });
    setState({ ...state, products: idsObj });
  };

  const handleChange = (name) => (event) => {
    if (
      name === 'contentWhy__en' ||
      name === 'contentWhy__zh' ||
      name === 'contentWhat__en' ||
      name === 'contentWhat__zh' ||
      name === 'contentHow__en' ||
      name === 'contentHow__zh'
    ) {
      setState({
        ...state,
        [name]: {
          html: event.html,
          text: event.text,
        },
      });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const handleImage = (event, type) => {
    if (type === 'why') {
      setState({
        ...state,
        imageUrlWhy: event.url,
      });
    } else {
      setState({
        ...state,
        imageUrlWhat: event.url,
      });
    }
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
      <Title title={'Create Advice'} heading={4} addClass={'form__title'} />
      {alert}
      <div className="form__box">
        <Mutation
          mutation={NEW_ADVICE}
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
          {(setAdvice) => (
            <form
              noValidate
              autoComplete="off"
              onSubmit={(event) => {
                event.preventDefault();
                const {
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
                } = state;
                if (title__en === '' || statement__en === '') {
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
                setAdvice({
                  variables: { input },
                });
              }}
            >
              <div className="form__input--box">
                <div className="form_imput--boxotherinputs">
                  <div className="form__input--box">
                    <img className="form__image" src={state.imageUrl__yes} alt="" />
                  </div>
                  <div className="form__input--box ">
                    <UploadCloud
                      text_btn={'UPLOAD PHOTO WHY'}
                      name_folder={'advices'}
                      checkUploadResult={(event) => handleImage(event, 'why')}
                    />
                  </div>
                  <div className="form__input--box">
                    <img className="form__image" src={state.imageUrl__no} alt="" />
                  </div>
                  <div className="form__input--box ">
                    <UploadCloud
                      text_btn={'UPLOAD PHOTO WHAT'}
                      name_folder={'advices'}
                      checkUploadResult={(event) => handleImage(event, 'what')}
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="authorWhy"
                      label="Author photo Why"
                      className={'form__input'}
                      value={state.authorWhy}
                      onChange={handleChange('authorWhy')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="linkWhy"
                      label="Link photo Why"
                      className={'form__input'}
                      value={state.linkWhy}
                      onChange={handleChange('linkWhy')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="authorWhat"
                      label="Author photo What"
                      className={'form__input'}
                      value={state.authorWhat}
                      onChange={handleChange('authorWhat')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="linkWhat"
                      label="Link photo What"
                      className={'form__input'}
                      value={state.linkWhat}
                      onChange={handleChange('linkWhat')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="title__en"
                      label="Title EN"
                      className={'form__input'}
                      value={state.title__en}
                      onChange={handleChange('title__en')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="title__zh"
                      label="Title ZH"
                      className={'form__input'}
                      value={state.title__zh}
                      onChange={handleChange('title__zh')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box short">
                    <TextField
                      id="author"
                      label="Author"
                      className={'form__input'}
                      value={state.author}
                      onChange={handleChange('author')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="statement__en"
                      label="Statment EN"
                      className={'form__input'}
                      value={state.statement__en}
                      onChange={handleChange('statement__en')}
                      margin="normal"
                    />
                  </div>
                  <div className="form__input--box">
                    <TextField
                      id="statement__zh"
                      label="Statement ZH"
                      className={'form__input'}
                      value={state.statement__zh}
                      onChange={handleChange('statement__zh')}
                      margin="normal"
                    />
                  </div>

                  <ProductSelect onHandleProducts={handleProducts} />

                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content Why in EN</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={state.contentWhy__en ? state.contentWhy__en.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleChange('contentWhy__en')}
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content Why in Zh</InputLabel>
                      <MdEditor
                        id={'textarea_1'}
                        value={state.contentWhy__zh ? state.contentWhy__zh.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleChange('contentWhy__zh')}
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content What in EN</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={state.contentWhat__en ? state.contentWhat__en.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleChange('contentWhat__en')}
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content What in Zh</InputLabel>
                      <MdEditor
                        id={'textarea_1'}
                        value={state.contentWhat__zh ? state.contentWhat__zh.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleChange('contentWhat__zh')}
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box large m-15">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content How in EN</InputLabel>
                      <MdEditor
                        class={'markdown__editor'}
                        value={state.contentHow__en ? state.contentHow__en.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleChange('contentHow__en')}
                      />
                    </FormControl>
                  </div>
                  <div className="form__input--box">
                    <FormControl className={'form__input form__input--select'}>
                      <InputLabel className={'form__label'}>Content How in Zh</InputLabel>
                      <MdEditor
                        id={'textarea_1'}
                        value={state.contentHow__zh ? state.contentHow__zh.text : ''}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleChange('contentHow__zh')}
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
                  ADD ADVICE
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
          setState({
            ...state,
            show: false,
          });
          props.history.push('/panel/advices');
        }}
      />
      <SweetError
        show={state.hasError}
        title="HEY!"
        type="warning"
        text="Something happend in Data Base"
        onConfirm={() => {
          setState({
            ...state,
            hasError: false,
          });
        }}
      />
    </div>
  );
};

export default withRouter(FormCreateAdvice);
