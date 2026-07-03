'use client';

import React from 'react';
import Image from 'next/image';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { motion } from 'framer-motion';
import { slideLeft, slideRight, fadeUp } from '@/shared/utils/animations';
import { bannerImages } from '@/shared/constants/images';

const SectionSummerBanner = () => {
  return (
    <div className="container py-10">
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl min-h-[420px] flex items-center">
        {/* Background image */}
        <Image
          src={bannerImages.summer}
          alt="Summer Sale Banner"
          fill
          className="object-cover"
          quality={90}
          sizes="100vw"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600/90 via-cyan-500/80 to-blue-400/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-8 md:px-16 py-12 gap-8">
          <motion.div
            className="text-white space-y-5 md:max-w-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideLeft}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
                Limited Time Sale
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
              Summer Starts<br />Here!
            </h2>
            <p className="text-xl text-blue-50 font-medium drop-shadow">
              Save up to <span className="font-extrabold text-yellow-300">50% off</span> on outdoor water toys, pools, and summer playsets.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonPrimary sizeClass="px-8 py-4 bg-white text-sky-600 hover:bg-neutral-100 rounded-full shadow-xl text-base font-bold">
                Shop Summer Sale
              </ButtonPrimary>
              <button className="px-6 py-4 rounded-full border-2 border-white/50 text-white font-bold hover:bg-white/10 transition-colors">
                View Deals →
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideRight}
          >
            {[
              { emoji: '🏖️', label: 'Beach Toys', delay: 0 },
              { emoji: '💦', label: 'Water Guns', delay: 0.3 },
              { emoji: '🌞', label: 'Outdoor Fun', delay: 0.6 },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 text-center text-white shadow-lg"
                animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i * 0.5, ease: 'easeInOut' }}
              >
                <div className="text-5xl mb-2">{item.emoji}</div>
                <p className="text-sm font-bold">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionSummerBanner;
