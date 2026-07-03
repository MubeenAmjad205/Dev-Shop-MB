import React from 'react';

const ProductFeatures = () => {
  return (
    <div className="mt-28 space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-video relative flex items-center justify-center shadow-inner">
           <svg className="w-24 h-24 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-6 tracking-tight">Premium Quality Materials</h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">Built to last through years of play. We source only the finest, most durable materials to ensure your purchase stays beautiful and functional long after it arrives. Say goodbye to cheap plastics and hello to premium craftsmanship.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="order-2 md:order-1">
          <h3 className="text-3xl font-bold mb-6 tracking-tight">100% Child Safe & Non-Toxic</h3>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">Safety is our absolute #1 priority. This product has been rigorously tested and certified to exceed global safety standards. Free from BPA, phthalates, and lead, so you can have complete peace of mind.</p>
        </div>
        <div className="order-1 md:order-2 rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 aspect-video relative flex items-center justify-center shadow-inner">
           <svg className="w-24 h-24 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
