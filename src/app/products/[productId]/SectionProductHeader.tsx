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
import Accordion from '@/components/Accordion';
import ButtonCircle3 from '@/shared/Button/ButtonCircle3';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import Heading from '@/shared/Heading/Heading';
import { addToCartAsync } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import toast from 'react-hot-toast';
import { useRequireAuth } from '@/hooks/useRequireAuth';

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
  const requireAuth = useRequireAuth();

  const handleAddToCart = async () => {
    requireAuth(async () => {
      if (!productData.variantId) {
        toast.error('Product variant not available');
        return;
      }
      const toastId = toast.loading('Adding to cart...');
      const resultAction = await dispatch(
        addToCartAsync({
          variantId: productData.variantId,
          quantity: 1,
        })
      );
      if (addToCartAsync.fulfilled.match(resultAction)) {
        toast.success('Added to cart successfully!', { id: toastId });
      } else {
        toast.error('Failed to add to cart', { id: toastId });
      }
    });
  };

  const handleBuyNow = async () => {
    requireAuth(async () => {
      if (!productData.variantId) return;
      const resultAction = await dispatch(addToCartAsync({ variantId: productData.variantId, quantity: 1 }));
      if (addToCartAsync.fulfilled.match(resultAction)) {
        const cart = resultAction.payload;
        if (cart.checkoutUrl) {
          window.location.href = cart.checkoutUrl;
        }
      }
    });
  };

  return (
    <div className="items-stretch justify-between space-y-10 lg:flex lg:space-y-0">
      <div className="basis-[50%]">
        <ImageShowCase shots={shots} productId={productData.id} />
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
          <p className="flex items-center gap-1 text-sm text-primary cursor-pointer hover:underline">
            Size guide <LuInfo />
          </p>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <p className="text-sm font-medium text-red-500">High Demand - Only a few left in stock!</p>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed whitespace-pre-wrap">
            {productData.overview || 'No description available for this product.'}
          </p>
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

        <div className="mt-5 flex items-center justify-center gap-3 text-neutral-400 dark:text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 py-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
          <span className="text-xs font-medium">Guaranteed Safe Checkout:</span>
          <div className="flex gap-2">
            <div className="bg-white dark:bg-neutral-700 shadow-sm px-2 py-0.5 rounded text-[10px] font-bold border border-neutral-200 dark:border-neutral-600">VISA</div>
            <div className="bg-white dark:bg-neutral-700 shadow-sm px-2 py-0.5 rounded text-[10px] font-bold border border-neutral-200 dark:border-neutral-600">MC</div>
            <div className="bg-white dark:bg-neutral-700 shadow-sm px-2 py-0.5 rounded text-[10px] font-bold border border-neutral-200 dark:border-neutral-600">PAYPAL</div>
            <div className="bg-white dark:bg-neutral-700 shadow-sm px-2 py-0.5 rounded text-[10px] font-bold border border-neutral-200 dark:border-neutral-600">APPLE PAY</div>
          </div>
        </div>

        <div className="mt-8 space-y-3 pt-6">
          <Accordion 
            small 
            wfull 
            question={<span className="font-medium">Shipping & Returns</span>} 
            answer={<p className="leading-relaxed">Free standard shipping and free 60-day returns for members. Return policy exclusions apply.</p>}
          />
          <Accordion 
            small 
            wfull 
            question={<span className="font-medium">Safety & Materials</span>} 
            answer={<p className="leading-relaxed">All our products undergo rigorous safety testing. BPA-free, non-toxic, and crafted with child-safe materials.</p>}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionProductHeader;
