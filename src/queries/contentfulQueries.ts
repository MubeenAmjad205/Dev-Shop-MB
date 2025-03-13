import { gql } from '@apollo/client';

export const GET_PRODUCT_GUIDE = gql`
  query GetProductGuide($productId: String!) {
    productGuideCollection(where: { productId: $productId }, limit: 1) {
      items {
        title
        description
        image {
          url
          altText
        }
      }
    }
  }
`;


export const GET_FOOTER_DATA = gql`
  query GetFooterData {
    footerCollection(limit: 1) {
      items {
        description
        footerLinks {
          title
          links {
            name
            href
          }
        }
        socialMediaLinks {
          platform
          href
        }
      }
    }
  }
`;