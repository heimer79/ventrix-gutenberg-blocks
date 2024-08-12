import { ApolloClient, InMemoryCache } from '@apollo/client'; // Import Apollo Client and InMemoryCache from Apollo Client package

export const client = new ApolloClient({
    uri: '/graphql', // Set the URI for the GraphQL endpoint. Replace with the correct endpoint URI for your server
    cache: new InMemoryCache(), // Initialize a new in-memory cache to store query results and manage cache normalization
});
