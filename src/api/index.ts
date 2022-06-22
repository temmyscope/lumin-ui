import { ApolloClient, InMemoryCache } from "@apollo/client";

const GraphqlClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT, cache: new InMemoryCache()
});


export { GraphqlClient }