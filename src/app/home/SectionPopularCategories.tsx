import React from 'react';
import Link from 'next/link';

const popularCategories = [
  {
    title: 'Plush Toys',
    subtitle: 'Soft hugging friends',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    icon: '🧸',
    href: '/products?category=plush'
  },
  {
    title: 'Arts & Crafts',
    subtitle: 'For little Picassos',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    icon: '🎨',
    href: '/products?category=arts'
  },
  {
    title: 'Educational',
    subtitle: 'Learn while playing',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    icon: '🔬',
    href: '/products?category=educational'
  },
  {
    title: 'Dolls',
    subtitle: 'Playtime adventures',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    icon: '🎀',
    href: '/products?category=dolls'
  }
];

const SectionPopularCategories = () => {
  return (
    <div className="container py-16">
      <div className="text-center mb-12 relative">
        <span className="absolute left-10 top-0 text-3xl opacity-50">✨</span>
        <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">Our Popular Categories</h2>
        <p className="text-neutral-500">Find everything your little one could ever wish for.</p>
        <span className="absolute right-10 bottom-0 text-3xl opacity-50">✨</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {popularCategories.map((cat, index) => (
          <Link href={cat.href} key={index} className={`rounded-3xl p-6 ${cat.bgColor} flex flex-col justify-between h-48 group cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-transparent dark:border-neutral-800`}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-bottom-left">
              {cat.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">{cat.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionPopularCategories;
