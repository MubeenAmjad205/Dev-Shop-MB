'use client';

import React, { useState, useEffect } from 'react';
import Accordion from '@/components/Accordion';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  faQsCollection?: {
    items?: FAQItem[];
  };
}

interface FAQTabProps {
  categories: FAQCategory[];
}

const FAQtab: React.FC<FAQTabProps> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<string>(categories?.[0]?.category || '');

  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveTab(categories[0]?.category || 'shipping');
    }
  }, [categories]);

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-5">
        {categories.map((faqCategory) => (
          <ButtonSecondary
            key={faqCategory.category}
            className={`rounded-lg ${activeTab === faqCategory.category
                ? 'bg-primary text-white'
                : 'bg-neutral-300 text-black dark:bg-neutral-100'
              }`}
            sizeClass="px-5 py-3"
            onClick={() => setActiveTab(faqCategory.category)}
          >
            {faqCategory.category}
          </ButtonSecondary>
        ))}
      </div>

      <div className="flex items-center justify-center p-5 md:p-10">
        {categories.map((faqCategory) => (
          <div
            key={faqCategory.category}
            className={`${activeTab === faqCategory.category ? 'block' : 'hidden'
              } max-w-3xl space-y-10`}
          >
            {faqCategory.faQsCollection?.items?.map((faqItem, index) => (
              <Accordion key={`${faqItem.question}-${index}`} {...faqItem} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQtab;
