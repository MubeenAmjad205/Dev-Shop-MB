import { ApolloClient, InMemoryCache, } from '@apollo/client';
const shopifyClient = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL}/api/2023-04/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    "Content-Type": "application/json",
  },
});

export default shopifyClient;
