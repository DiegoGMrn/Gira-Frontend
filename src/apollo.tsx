import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://172.29.16.1:4000/graphql',
    cache: new InMemoryCache(),
  });

  export default client;