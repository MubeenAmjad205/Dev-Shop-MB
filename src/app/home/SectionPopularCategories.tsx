'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, scaleUp } from '@/shared/utils/animations';

const popularCategories = [
  {
    title: 'Plush Toys',
    subtitle: 'Cuddly companions for every night',
    emoji: '🧸',
    bg: 'bg-[#fffdf2]',
    borderColor: 'border-[#fde68a]',
    href: '/products?category=plush',
  },
  {
    title: 'Arts & Crafts',
    subtitle: 'Unleash the inner artist',
    emoji: '🎨',
    bg: 'bg-[#f0f7ff]',
    borderColor: 'border-[#bfdbfe]',
    href: '/products?category=arts',
  },
  {
    title: 'Educational',
    subtitle: 'Learn while having fun',
    emoji: '🔬',
    bg: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    href: '/products?category=educational',
  },
  {
    title: 'Dolls & Figures',
    subtitle: 'Adventures in imagination',
    emoji: '🎀',
    bg: 'bg-[#fdf2f8]',
    borderColor: 'border-[#fbcfe8]',
    href: '/products?category=dolls',
  },
  {
    title: 'Outdoor Play',
    subtitle: 'Fun under the open sky',
    emoji: '⚽',
    bg: 'bg-[#f0fdf4]',
    borderColor: 'border-[#bbf7d0]',
    href: '/products?category=outdoor',
  },
  {
    title: 'Building Sets',
    subtitle: 'Design, build, create',
    emoji: '🧱',
    bg: 'bg-[#fff7ed]',
    borderColor: 'border-[#fed7aa]',
    href: '/products?category=building',
  },
  {
    title: 'Puzzles',
    subtitle: 'Challenge the young mind',
    emoji: '🧩',
    bg: 'bg-[#faf5ff]',
    borderColor: 'border-[#e9d5ff]',
    href: '/products?category=puzzles',
  },
  {
    title: 'Baby Care',
    subtitle: 'Safe essentials for little ones',
    emoji: '🍼',
    bg: 'bg-[#ecfeff]',
    borderColor: 'border-[#a5f3fc]',
    href: '/products?category=care',
  },
];

const SectionPopularCategories = () => {
  return (
    <div className="container py-20">
      <motion.div
        className="text-center mb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-widest mb-4">
          Browse Categories
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
          Our Popular Categories
        </h2>
        <p className="text-neutral-500 text-lg max-w-md mx-auto">
          Everything your little one could ever wish for, organised just for you.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {popularCategories.map((cat, index) => (
          <motion.div key={index} variants={scaleUp} custom={index * 0.06}>
            <Link href={cat.href} className="block group">
              <div className={`${cat.bg} border ${cat.borderColor} rounded-[1.5rem] p-5 md:p-6 flex flex-col gap-5 transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)]`}>
                <div className="w-[3.5rem] h-[3.5rem] bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-1">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-neutral-500 font-medium">{cat.subtitle}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionPopularCategories;
