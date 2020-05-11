import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';


const closeSessionUser = (client, history) => {
  // delete token
  localStorage.removeItem('tokenGraphl', '');
  // desloguear user
  client.resetStore();
  // redirect
  history.push('/login');
}

const CloseSession = ({ history, model }) => (
  <ApolloConsumer>
    {client => {


      if (model === "button") {

        return <Button
          onClick={() => closeSessionUser(client, history)}
          variant="contained"
          color="primary">Sign Out</Button>

      } else {
        return <div onClick={() => closeSessionUser(client, history)} className="nav-link btn-rotate" >
          <i className="material-icons">exit_to_app</i>
        </div>
      }


    }}

  </ApolloConsumer>

)

export default withRouter(CloseSession);