'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, scaleUp } from '@/shared/utils/animations';
import { priceRangeImages } from '@/shared/constants/images';

const priceRanges = [
  {
    label: 'Under $20',
    description: 'Everyday fun & pocket-friendly surprises',
    image: priceRangeImages.under20,
    bgFrom: 'from-sky-400',
    bgTo: 'to-blue-500',
    emoji: '💙',
    href: '/products?maxPrice=20',
  },
  {
    label: 'Under $50',
    description: 'Perfect gifts that kids will love',
    image: priceRangeImages.under50,
    bgFrom: 'from-fuchsia-400',
    bgTo: 'to-pink-500',
    emoji: '🎀',
    href: '/products?maxPrice=50',
  },
  {
    label: 'Under $100',
    description: 'Premium sets & unforgettable playsets',
    image: priceRangeImages.under100,
    bgFrom: 'from-emerald-400',
    bgTo: 'to-teal-500',
    emoji: '🌟',
    href: '/products?maxPrice=100',
  },
  {
    label: 'Over $100',
    description: 'The ultimate luxury experience for kids',
    image: priceRangeImages.over100,
    bgFrom: 'from-orange-400',
    bgTo: 'to-primary',
    emoji: '👑',
    href: '/products?minPrice=100',
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
              <div className={`relative h-72 rounded-3xl overflow-hidden bg-gradient-to-b ${range.bgFrom} ${range.bgTo} shadow-lg transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl`}>
                {/* Background image with overlay */}
                <Image
                  src={range.image}
                  alt={range.label}
                  fill
                  className="object-cover mix-blend-overlay opacity-30 transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Price tag */}
                <div className="absolute top-5 left-5 z-10">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl px-4 py-2 shadow-lg">
                    <span className="text-lg font-extrabold drop-shadow">{range.label}</span>
                  </div>
                </div>

                {/* Floating emoji */}
                <div className="absolute top-4 right-4 z-10 text-4xl drop-shadow-lg group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300">
                  {range.emoji}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <p className="text-white text-sm font-semibold leading-snug drop-shadow">
                      {range.description}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-white/80 text-sm font-bold group-hover:text-white transition-colors">
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
