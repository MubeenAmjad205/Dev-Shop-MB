'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/shared/Heading/Heading';
import FAQtab from './FAQtab';
import { faqsData } from '@/data/content';

const FAQPage = () => {
  return (
    <div className="container mb-32 mt-16">
      <Heading desc={faqsData.description} isCenter isMain>
        {faqsData.heading}
      </Heading>
      <motion.div
        initial={{ opacity: 0, y: '50%' }}
        whileInView={{ opacity: 1, y: '0%' }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <FAQtab categories={faqsData.faqs} />
      </motion.div>
    </div>
  );
};

export default FAQPage;
