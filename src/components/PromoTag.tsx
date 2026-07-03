'use client';

import React from 'react';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import { promotionTag } from '@/data/content';
import { useRouter } from 'next/navigation';

const PromoTag = () => {
  const router = useRouter();

  const { heading, description } = promotionTag;
  
  const handleClick = () => {
     router.push('/products');
  }

  return (  
    <div className='relative h-full space-y-10 rounded-3xl bg-primary shadow-xl overflow-hidden p-8 text-white'>
      <div className="relative z-10">
        <h1 className="text-[35px] font-bold drop-shadow-md" style={{ lineHeight: '1.2em' }}>
          {heading}
        </h1>
        <p className="w-[90%] font-medium text-white/90 my-6 drop-shadow-sm">{description}</p>
        <ButtonSecondary className="bg-white text-primary hover:bg-neutral-50 shadow-md border-transparent" sizeClass="px-6 py-4 rounded-full" onClick={handleClick}>
          Event details
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default PromoTag;
