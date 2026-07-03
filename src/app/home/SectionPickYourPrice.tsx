import React from 'react';
import Link from 'next/link';

const priceRanges = [
  {
    title: 'Under $20',
    description: 'Affordable fun for everyday play',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    tagColor: 'bg-blue-500 text-white',
    href: '/products?maxPrice=20'
  },
  {
    title: 'Under $50',
    description: 'Great gifts and learning toys',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    tagColor: 'bg-pink-500 text-white',
    href: '/products?maxPrice=50'
  },
  {
    title: 'Under $100',
    description: 'Premium sets and big smiles',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    tagColor: 'bg-teal-500 text-white',
    href: '/products?maxPrice=100'
  },
  {
    title: 'Over $100',
    description: 'The ultimate luxury playtime',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    tagColor: 'bg-orange-500 text-white',
    href: '/products?minPrice=100'
  }
];

const SectionPickYourPrice = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3">Pick Your Price, Find the Fun</h2>
        <p className="text-neutral-500">Shop by budget to find exactly what you need.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {priceRanges.map((range, index) => (
          <Link href={range.href} key={index} className={`rounded-3xl p-6 ${range.bgColor} flex flex-col justify-between items-center text-center group cursor-pointer transition-transform duration-300 hover:-translate-y-2 border border-transparent dark:border-neutral-800`}>
            <div className="space-y-4 mb-8">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${range.tagColor}`}>
                {range.title}
              </span>
              <p className="text-neutral-700 dark:text-neutral-300 font-medium px-4">{range.description}</p>
            </div>
            
            {/* Placeholder for illustration */}
            <div className="w-32 h-32 bg-white/50 dark:bg-black/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-soft">
               <span className="text-4xl text-neutral-300">🎁</span>
            </div>
            
            <div className="mt-8 font-bold text-neutral-900 dark:text-white group-hover:text-primary transition-colors">
              Shop Now &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionPickYourPrice;
