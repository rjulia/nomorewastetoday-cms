import React, { useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import { PRODUCTS_QUERY } from '../../services/Queries';
import { TypeOfProducts } from '../../utils/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 16,
  },
}));

const ProductSelect = ({ onHandleProducts, client, productsSelect, edit }) => {
  const [products, setProducts] = useState([]);
  const [productsAreSelect, setProductsAreSelect] = useState([]);
  const [typeOfProduct, setTypeOfProduct] = useState(undefined);
  const classes = useStyles();

  const getProducts = (e) => {
    setTypeOfProduct(e.target.value);
  };

  useEffect(() => {
    client
      .query({
        query: PRODUCTS_QUERY,
        variables: { category: typeOfProduct },
      })
      .then((data) => setProducts(data.data.getProducts));
  }, [typeOfProduct, client]);

  useEffect(() => {
    if (edit) {
      const OnProductsSelects = products.filter(function (el) {
        return productsSelect.indexOf(el.id);
      });
      const productssss = OnProductsSelects.map((e) => e.name__en);

      setProductsAreSelect(productssss);
    }
  }, [products, productsSelect, edit]);

  return (
    <>
      <div className="form__input--box">
        <FormControl className={'form__input form__input--select'}>
          <InputLabel htmlFor="typeOfProduct">Type of Product</InputLabel>
          <Select
            value={typeOfProduct || ''}
            onChange={(e) => getProducts(e)}
            inputProps={{
              name: 'typeOfProduct',
              id: 'typeOfProduct',
            }}
          >
            {TypeOfProducts.map((typeProduct) => (
              <MenuItem key={typeProduct.value} value={typeProduct.value}>
                {typeProduct.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={`form__input--box ${classes.root}`}>
        {products && (
          <Autocomplete
            multiple
            id="tags-standard"
            options={products}
            defaultValue={productsAreSelect || []}
            onChange={onHandleProducts}
            getOptionLabel={(option) => option.name__en}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Products" placeholder="Favorites" />
            )}
          />
        )}
      </div>
    </>
  );
};

export default withApollo(ProductSelect);
