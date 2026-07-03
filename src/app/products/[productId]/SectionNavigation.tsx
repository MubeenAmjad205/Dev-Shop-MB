'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';


const SectionNavigation = () => {
  const router = useRouter();

  return (
    <div className="my-10 flex items-center">
      <button 
        onClick={() => router.back()} 
        className="group flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-300 group-hover:border-primary transition-colors">
          <MdArrowBack className="text-2xl" />
        </div>
        <span>Back to Products</span>
      </button>
    </div>
  );
};

export default SectionNavigation;
