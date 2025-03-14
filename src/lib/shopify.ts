import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL}/api/2023-04/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    "Content-Type": "application/json",
  },
});

export { client, gql };




export const getProducts = async (first: number = 10, after?: string) => {
  const GET_PRODUCTS_QUERY = gql`
    query getProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  const { data } = await client.query({
    query: GET_PRODUCTS_QUERY,
    variables: { first, after },
  });
  // Return the products object containing edges and pageInfo.
  return data.products;
};
  