'use client';

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
import {  useMutation } from '@apollo/client';
import shopifyClient from '@/lib/shopifyClient';
import {CREATE_CHECKOUT_MUTATION} from'@/queries/shopifyQueries';

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

  const [checkoutCreate] = useMutation(CREATE_CHECKOUT_MUTATION, {
    client: shopifyClient,
  });

  const handleAddToCart = () => {
    dispatch(
      addItem({
        product: productData,
        quantity: 1,
      })
    );
  };

  const handleBuyNow = async () => {
    if (!productData.variantId) {
      console.error('Variant ID is missing.');
      return;
    }
    try {
      const input = {
        lineItems: [
          {
            variantId: productData.variantId,
            quantity: 1,
          },
        ],
      };
      const { data } = await checkoutCreate({ variables: { input } });
      if (data.checkoutCreate.checkout) {
        window.location.href = data.checkoutCreate.checkout.webUrl;
      } else {
        console.error('Checkout errors:', data.checkoutCreate.checkoutUserErrors);
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
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
          <ButtonPrimary onClick={handleBuyNow} className="w-full">
            Buy Now
          </ButtonPrimary>
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
