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

export const GET_FOOTER_DESCRIPTION = gql`
  query GetFooterDescription {
    footerDescriptionCollection(limit: 1) {
      items {
        description
      }
    }
  }
`;

export const GET_FOOTER_LINKS = gql`
  query GetFooterLinks {
    footerLinksCollection {
      items {
        link
        url
      }
    }
  }
`;



export const GET_BLOG_HEADING = gql`
  query GetBlogHeading {
    blogHeadingCollection(limit: 1) {
      items {
        title
        description
      }
    }
  }
`;

export const GET_FAQ_PAGE = gql`
  query GetFAQPage {
    faqPageCollection(limit: 1) {
      items {
        heading
        description
        faqCategoriesCollection {
          items {
            category
            faQsCollection {
              items {
                question
                answer
              }
            }
          }
        }
      }
    }
  }
`;