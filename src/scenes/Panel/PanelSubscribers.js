import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { SUBSCRIBERS_QUERY } from '../../services/Queries';
import { DELETE_SHOP } from '../../services/Mutations';
import moment from 'moment';
import { Spinner } from '../../components/index';
import MaterialTable from 'material-table';
import './Panel.scss';

const PanelSubscribers = (props) => {
  return (
    <div className="col-12">
      <Query query={SUBSCRIBERS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;

          const emails = data.getEmailCampaing.map((email) => {
            return {
              ...email,
              timestamp_opt: moment(email.timestamp_opt).format('MM/DD/YYYY'),
            };
          });
          return (
            <Mutation mutation={DELETE_SHOP}>
              {(deleteLocation) => (
                <MaterialTable
                  title="SHOPS"
                  columns={[
                    { title: 'EMAIL', field: 'email_address' },
                    { title: 'status', field: 'status' },
                    { title: 'Create', field: 'timestamp_opt' },
                  ]}
                  data={emails}
                  options={{
                    pageSize: 100,
                    pageSizeOptions: [100, 200, 500],
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
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    </div>
  );
};

export default PanelSubscribers;
