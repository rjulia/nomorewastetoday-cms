import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FormCreateShop, Spinner, FormEditShop } from '../../components/index';
import { SHOP_QUERY } from '../../services/Queries';

const PanelShop = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateShop session={session} />
      </div>
    );

  return (
    <div className="col-12">
      <Query query={SHOP_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          return <FormEditShop refetch={refetch} session={session} shop={data.getShop} />;
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelShop);
