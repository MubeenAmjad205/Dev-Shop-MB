'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { gql, useQuery } from '@apollo/client';
import { contentfulClient } from '@/lib/contentfulGraphQL';
import Heading from '@/shared/Heading/Heading';
import FAQtab from './FAQtab';
import Loading from '../loading';

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

const FAQPage = () => {
  const { data, loading, error } = useQuery(GET_FAQ_PAGE, {
    client: contentfulClient,
  });

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading FAQ: {error.message}
      </div>
    );

  // Directly access the first FAQ page item from the collection.
  const faqData = data?.faqPageCollection?.items[0];

  if (!faqData) return <div>No FAQ data available.</div>;

  return (
    <div className="container mb-32 mt-16">
      <Heading desc={faqData.description} isCenter isMain>
        {faqData.heading}
      </Heading>
      <motion.div
        initial={{ opacity: 0, y: '50%' }}
        whileInView={{ opacity: 1, y: '0%' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <FAQtab categories={faqData?.faqCategoriesCollection?.items} />
      </motion.div>
    </div>
  );
};

export default FAQPage;
