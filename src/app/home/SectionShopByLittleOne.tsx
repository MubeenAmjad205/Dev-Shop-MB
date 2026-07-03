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
    subtitle: 'Toys for little explorers',
    image: '/images/baby-3d.png',
    bg: 'bg-[#e5fcf4]', // Matching soft green background
    accentColor: 'bg-[#00c96c]', // Green matching the button and text
    textAccent: 'text-[#00c96c]',
    emoji: '👶',
    href: '/products?category=babies',
  },
  {
    title: 'Boys',
    subtitle: 'Toys for every adventure',
    image: '/images/boy-3d.png',
    bg: 'bg-[#e0f1fe]',
    accentColor: 'bg-[#3b82f6]',
    textAccent: 'text-[#3b82f6]',
    emoji: '👦',
    href: '/products?category=boys',
  },
  {
    title: 'Girls',
    subtitle: 'Toys for bright and bold dreams',
    image: '/images/girl-3d.png',
    bg: 'bg-[#fdf2f8]',
    accentColor: 'bg-[#ec4899]',
    textAccent: 'text-[#ec4899]',
    emoji: '👧',
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
              <div className={`relative h-[480px] rounded-[2rem] ${cat.bg} overflow-hidden group-hover:-translate-y-2 transition-transform duration-500 shadow-md group-hover:shadow-xl`}>
                
                {/* 3D Model Image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Bottom Floating White Pill */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white dark:bg-neutral-900 rounded-[1.5rem] p-4 flex items-center justify-between shadow-lg border border-white/50 dark:border-neutral-800 backdrop-blur-md">
                    
                    {/* Left: Avatar & Text */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-2xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                        {cat.emoji}
                      </div>
                      <div className="flex flex-col">
                        <h3 className={`text-2xl font-bold ${cat.textAccent}`}>
                          {cat.title}
                        </h3>
                        <p className="text-neutral-500 text-xs font-medium tracking-wide">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Circular Arrow Button */}
                    <div className={`w-12 h-12 ${cat.accentColor} rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

export default SectionShopByLittleOne;
