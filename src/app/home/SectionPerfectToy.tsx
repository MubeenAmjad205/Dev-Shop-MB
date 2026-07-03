'use client';

import React from 'react';
import Image from 'next/image';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, slideRight } from '@/shared/utils/animations';
import { useRouter } from 'next/navigation';

const features = [
  { label: 'Age Appropriate', icon: '🎯' },
  { label: 'Safety Certified', icon: '🛡️' },
  { label: 'Skill Building', icon: '🧠' },
  { label: 'Expert Curated', icon: '⭐' },
];

const SectionPerfectToy = () => {
  const router = useRouter();

  return (
    <div className="container py-20">
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-neutral-900 dark:to-slate-900 border border-neutral-100 dark:border-neutral-800 shadow-xl">
        
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-8 md:p-16">
          {/* Left Content */}
          <motion.div
            className="flex-1 space-y-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideLeft}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI Recommendation Engine
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight tracking-tight">
              Find the{' '}
              <span className="text-primary relative">
                Perfect Toy
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q100 0 200 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/30" />
                </svg>
              </span>{' '}
              for Your Child
            </h2>

            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-md">
              Take our quick 2-minute quiz and let our AI match the safest, most engaging toys to your child's unique age and interests.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-2xl p-3 shadow-sm border border-neutral-100 dark:border-neutral-700">
                  <span className="text-xl">{f.icon}</span>
                  <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{f.label}</span>
                </div>
              ))}
            </div>

            <ButtonPrimary 
              sizeClass="px-8 py-4 rounded-full shadow-lg text-base"
              onClick={() => router.push('/quiz')}
            >
              ✨ Find the perfect toy
            </ButtonPrimary>
            <span className="text-xs text-neutral-500 font-bold ml-4">🔒 Free - No account needed</span>
          </motion.div>

          {/* Right – Realistic phone mockup with image */}
          <motion.div
            className="flex-1 w-full flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={slideRight}
          >
            <div className="relative">
              {/* Phone shell */}
              <div className="relative w-64 h-[520px] bg-neutral-900 dark:bg-neutral-800 rounded-[3.5rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] border-[6px] border-neutral-800 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-neutral-900 rounded-b-3xl z-20" />
                
                {/* Screen content */}
                <div className="absolute inset-0 bg-white dark:bg-neutral-900 m-0.5 rounded-[3rem] overflow-hidden">
                  {/* App header */}
                  <div className="bg-primary px-5 pt-10 pb-6 text-white">
                    <p className="text-xs font-semibold opacity-80">Kids Quiz</p>
                    <h3 className="text-lg font-bold">Age 3-5 Years 🧩</h3>
                  </div>

                  {/* App body */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Top Matches</p>
                    {['Building Sets', 'Creative Arts', 'Puzzles'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800 rounded-2xl p-3 border border-neutral-100 dark:border-neutral-700">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${i === 0 ? 'bg-blue-100' : i === 1 ? 'bg-pink-100' : 'bg-violet-100'}`}>
                          {i === 0 ? '🧱' : i === 1 ? '🎨' : '🧩'}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-neutral-900 dark:text-white">{item}</p>
                          <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full mt-1.5 overflow-hidden">
                            <div className={`h-full bg-primary rounded-full`} style={{ width: `${95 - i * 12}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-primary">{95 - i * 12}%</span>
                      </div>
                    ))}
                    
                    <button className="w-full mt-4 bg-primary text-white py-3 rounded-2xl font-bold text-sm shadow-md">
                      View All Matches
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating cards around the phone */}
              <motion.div
                className="absolute -left-16 top-20 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-3 border border-neutral-100 dark:border-neutral-700 flex items-center gap-2 w-40"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-lg">🧸</div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">Top Pick</p>
                  <p className="text-xs text-neutral-500">for age 3-5</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-14 bottom-24 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-3 border border-neutral-100 dark:border-neutral-700 flex items-center gap-2 w-36"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-lg">✅</div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">Safe</p>
                  <p className="text-xs text-neutral-500">Certified</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionPerfectToy;
