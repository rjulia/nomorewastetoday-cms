import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FormCreateEvent, Spinner, FormEditEvent } from '../../components/index';
import { EVENT_QUERY } from '../../services/Queries';

const PanelEvent = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateEvent session={session} />
      </div>
    );

  return (
    <div className="col-12">
      <Query query={EVENT_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          return <FormEditEvent refetch={refetch} session={session} event={data.getEvent} />;
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelEvent);
