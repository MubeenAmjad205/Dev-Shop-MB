'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import Input from '@/shared/Input/Input';
import config from '@/core/config/global.json';

const currency = config.currency.symbol;

const TOTAL_STEPS = 5;

const ageOptions = [
  { id: '0-24m', label: '0-24 Months', icon: '🍼' },
  { id: '2-4y', label: '2-4 Years', icon: '🧸' },
  { id: '5-7y', label: '5-7 Years', icon: '🎨' },
  { id: '8y+', label: '8+ Years', icon: '🚀' },
];

const categoryOptions = [
  { id: 'boy', label: 'Boy', icon: '👦' },
  { id: 'girl', label: 'Girl', icon: '👧' },
  { id: 'neutral', label: 'Neutral', icon: '🌟' },
];

const interestOptions = [
  { id: 'building', label: 'Building & Logic', icon: '🧱' },
  { id: 'creative', label: 'Arts & Crafts', icon: '🎨' },
  { id: 'active', label: 'Outdoor Play', icon: '⚽' },
  { id: 'plush', label: 'Plush Toys', icon: '🧸' },
];

// Removed budgetOptions as we are now using a continuous slider

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Form State
  const [age, setAge] = useState('');
  const [category, setCategory] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState(5000);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInterestToggle = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate BE submission and redirect to results
    const query = new URLSearchParams();
    if (age) query.set('age', age);
    if (category && category !== 'neutral') query.set('category', category);
    query.set('maxPrice', budget.toString());
    
    router.push(`/products?${query.toString()}`);
  };

  const canProceed = () => {
    if (step === 1) return !!age;
    if (step === 2) return !!category;
    if (step === 3) return interests.length > 0;
    if (step === 4) return true; // Slider always has a value
    return true; // Step 5 has optional/text fields checked on submit
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-100/50 dark:bg-teal-900/20 rounded-full filter blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full filter blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 max-w-6xl mx-auto">
          
          {/* Left Side Content */}
          <div className="flex-1 w-full text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-bold shadow-sm">
              <span className="text-lg">✨</span> AI-Powered Toy Finder
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white leading-tight tracking-tight">
              Find the <span className="text-teal-500">Perfect Toy</span><br />
              for Your Child
            </h1>
            
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Stop scrolling through hundreds of toys. Answer a few quick questions and our AI instantly recommends the best toys from our store, personalised just for your child.
            </p>

            <div className="space-y-4 max-w-md mx-auto lg:mx-0 text-left">
              {[
                { icon: '⚡', text: 'Takes less than 1 minute' },
                { icon: '🎯', text: 'Age-appropriate recommendations' },
                { icon: '💰', text: 'Always within your budget' },
                { icon: '🛡️', text: '100% safe & quality toys only' },
                { icon: '🚚', text: 'Fast delivery across Pakistan' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm p-3 rounded-2xl border border-neutral-100 dark:border-neutral-700/50">
                  <div className="w-10 h-10 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-lg">
                    {benefit.icon}
                  </div>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] bg-white dark:bg-neutral-800 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border-[8px] border-neutral-900 dark:border-neutral-700 relative h-[780px] flex flex-col transform transition-transform hover:-translate-y-2 duration-500">
              
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-neutral-900 dark:bg-neutral-700 rounded-b-3xl z-20" />

        {/* Header */}
        <div className="pt-12 pb-4 px-6 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
          <button 
            onClick={step > 1 ? prevStep : () => router.push('/')}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            ←
          </button>
          <div className="font-extrabold text-lg tracking-wider text-neutral-900 dark:text-white">
            <span className="text-teal-500">TOY</span>ZONE<span className="text-teal-500 text-sm">.pk</span>
          </div>
          <div className="w-8" /> {/* Spacer */}
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 flex gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="h-1.5 flex-1 rounded-full bg-neutral-100 dark:bg-neutral-700 overflow-hidden">
              <div 
                className={`h-full bg-teal-500 transition-all duration-500 ${i < step ? 'w-full' : 'w-0'}`} 
              />
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden px-6">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 px-6 py-4 h-full overflow-y-auto hiddenScrollbar"
            >
              
              {/* STEP 1: AGE */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold">Step 1 of 5</span>
                    <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Who are we shopping for?</h2>
                    <p className="text-neutral-500 text-sm">Select the age group to get perfect matches.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {ageOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setAge(opt.id); setTimeout(nextStep, 300); }}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all duration-200 ${
                          age === opt.id 
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                            : 'border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-teal-200'
                        }`}
                      >
                        <span className="text-4xl">{opt.icon}</span>
                        <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: CATEGORY */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold">Step 2 of 5</span>
                    <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Boy or Girl?</h2>
                    <p className="text-neutral-500 text-sm">This helps us tailor the aesthetic.</p>
                  </div>
                  <div className="space-y-4 mt-8">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setCategory(opt.id); setTimeout(nextStep, 300); }}
                        className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 ${
                          category === opt.id 
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                            : 'border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-teal-200'
                        }`}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-bold text-base text-neutral-800 dark:text-neutral-200">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: INTERESTS */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold">Step 3 of 5</span>
                    <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">What do they love?</h2>
                    <p className="text-neutral-500 text-sm">Select one or more interests.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleInterestToggle(opt.id)}
                        className={`flex flex-col items-center gap-3 p-5 rounded-3xl border-2 transition-all duration-200 ${
                          interests.includes(opt.id)
                            ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' 
                            : 'border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-teal-200'
                        }`}
                      >
                        <span className="text-3xl">{opt.icon}</span>
                        <span className="font-bold text-xs text-neutral-800 dark:text-neutral-200 text-center">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: BUDGET SLIDER */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold">Step 4 of 5</span>
                    <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white">Set a budget limit</h2>
                    <p className="text-neutral-500 text-sm">We'll find the best toys within your range.</p>
                  </div>
                  
                  <div className="mt-12 bg-white dark:bg-neutral-800 p-8 rounded-[2rem] border-2 border-neutral-100 dark:border-neutral-700 shadow-sm text-center">
                    <div className="text-4xl font-extrabold text-teal-500 mb-2">
                      {currency} {budget.toLocaleString()}
                    </div>
                    <p className="text-neutral-400 text-sm font-medium mb-8">Maximum Price</p>
                    
                    <input 
                      type="range" 
                      min="100" 
                      max="20000" 
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full h-3 bg-neutral-100 dark:bg-neutral-700 rounded-full appearance-none outline-none cursor-pointer accent-teal-500"
                    />
                    
                    <div className="flex justify-between text-xs text-neutral-400 font-bold mt-4">
                      <span>{currency} 100</span>
                      <span>{currency} 10k</span>
                      <span>{currency} 20k</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: CONTACT (From Screenshot) */}
              {step === 5 && (
                <form id="quiz-form" onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="text-center space-y-2">
                    <span className="inline-block px-3 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-xs font-bold">Step 5 of 5</span>
                    <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight">Your picks are almost ready</h2>
                    <p className="text-neutral-500 text-sm">Share your details so Toyzone can save your recommendations and help faster.</p>
                  </div>
                  <div className="space-y-5 mt-6 flex-1">
                    <div>
                      <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">Name</label>
                      <Input 
                        placeholder="Your name" 
                        required 
                        className="rounded-2xl"
                        value={contact.name}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">Phone</label>
                      <Input 
                        type="tel" 
                        placeholder="03XXXXXXXXX" 
                        required 
                        className="rounded-2xl"
                        value={contact.phone}
                        onChange={(e) => setContact({...contact, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-900 dark:text-white mb-2">Email <span className="font-normal text-neutral-400">(optional)</span></label>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="rounded-2xl"
                        value={contact.email}
                        onChange={(e) => setContact({...contact, email: e.target.value})}
                      />
                    </div>
                  </div>
                </form>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white dark:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-700 z-10">
          {step < TOTAL_STEPS ? (
            <ButtonPrimary 
              className="w-full rounded-2xl py-4 font-bold bg-teal-500 hover:bg-teal-600 text-lg shadow-lg shadow-teal-500/30"
              disabled={!canProceed()}
              onClick={nextStep}
            >
              Continue
            </ButtonPrimary>
          ) : (
            <ButtonPrimary 
              type="submit"
              form="quiz-form"
              className="w-full rounded-2xl py-4 font-bold bg-teal-500 hover:bg-teal-600 text-lg shadow-lg shadow-teal-500/30"
            >
              Show My Picks 🎁
            </ButtonPrimary>
          )}
        </div>

      </div> {/* End phone mockup */}
      </div> {/* End right column */}
      </div> {/* End flex container */}
      </div> {/* End container */}
    </div>
  );
}
