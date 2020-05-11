import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const link = createUploadLink({ uri: '/graphql' });

export const client = new ApolloClient({
  link,
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    const token = localStorage.getItem('tokenGraphl');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  cache: new InMemoryCache({
    addTypename: true,
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphql', graphQLErrors);
    console.log('networkgraphql', networkError);
  },
});
