import React from 'react';
import Heading from '@/shared/Heading/Heading';
import Button from '../Button/Button';
import { footerBannerData } from '@/data/content';
import Image from 'next/image';
import { bannerImages } from '@/shared/constants/images';

const FooterBanner: React.FC = () => {
  const { heading, description } = footerBannerData;

  return (
    <div
      className="rounded-[2.5rem] bg-primary py-16 w-full text-white shadow-2xl relative overflow-hidden"
    >
      <Image 
        src={bannerImages.kidsCare} 
        alt="Kids Care Banner"
        fill
        className="object-cover opacity-20 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <Heading className="mb-0 text-white drop-shadow-md" isMain isCenter>
          {heading}
        </Heading>
        <p className="mx-auto w-4/5 text-center md:w-[50%] text-white/90 drop-shadow-sm font-medium">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button sizeClass="px-8 py-4" className="bg-white text-primary hover:bg-neutral-50 shadow-xl font-bold rounded-full">
            More about us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
