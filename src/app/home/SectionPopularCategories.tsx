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
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    ringColor: 'ring-amber-200 dark:ring-amber-700',
    accentText: 'text-amber-600 dark:text-amber-400',
    href: '/products?category=plush',
  },
  {
    title: 'Arts & Crafts',
    subtitle: 'Unleash the inner artist',
    emoji: '🎨',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    ringColor: 'ring-blue-200 dark:ring-blue-700',
    accentText: 'text-blue-600 dark:text-blue-400',
    href: '/products?category=arts',
  },
  {
    title: 'Educational',
    subtitle: 'Learn while having fun',
    emoji: '🔬',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    ringColor: 'ring-teal-200 dark:ring-teal-700',
    accentText: 'text-teal-600 dark:text-teal-400',
    href: '/products?category=educational',
  },
  {
    title: 'Dolls & Figures',
    subtitle: 'Adventures in imagination',
    emoji: '🎀',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    ringColor: 'ring-pink-200 dark:ring-pink-700',
    accentText: 'text-pink-600 dark:text-pink-400',
    href: '/products?category=dolls',
  },
  {
    title: 'Outdoor Play',
    subtitle: 'Fun under the open sky',
    emoji: '⚽',
    bg: 'bg-green-50 dark:bg-green-900/20',
    ringColor: 'ring-green-200 dark:ring-green-700',
    accentText: 'text-green-600 dark:text-green-400',
    href: '/products?category=outdoor',
  },
  {
    title: 'Building Sets',
    subtitle: 'Design, build, create',
    emoji: '🧱',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    ringColor: 'ring-orange-200 dark:ring-orange-700',
    accentText: 'text-orange-600 dark:text-orange-400',
    href: '/products?category=building',
  },
  {
    title: 'Puzzles',
    subtitle: 'Challenge the young mind',
    emoji: '🧩',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    ringColor: 'ring-violet-200 dark:ring-violet-700',
    accentText: 'text-violet-600 dark:text-violet-400',
    href: '/products?category=puzzles',
  },
  {
    title: 'Baby Care',
    subtitle: 'Safe essentials for little ones',
    emoji: '🍼',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    ringColor: 'ring-cyan-200 dark:ring-cyan-700',
    accentText: 'text-cyan-600 dark:text-cyan-400',
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
              <div className={`${cat.bg} ring-2 ${cat.ringColor} rounded-3xl p-6 flex flex-col gap-4 transition-all duration-400 group-hover:-translate-y-2 group-hover:shadow-xl`}>
                <div className="w-16 h-16 bg-white dark:bg-neutral-900 rounded-2xl shadow-md flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {cat.emoji}
                </div>
                <div>
                  <h3 className={`font-bold text-lg text-neutral-900 dark:text-white group-hover:${cat.accentText} transition-colors`}>
                    {cat.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1 leading-snug">{cat.subtitle}</p>
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
