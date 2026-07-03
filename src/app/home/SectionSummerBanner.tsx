import React from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';

const SectionSummerBanner = () => {
  return (
    <div className="container py-8">
      <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-blue-400 to-cyan-300 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-lg border border-transparent dark:border-neutral-800">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-overlay filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-2xl opacity-30"></div>

        <div className="relative z-10 md:w-1/2 text-white space-y-6 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold uppercase tracking-wider">
            ☀️ Limited Time Only
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Summer Starts <br/> Here!
          </h2>
          <p className="text-xl text-blue-50 drop-shadow-sm font-medium">
            Get ready for outdoor fun. Save up to 50% on all water toys and backyard playsets.
          </p>
          <div className="pt-4">
            <ButtonPrimary sizeClass="px-8 py-4 bg-white text-blue-500 hover:bg-neutral-100 shadow-xl rounded-full">
              Shop Summer Sale
            </ButtonPrimary>
          </div>
        </div>

        <div className="relative z-10 mt-10 md:mt-0 w-full md:w-1/2 flex justify-center">
           {/* Abstract shapes representing summer toys (beach ball, sun) */}
           <div className="relative w-64 h-64">
              <div className="absolute top-0 right-10 text-8xl drop-shadow-2xl animate-spin-slow">🏖️</div>
              <div className="absolute bottom-10 left-10 text-8xl drop-shadow-2xl animate-bounce">🌞</div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl drop-shadow-2xl z-20">🔫</div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SectionSummerBanner;
