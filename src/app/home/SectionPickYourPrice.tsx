'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, scaleUp } from '@/shared/utils/animations';
import { priceRangeImages } from '@/shared/constants/images';
import config from '@/core/config/global.json';

const currency = config.currency.symbol;

const priceRanges = [
  {
    label: `Under ${currency} 2,000`,
    description: 'Everyday fun & pocket-friendly surprises',
    image: priceRangeImages.under20,
    bgFrom: 'from-[#419ffd]',
    bgTo: 'to-[#2b7dfb]',
    emoji: '💙',
    href: '/products?maxPrice=2000',
  },
  {
    label: `Under ${currency} 5,000`,
    description: 'Perfect gifts that kids will love',
    image: priceRangeImages.under50,
    bgFrom: 'from-[#eb6bf8]',
    bgTo: 'to-[#f84fa3]',
    emoji: '🎀',
    href: '/products?maxPrice=5000',
  },
  {
    label: `Under ${currency} 10,000`,
    description: 'Premium sets & unforgettable playsets',
    image: priceRangeImages.under100,
    bgFrom: 'from-[#55e3a8]',
    bgTo: 'to-[#24c1a5]',
    emoji: '🌟',
    href: '/products?maxPrice=10000',
  },
  {
    label: `Over ${currency} 10,000`,
    description: 'The ultimate luxury experience for kids',
    image: priceRangeImages.over100,
    bgFrom: 'from-[#ff854a]',
    bgTo: 'to-[#ff4c3b]',
    emoji: '👑',
    href: '/products?minPrice=10000',
  },
];

const SectionPickYourPrice = () => {
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
          Budget Finder
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
          Pick Your Price, Find the Fun
        </h2>
        <p className="text-neutral-500 text-lg max-w-md mx-auto">
          Shop by budget — because every child deserves to play, at any price.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
      >
        {priceRanges.map((range, index) => (
          <motion.div key={index} variants={scaleUp} custom={index * 0.08}>
            <Link href={range.href} className="block group h-full">
              <div className={`relative h-72 rounded-[2rem] overflow-hidden bg-gradient-to-br ${range.bgFrom} ${range.bgTo} shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                
                {/* Decorative subtle gradient orb instead of an image */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/5 rounded-full blur-3xl" />

                {/* Price tag */}
                <div className="absolute top-5 left-5 z-10">
                  <div className="bg-white/30 backdrop-blur-md border border-white/40 text-white rounded-2xl px-5 py-2 shadow-sm">
                    <span className="text-lg font-bold">{range.label}</span>
                  </div>
                </div>

                {/* Floating emoji */}
                <div className="absolute top-6 right-6 z-10 text-3xl drop-shadow-md group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  {range.emoji}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-sm flex flex-col justify-between h-24">
                    <p className="text-white text-sm font-semibold leading-tight drop-shadow-sm">
                      {range.description}
                    </p>
                    <div className="flex items-center gap-1 mt-auto text-white text-sm font-bold group-hover:text-white transition-colors">
                      <span>Browse all</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionPickYourPrice;
