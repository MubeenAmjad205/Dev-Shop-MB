import React from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { MdCheckCircle } from 'react-icons/md';

const SectionPerfectToy = () => {
  return (
    <div className="container py-16">
      <div className="bg-gradient-to-br from-surface to-blue-50 dark:from-neutral-900 dark:to-neutral-800 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-10 shadow-sm border border-neutral-100 dark:border-neutral-800">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white dark:bg-black rounded-full text-sm font-bold text-primary shadow-sm">
            AI RECOMMENDATION
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white leading-tight">
            Find the <span className="text-primary">Perfect Toy</span> for Your Child
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg w-4/5 leading-relaxed">
            Take our quick 2-minute quiz and let our smart system recommend the safest and most engaging toys tailored specifically to your child's age and interests.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <MdCheckCircle className="text-green-500 text-xl" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Age Appropriate</span>
            </div>
            <div className="flex items-center gap-2">
              <MdCheckCircle className="text-green-500 text-xl" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Safety Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <MdCheckCircle className="text-green-500 text-xl" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Skill Building</span>
            </div>
          </div>

          <div className="pt-4">
             <ButtonPrimary sizeClass="px-8 py-4 rounded-full shadow-lg">
                Take the Quiz
             </ButtonPrimary>
          </div>
        </div>

        {/* Right Content - Mockup Illustration */}
        <div className="flex-1 w-full flex justify-center relative">
          <div className="w-72 h-[500px] bg-white dark:bg-black rounded-[3rem] shadow-2xl border-8 border-neutral-100 dark:border-neutral-800 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-100 dark:bg-neutral-800 rounded-b-3xl z-20"></div>
            
            <div className="flex-1 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-900 dark:to-black p-6 pt-12 flex flex-col items-center text-center">
               <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                 <span className="text-6xl">🧩</span>
               </div>
               <h3 className="font-bold text-xl mb-2">Age 3-5 Years</h3>
               <p className="text-sm text-neutral-500 mb-8">Building logic and creativity</p>
               
               <div className="w-full space-y-3">
                 <div className="h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center px-4 gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl"></div>
                    <div className="flex-1 h-3 bg-neutral-100 rounded-full"></div>
                 </div>
                 <div className="h-16 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center px-4 gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl"></div>
                    <div className="flex-1 h-3 bg-neutral-100 rounded-full"></div>
                 </div>
               </div>

               <div className="mt-auto w-full">
                 <div className="w-full h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-sm">
                   View Matches
                 </div>
               </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -right-6 top-10 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -left-6 bottom-10 w-24 h-24 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

      </div>
    </div>
  );
};

export default SectionPerfectToy;
