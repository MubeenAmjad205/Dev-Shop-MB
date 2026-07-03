import { gql } from '@apollo/client';

export const GET_ADMIN_PRODUCTS = gql`
  query GetAdminProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          status
          totalInventory
          vendor
          productType
          featuredImage {
            url
            altText
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price
                inventoryQuantity
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

export const UPDATE_PRODUCT_VARIANT_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      productVariant {
        id
        price
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const INVENTORY_ADJUST_QUANTITY = gql`
  mutation inventoryAdjustQuantities($input: InventoryAdjustQuantitiesInput!) {
    inventoryAdjustQuantities(input: $input) {
      inventoryAdjustmentGroup {
        reason
        changes {
          name
          delta
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;
