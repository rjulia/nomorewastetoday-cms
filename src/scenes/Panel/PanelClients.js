import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { DELETE_CLIENT } from '../../services/Mutations';
import gql from 'graphql-tag';
import { Spinner } from '../../components/index';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import swal from 'sweetalert2';
import './Panel.scss';

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const CreateClient = () => (
  <div className="col-12 createclient__container">
    <h4>YOU DON'T HAVE ANY CLIENT YET</h4>
    <p>Do you want to create one</p>
    <Button variant="contained" color="primary" component={AdapterLink} to="/panel/client">
      Create
    </Button>
  </div>
);

const columsFields = [
  { title: 'Name', field: 'name' },
  { title: 'Surname', field: 'surname' },
  { title: 'Type', field: 'type' },
  { title: 'Company', field: 'company' },
  { title: 'Years', field: 'years', type: 'numeric' },
];

const PanelClients = (props) => {
  const GoPage = (id) => {
    props.history.push(`/panel/client/${id}`);
  };
  const refreshHandel = (refetch) => {
    if (refetch) {
      refetch();
    }
  };
  useEffect(() => refreshHandel(), []);

  return (
    <div className="col-12">
      <Query query={CLIENTS_QUERY}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          const clients = data.getClients;
          if (clients.length === 0) return <CreateClient />;
          refreshHandel(refetch);
          return (
            <Mutation mutation={DELETE_CLIENT}>
              {(deleteClient) => (
                <MaterialTable
                  title="Clients"
                  columns={columsFields}
                  data={clients}
                  options={{
                    pageSize: 10,
                    pageSizeOptions: [10, 50, 100],
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
                      onClick: (event) => props.history.push(`/panel/client`),
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
                      onClick: (event, rowData) => {
                        const { id } = rowData;
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
                              deleteClient({
                                variables: { id },
                                refetchQueries: [{ query: CLIENTS_QUERY }],
                              });
                              swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                            }
                          });
                      },
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

const CLIENTS_QUERY = gql`
  query GetClientsQuery {
    getClients {
      id
      name
      surname
      type
      company
      years
    }
  }
`;

export default PanelClients;
