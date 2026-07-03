import React from 'react';
import Link from 'next/link';

const categories = [
  {
    title: 'Babies',
    age: '0 - 24 Months',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600', // Placeholder
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    btnColor: 'bg-teal-500 hover:bg-teal-600',
    href: '/products?category=babies'
  },
  {
    title: 'Boys',
    age: '2 - 12 Years',
    image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=600', // Placeholder
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    btnColor: 'bg-blue-500 hover:bg-blue-600',
    href: '/products?category=boys'
  },
  {
    title: 'Girls',
    age: '2 - 12 Years',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600', // Placeholder
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    btnColor: 'bg-pink-500 hover:bg-pink-600',
    href: '/products?category=girls'
  }
];

const SectionShopByLittleOne = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3">Shop by Little One</h2>
        <p className="text-neutral-500">Find the perfect toys and care products for every age.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div key={index} className={`rounded-[2.5rem] p-6 pt-10 ${cat.bgColor} flex flex-col items-center text-center group cursor-pointer transition-transform duration-300 hover:-translate-y-2`}>
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-soft group-hover:shadow-lg transition-shadow duration-300">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">{cat.title}</h3>
            <p className="text-neutral-500 mb-6 font-medium">{cat.age}</p>
            <Link href={cat.href} className={`${cat.btnColor} text-white px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 transform group-hover:scale-105`}>
              Explore
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionShopByLittleOne;
