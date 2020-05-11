import React, { Fragment } from 'react';
import { Infocard } from '../../components';

const PanelHome = () => {
  return (
    <Fragment>
      <Infocard title="Capacity" data="150GB" icon="nc-globe" info="Update Now" />
      <Infocard title="Revenue" data="$ 1,345" icon="nc-money-coins" info="Last day" />
      <Infocard title="Errors" data="23" icon="nc-vector" info="UIn the last month" />
      <Infocard title="Followers" data="+45K" icon="nc-favourite-28" info="Update Now" />
    </Fragment>
  );
};

export default PanelHome;
