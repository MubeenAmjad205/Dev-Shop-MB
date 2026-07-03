'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, scaleUp, fadeUp } from '@/shared/utils/animations';
import { categoryImages } from '@/shared/constants/images';

const categories = [
  {
    title: 'Babies',
    age: '0 – 24 Months',
    image: categoryImages.babies,
    bgFrom: 'from-emerald-50',
    bgTo: 'to-teal-100',
    darkBg: 'dark:from-teal-900/30 dark:to-emerald-900/20',
    accentColor: 'bg-teal-500',
    textAccent: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-100 dark:bg-teal-900/40',
    ringColor: 'ring-teal-200 dark:ring-teal-700',
    floatingEmoji: '🌿',
    href: '/products?category=babies',
  },
  {
    title: 'Boys',
    age: '2 – 12 Years',
    image: categoryImages.boys,
    bgFrom: 'from-blue-50',
    bgTo: 'to-indigo-100',
    darkBg: 'dark:from-blue-900/30 dark:to-indigo-900/20',
    accentColor: 'bg-blue-500',
    textAccent: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    ringColor: 'ring-blue-200 dark:ring-blue-700',
    floatingEmoji: '🚀',
    href: '/products?category=boys',
  },
  {
    title: 'Girls',
    age: '2 – 12 Years',
    image: categoryImages.girls,
    bgFrom: 'from-pink-50',
    bgTo: 'to-rose-100',
    darkBg: 'dark:from-pink-900/30 dark:to-rose-900/20',
    accentColor: 'bg-pink-500',
    textAccent: 'text-pink-600 dark:text-pink-400',
    badgeBg: 'bg-pink-100 dark:bg-pink-900/40',
    ringColor: 'ring-pink-200 dark:ring-pink-700',
    floatingEmoji: '🦋',
    href: '/products?category=girls',
  },
];

const SectionShopByLittleOne = () => {
  return (
    <div className="container py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="text-center mb-14"
      >
        <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-widest mb-4">
          Shop by Age
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
          Shop by Little One
        </h2>
        <p className="text-neutral-500 text-lg max-w-md mx-auto">
          Curated toys and care products tailored to every stage of childhood.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        {categories.map((cat, index) => (
          <motion.div key={index} variants={scaleUp} custom={index * 0.1}>
            <Link href={cat.href} className="block group">
              <div className={`relative rounded-[2.5rem] bg-gradient-to-b ${cat.bgFrom} ${cat.bgTo} ${cat.darkBg} overflow-hidden border border-white/80 dark:border-neutral-700 shadow-lg transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl`}>
                
                {/* Floating emoji badge */}
                <div className="absolute top-5 right-5 z-10 text-3xl drop-shadow-md animate-bounce">
                  {cat.floatingEmoji}
                </div>

                {/* High quality image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Soft overlay fade */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.bgFrom} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>

                {/* Card footer */}
                <div className="p-6 pt-5">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${cat.badgeBg} ${cat.textAccent} mb-3`}>
                    {cat.age}
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {cat.title}
                    </h3>
                    <div className={`w-10 h-10 ${cat.accentColor} rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm mt-2 font-medium">
                    Shop the collection →
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionShopByLittleOne;
