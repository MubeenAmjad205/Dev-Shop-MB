import React from 'react';

const SectionBeatSummerHeat = () => {
  return (
    <div className="container py-8">
      <div className="rounded-[2rem] bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-yellow-200 dark:border-yellow-900/50 shadow-sm relative overflow-hidden">
        
        <div className="flex items-center gap-6 z-10">
          <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-2xl flex items-center justify-center text-3xl shadow-sm rotate-12">
            🍦
          </div>
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Beat the Summer Heat</h3>
            <p className="text-orange-600 dark:text-orange-400 font-medium">Use code <span className="font-bold bg-white dark:bg-neutral-800 px-2 py-1 rounded border border-orange-200 dark:border-orange-800 ml-1">COOLKIDS</span> for an extra 15% off pools.</p>
          </div>
        </div>

        <div className="mt-4 md:mt-0 z-10">
          <button className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
            Copy Code
          </button>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-32 -top-10 text-8xl opacity-10 rotate-45">🌊</div>
      </div>
    </div>
  );
};

export default SectionBeatSummerHeat;
