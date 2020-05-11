import React from 'react';
import ReactDOM from 'react-dom';
import { RootSession } from './containers/App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
// import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
//import ApolloClient, { InMemoryCache } from "apollo-boost";

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('tokenGraphl');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});
const Uploadlink = createUploadLink({ uri: '/graphql' });

export const client = new ApolloClient({
  link: authLink.concat(Uploadlink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphql', graphQLErrors);
    console.log('networkgraphql', networkError);
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootSession />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
