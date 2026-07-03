'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/shared/utils/animations';

const SectionBeatSummerHeat = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('COOLKIDS');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="container py-4">
      <motion.div
        className="rounded-[2rem] bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-amber-900/20 dark:to-neutral-900 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-100 dark:border-amber-900/40 shadow-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="flex items-center gap-5">
          <motion.div
            className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0"
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            🍦
          </motion.div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
              Beat the Summer Heat
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-medium mt-1">
              Use code{' '}
              <span className="font-extrabold text-primary">COOLKIDS</span>{' '}
              for an extra{' '}
              <span className="font-extrabold text-orange-600 dark:text-orange-400">15% off</span>{' '}
              all pools & water toys.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-md ${
            copied
              ? 'bg-green-500 text-white scale-95'
              : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:scale-105'
          }`}
        >
          {copied ? (
            <>✅ Copied!</>
          ) : (
            <>📋 Copy Code: COOLKIDS</>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default SectionBeatSummerHeat;
