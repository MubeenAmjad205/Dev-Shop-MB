import type { StaticImageData } from 'next/image';
import type { FC } from 'react';
import React from 'react';
import { BsBag } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { LuInfo } from 'react-icons/lu';
import { MdStar } from 'react-icons/md';
import { PiSealCheckFill } from 'react-icons/pi';

import ImageShowCase from '@/components/ImageShowCase';
import ShoeSizeButton from '@/components/ShoeSizeButton';
import { shoeSizes } from '@/data/content';
import ButtonCircle3 from '@/shared/Button/ButtonCircle3';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Heading from '@/shared/Heading/Heading';
import { addItem } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/hooks';

interface SectionProductHeaderProps {
  shots: StaticImageData[];
  productData: any;
  shoeName: string;
  prevPrice: number;
  currentPrice: number;
  rating: number;
  pieces_sold: number;
  reviews: number;
}

const SectionProductHeader: FC<SectionProductHeaderProps> = ({
  shots,
  productData,
  shoeName,
  prevPrice,
  currentPrice,
  rating,
  pieces_sold,
  reviews,
}) => {
  
  
  const dispatch = useAppDispatch();
  
  const handleAddToCart = () => {
    // console.log('Mapped Product Data from the component : ', productData);
    // Dispatch the addItem action with the full productData object and a quantity key.
    dispatch(
      addItem({
        product: productData,
        quantity: 1,
      })
    );
    // console.log('Product added to cart:', productData);
  };

  return (
    <div className="items-stretch justify-between space-y-10 lg:flex lg:space-y-0">
      <div className="basis-[50%]">
        <ImageShowCase shots={shots} />
      </div>

      <div className="basis-[45%]">
        <Heading className="mb-0" isMain title="new arrival!">
          {shoeName}
        </Heading>

        <div className="mb-10 flex items-center">
          <div className="flex items-center gap-1">
            <ButtonCircle3 className="overflow-hidden border border-neutral-400" size="w-11 h-11">
              <img
                src={'@/images/nike_profile.jpg'}
                alt="nike_profile"
                className="size-full object-cover"
              />
            </ButtonCircle3>
            <span className="font-medium">Nike</span>
            <PiSealCheckFill className="text-blue-600" />
          </div>
          <GoDotFill className="mx-3 text-neutral-500" />
          <div className="flex items-center gap-1">
            <MdStar className="text-yellow-400" />
            <p className="text-sm">
              {rating}{' '}
              <span className="text-neutral-500">{`(${reviews} Reviews)`}</span>
            </p>
          </div>
          <GoDotFill className="mx-3 text-neutral-500" />
          <p className="text-neutral-500">{`${pieces_sold} items sold`}</p>
        </div>

        <div className="mb-5 space-y-1">
          <p className="text-neutral-500 line-through">${prevPrice}</p>
          <h1 className="text-3xl font-medium">${currentPrice}</h1>
        </div>

        <div className="mb-5 flex items-end justify-between">
          <p className="text-xl">Available sizes</p>
          <p className="flex items-center gap-1 text-sm text-neutral-500">
            Size guide <LuInfo />
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {shoeSizes.map((size) => (
            <ShoeSizeButton key={size} size={size} />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-5">
          <ButtonPrimary className="w-full">Buy Now</ButtonPrimary>
          <ButtonSecondary
            className="flex w-full items-center gap-1 border-2 border-primary text-primary"
            onClick={handleAddToCart}
          >
            <BsBag /> Add to cart
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default SectionProductHeader;
