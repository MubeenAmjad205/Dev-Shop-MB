'use client';

import PromoTag from '@/components/PromoTag';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { headerSection } from '@/data/content';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import airForce1 from '@/images/airForce1.webp';

const SectionHeader = () => {
  const router = useRouter();
  
  const handleViewProduct = () => {
    router.push('/products');
  };

  const { heading, title, description } = headerSection;

  return (
    <div className="container items-stretch gap-y-5 lg:flex lg:gap-5 lg:gap-y-0">
      <div className="basis-[68%] items-center space-y-10 rounded-3xl bg-surface dark:bg-neutral-800 shadow-lg p-8 md:flex md:space-y-0 relative overflow-hidden">
        <div className="basis-[63%] relative z-10">
          <h4 className="mb-5 text-xl font-medium text-primary uppercase tracking-wider">
            {title}
          </h4>
          <h1
            className="text-[40px] md:text-[50px] font-bold tracking-tight text-neutral-900 dark:text-white"
            style={{ lineHeight: '1.1em' }}
          >
            {heading}
          </h1>
          <p className="my-10 w-4/5 text-neutral-500">
            {description}
          </p>
          <ButtonPrimary sizeClass="px-5 py-4" onClick={handleViewProduct}>View Product</ButtonPrimary>
        </div>
        <div className="basis-[37%]">
          <Image src={airForce1} alt="shoe box" className="w-full" />
        </div>
      </div>

      <div className="mt-5 basis-[30%] lg:mt-0">
        <PromoTag />
      </div>
    </div>
  );
};

export default SectionHeader;
