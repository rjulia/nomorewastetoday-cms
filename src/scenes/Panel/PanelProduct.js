import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { FormCreateProduct, Spinner, FormEditProduct } from '../../components/index';
import { PRODUCT_QUERY } from '../../services/Queries';

const PanelProduct = ({ session, match }) => {
  const { id } = match.params;
  if (id === undefined)
    return (
      <div className="col-12">
        <FormCreateProduct session={session} />
      </div>
    );

  return (
    <div className="col-12">
      <Query query={PRODUCT_QUERY} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Spinner color={'#18BC9C'} />;
          if (error) return `Error: ${error.message}`;
          console.log(data);
          return <FormEditProduct refetch={refetch} session={session} product={data.getProduct} />;
        }}
      </Query>
    </div>
  );
};

export default withRouter(PanelProduct);
