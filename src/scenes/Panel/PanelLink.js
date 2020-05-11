import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FormCreateLink, Spinner, FormEditLink } from '../../components/index';
import { LINK_QUERY } from '../../services/Queries';

const PanelLink = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateLink session={session} />
      </div>
    );

  return (
    <div className="col-12">
      <Query query={LINK_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          return <FormEditLink refetch={refetch} session={session} link={data.getLink} />;
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelLink);
