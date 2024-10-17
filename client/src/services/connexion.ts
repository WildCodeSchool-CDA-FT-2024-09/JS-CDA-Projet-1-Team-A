import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiUri = import.meta.env.VITE_API_URI;

const client = new ApolloClient({
  uri: apiUri,
  cache: new InMemoryCache(),
});

export default client;
