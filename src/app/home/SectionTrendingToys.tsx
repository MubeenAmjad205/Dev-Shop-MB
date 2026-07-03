import React from 'react';
import ProductSlider from '@/components/ProductSlider';

const SectionTrendingToys = ({ heading = "Trending Toys Right Now", subHeading = "See what everyone is playing with" }) => {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">{heading}</h2>
          <p className="text-neutral-500 font-medium">{subHeading}</p>
        </div>
        <div className="flex gap-2">
           <button className="px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
             View All
           </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
        <ProductSlider />
      </div>
    </div>
  );
};

export default SectionTrendingToys;
