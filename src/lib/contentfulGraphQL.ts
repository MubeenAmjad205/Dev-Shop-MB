import { ApolloClient, InMemoryCache } from '@apollo/client';

export const contentfulClient = new ApolloClient({
  uri:`${process.env.NEXT_PUBLIC_CONTENTFUL_GRAPHQL_ENDPOINT}`, 
  headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
    cache: new InMemoryCache(),
});
