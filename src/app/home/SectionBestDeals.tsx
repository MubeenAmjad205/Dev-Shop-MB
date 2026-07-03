import React from 'react';

import CountDownTimer from '@/components/CountDownTimer';
import ProductSlider from '@/components/ProductSlider';

const SectionBestDeals = () => {
  return (
    <div className="container">
      <div className="overflow-hidden rounded-[2.5rem] bg-surface dark:bg-neutral-900 shadow-sm p-8 border border-neutral-100 dark:border-neutral-800">
        <div className="mb-8 items-center justify-between space-y-5 md:flex md:space-y-0">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Top Best Deals!</h3>
          <CountDownTimer />
        </div>
        <div className="pb-2">
          <ProductSlider />
        </div>
      </div>
    </div>
  );
};

export default SectionBestDeals;
