import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// This client must ONLY be used in Server Components or API Routes.
// Never expose SHOPIFY_ADMIN_ACCESS_TOKEN to the client.
const shopifyAdminClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-01/graphql.json`,
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
      "Content-Type": "application/json",
    },
    // We use node-fetch under the hood in Next.js 14+ server side automatically
  }),
  cache: new InMemoryCache(),
});

export default shopifyAdminClient;
