import React from 'react';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { Spinner, FormEditClient, FormCreateClient } from '../../components/index';

import { CLIENT_QUERY } from '../../services/Queries/index';

const PanelClient = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateClient session={session} />
      </div>
    );
  return (
    <div className="col-12">
      <Query query={CLIENT_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          return <FormEditClient refetch={refetch} session={session} client={data.getClient} />;
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelClient);
