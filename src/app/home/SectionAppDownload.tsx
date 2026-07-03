'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, scaleUp, slideLeft, slideRight } from '@/shared/utils/animations';
import { bannerImages, testimonialAvatars } from '@/shared/constants/images';

const trustFeatures = [
  { title: 'Free Shipping', desc: 'On all orders over $50', emoji: '🚚' },
  { title: 'Easy Returns', desc: '30-day hassle-free returns', emoji: '📦' },
  { title: 'Secure Payment', desc: '100% encrypted checkout', emoji: '🔒' },
  { title: '24/7 Support', desc: 'Expert help, always on', emoji: '💬' },
];

const stats = [
  { value: '50K+', label: 'Happy Families' },
  { value: '2,400+', label: 'Products' },
  { value: '4.9★', label: 'Average Rating' },
];

const SectionAppDownload = () => {
  return (
    <div className="container py-20 space-y-10">
      {/* Stats bar */}
      <motion.div
        className="grid grid-cols-3 gap-4 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {stats.map((stat, i) => (
          <motion.div key={i} variants={scaleUp} className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-primary">{stat.value}</p>
            <p className="text-sm text-neutral-500 font-medium mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* App Download block */}
      <div className="relative rounded-[3rem] overflow-hidden min-h-[400px] flex items-center shadow-2xl">
        <Image
          src={bannerImages.appPromo}
          alt="Download App"
          fill
          className="object-cover"
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-orange-600/90 to-rose-500/70" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-8 md:px-16 py-14 gap-10">
          <motion.div
            className="text-white space-y-6 lg:max-w-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideLeft}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
              📱 Mobile App
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow">
              The Toy Shop<br />in Your Pocket
            </h2>
            <p className="text-lg text-white/90 font-medium leading-relaxed">
              Get exclusive app-only deals, personalised recommendations, and order tracking right at your fingertips.
            </p>

            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {testimonialAvatars.map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                    <Image src={src} alt="Customer avatar" width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
              <p className="text-white/90 text-sm font-semibold">
                <span className="font-extrabold">50,000+</span> families trust us
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button className="flex items-center gap-2 bg-white text-neutral-900 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform text-sm">
                <span className="text-lg">🍏</span> App Store
              </button>
              <button className="flex items-center gap-2 bg-white text-neutral-900 px-5 py-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition-transform text-sm">
                <span className="text-lg">🤖</span> Google Play
              </button>
            </div>
          </motion.div>

          {/* Abstract phone mockup */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideRight}
          >
            <motion.div
              className="w-56 h-[440px] bg-neutral-900 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border-[5px] border-neutral-800 overflow-hidden relative"
              animate={{ y: [0, -16, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-neutral-900 rounded-b-3xl z-20" />
              <div className="absolute inset-0 bg-white m-0.5 rounded-[2.7rem] overflow-hidden">
                <div className="bg-primary px-4 pt-8 pb-5 text-white">
                  <p className="text-xs opacity-70">Kids Shop</p>
                  <p className="font-bold">Good morning! 👋</p>
                </div>
                <div className="p-3 space-y-2">
                  {['Plush Toys', 'Building Sets', 'Baby Care'].map((item, i) => (
                    <div key={i} className="h-14 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center px-3 gap-2">
                      <div className={`w-8 h-8 rounded-xl ${i === 0 ? 'bg-amber-100' : i === 1 ? 'bg-blue-100' : 'bg-pink-100'} flex items-center justify-center text-sm`}>
                        {i === 0 ? '🧸' : i === 1 ? '🧱' : '🍼'}
                      </div>
                      <p className="text-xs font-semibold text-neutral-800">{item}</p>
                    </div>
                  ))}
                  <div className="mt-3 h-10 bg-primary rounded-2xl flex items-center justify-center">
                    <p className="text-white text-xs font-bold">Explore All</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {trustFeatures.map((f, i) => (
          <motion.div
            key={i}
            variants={scaleUp}
            className="bg-white dark:bg-neutral-900 rounded-3xl p-6 text-center shadow-sm border border-neutral-100 dark:border-neutral-800 group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="w-14 h-14 bg-surface dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              {f.emoji}
            </div>
            <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{f.title}</h4>
            <p className="text-sm text-neutral-500">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SectionAppDownload;
