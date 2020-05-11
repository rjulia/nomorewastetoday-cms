import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FormCreateAdvice, Spinner, FormEditAdvice } from '../../components/index';
import { ADVICE_QUERY } from '../../services/Queries';

const PanelAdvice = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateAdvice session={session} />
      </div>
    );
  return (
    <div className="col-12">
      <Query query={ADVICE_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          return <FormEditAdvice refetch={refetch} session={session} advice={data.getAdvice} />;
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelAdvice);
