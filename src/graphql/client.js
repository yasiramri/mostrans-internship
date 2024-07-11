import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql", // URL endpoint GraphQL
  }),
  cache: new InMemoryCache(),
});

export default client;
