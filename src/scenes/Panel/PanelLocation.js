import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FormCreateLocation, Spinner, FormEditLocation } from '../../components/index';
import { LOCATION_QUERY } from '../../services/Queries';

const PanelLocation = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateLocation session={session} />
      </div>
    );

  return (
    <div className="col-12">
      <Query query={LOCATION_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          return (
            <FormEditLocation
              refetch={refetch}
              session={session}
              locationPoint={data.getLocation}
            />
          );
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelLocation);
