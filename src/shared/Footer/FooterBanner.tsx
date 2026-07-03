import React from 'react';
import Heading from '@/shared/Heading/Heading';
import ButtonPrimary from '../Button/ButtonPrimary';
import { footerBannerData } from '@/data/content';

const FooterBanner: React.FC = () => {
  const { heading, description } = footerBannerData;

  return (
    <div
      className="rounded-[2.5rem] bg-primary py-16 w-full text-white shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <Heading className="mb-0 text-white drop-shadow-md" isMain isCenter>
          {heading}
        </Heading>
        <p className="mx-auto w-4/5 text-center md:w-[50%] text-white/90 drop-shadow-sm font-medium">
          {description}
        </p>
        <div className="mt-10 flex items-center justify-center">
          <ButtonPrimary sizeClass="px-8 py-4 bg-white text-primary hover:bg-neutral-50 shadow-xl">
            More about us
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
