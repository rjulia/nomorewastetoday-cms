import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { PRODUCTS_QUERY } from '../../services/Queries';
import { DELETE_PRODUCT } from '../../services/Mutations';

import { Spinner } from '../../components/index';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import swal from 'sweetalert2';
import './Panel.scss';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const CreateLink = () => (
  <div className="col-12 createclient__container">
    <h4>YOU DON'T HAVE ANY PRODUCT YET</h4>
    <p>Do you want to create one</p>
    <Button variant="contained" color="primary" component={AdapterLink} to="/panel/product">
      Create
    </Button>
  </div>
);

const deleteItem = (event, rowData, deleteLocation, user) => {
  const { id } = rowData;
  if (user !== 'ADMIN') {
    swal.fire({
      title: 'You can delete',
      text: "You don't have permision to delete",
      type: 'warning',
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonColor: '#FFA59E',
      cancelButtonColor: '#E0522D',
    });
  } else {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFA59E',
        cancelButtonColor: '#E0522D',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
          deleteLocation({ variables: { id }, refetchQueries: [{ query: PRODUCTS_QUERY }] });
          swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
  }
};

const PanelProducts = (props) => {
  const userRole = props.session.getUser.rol;
  const [user] = useState(userRole);
  const GoPage = (id) => {
    props.history.push(`/panel/product/${id}`);
  };

  return (
    <div className="col-12">
      <Query query={PRODUCTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          const products = data.getProducts;
          if (products.length === 0) return <CreateLink />;
          return (
            <Mutation mutation={DELETE_PRODUCT}>
              {(deleteLocation) => (
                <MaterialTable
                  title="Products"
                  columns={[
                    { title: 'Name', field: 'name__en' },
                    { title: 'Category', field: 'category' },
                    { title: 'Brrans', field: 'brand' },
                    { title: 'Price', field: 'price' },
                    { title: 'Newless', field: 'newless' },
                  ]}
                  data={products}
                  options={{
                    pageSize: 50,
                    pageSizeOptions: [50, 100, 200],
                    actionsColumnIndex: -1,
                    headerStyle: {
                      fontWeight: 'bold',
                      color: '#FFA59E',
                      fontSize: '16px',
                    },
                    rowStyle: (rowData) => ({
                      backgroundColor: rowData.tableData.id % 2 ? '#EBEBEB' : '#FFF',
                    }),
                  }}
                  actions={[
                    {
                      icon: 'add',
                      tooltip: 'Add User',
                      iconProps: { color: 'primary' },
                      isFreeAction: true,
                      onClick: (event) => props.history.push(`/panel/product`),
                    },

                    {
                      icon: 'edit',
                      iconProps: { color: 'primary' },
                      tooltip: 'Edit User',
                      onClick: (event, rowData) => GoPage(rowData.id),
                    },
                    (rowData) => ({
                      icon: 'delete',
                      iconProps: { color: 'error' },
                      tooltip: 'Delete user',
                      onClick: (event, rowData) => deleteItem(event, rowData, deleteLocation, user),
                    }),
                  ]}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    </div>
  );
};

export default PanelProducts;
