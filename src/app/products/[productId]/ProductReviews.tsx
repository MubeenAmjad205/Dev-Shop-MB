import React from 'react';
import { MdStar } from 'react-icons/md';

const ProductReviews = ({ rating, reviews }: { rating: string | number; reviews: number }) => {
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews ({reviews})</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 bg-neutral-50 dark:bg-neutral-800/50 p-8 rounded-2xl border border-neutral-100 dark:border-neutral-800">
          <div className="flex items-end gap-3 mb-4">
            <span className="text-6xl font-bold">{rating}</span>
            <span className="text-neutral-500 mb-2 font-medium">out of 5</span>
          </div>
          <div className="flex items-center text-yellow-400 text-2xl mb-8">
            <MdStar /><MdStar /><MdStar /><MdStar /><MdStar />
          </div>
          <div className="space-y-4 text-sm font-medium">
            {[ {s: 5, p: 85}, {s: 4, p: 10}, {s: 3, p: 3}, {s: 2, p: 1}, {s: 1, p: 1} ].map((bar) => (
              <div key={bar.s} className="flex items-center gap-4">
                <span className="w-14 text-neutral-600 dark:text-neutral-400">{bar.s} Stars</span>
                <div className="flex-1 h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${bar.p}%` }}></div>
                </div>
                <span className="w-10 text-right text-neutral-500">{bar.p}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 space-y-8">
          {/* Review 1 */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-lg">S</div>
                <div>
                  <p className="font-semibold text-lg">Sarah Jenkins <span className="text-xs text-green-500 ml-2 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">✓ Verified</span></p>
                  <p className="text-sm text-neutral-500 mt-0.5">2 days ago</p>
                </div>
              </div>
              <div className="flex text-yellow-400 text-lg"><MdStar /><MdStar /><MdStar /><MdStar /><MdStar /></div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">Absolutely amazing quality! My kids haven't stopped playing with it since it arrived. The attention to detail is fantastic and it feels very safe and durable. Definitely purchasing from here again.</p>
          </div>
          {/* Review 2 */}
          <div className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary text-lg">M</div>
                <div>
                  <p className="font-semibold text-lg">Mike R. <span className="text-xs text-green-500 ml-2 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">✓ Verified</span></p>
                  <p className="text-sm text-neutral-500 mt-0.5">1 week ago</p>
                </div>
              </div>
              <div className="flex text-yellow-400 text-lg"><MdStar /><MdStar /><MdStar /><MdStar /><MdStar /></div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">Worth every penny. Shipping was incredibly fast and the packaging was completely pristine. Highly recommend this store for anyone looking for reliable products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
