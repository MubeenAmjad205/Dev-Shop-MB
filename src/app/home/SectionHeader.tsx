'use client';

import PromoTag from '@/components/PromoTag';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { headerSection } from '@/data/content';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { slideLeft, slideRight } from '@/shared/utils/animations';

const SectionHeader = () => {
  const router = useRouter();
  
  const handleViewProduct = () => {
    router.push('/products');
  };

  const { heading, title, description } = headerSection;

  return (
    <div className="container items-stretch gap-y-5 lg:flex lg:gap-5 lg:gap-y-0">
      <motion.div
        className="basis-[68%] items-center space-y-8 rounded-[2.5rem] bg-gradient-to-br from-surface to-blue-50 dark:from-neutral-900 dark:to-slate-900 shadow-lg p-8 md:flex md:space-y-0 relative overflow-hidden border border-neutral-100 dark:border-neutral-800"
        initial="hidden"
        animate="visible"
        variants={slideLeft}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 rounded-full filter blur-3xl pointer-events-none animate-blob" />
        <div className="basis-[63%] relative z-10">
          <h4 className="mb-4 text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {title}
          </h4>
          <h1
            className="text-[38px] md:text-[50px] font-extrabold tracking-tight text-neutral-900 dark:text-white"
            style={{ lineHeight: '1.1em' }}
          >
            {heading}
          </h1>
          <p className="my-8 w-4/5 text-neutral-500 text-base leading-relaxed">
            {description}
          </p>
          <ButtonPrimary sizeClass="px-7 py-4 rounded-full shadow-lg" onClick={handleViewProduct}>
            Shop Now
          </ButtonPrimary>
        </div>
        <div className="basis-[37%] flex items-center justify-center relative">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <Image
              src="/images/hero-toys.png"
              alt="Premium kids toy box"
              width={600}
              height={600}
              className="w-full drop-shadow-2xl rounded-3xl"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-5 basis-[30%] lg:mt-0">
        <PromoTag />
      </div>
    </div>
  );
};

export default SectionHeader;
