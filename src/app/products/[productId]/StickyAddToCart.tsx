'use client';

import React, { useState, useEffect } from 'react';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import { BsBag } from 'react-icons/bs';
import { useAppDispatch } from '@/store/hooks';
import { addToCartAsync } from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const StickyAddToCart = ({ productData }: { productData: any }) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const requireAuth = useRequireAuth();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past the main product header
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    requireAuth(async () => {
      if (!productData.variantId) return;
      const toastId = toast.loading('Adding to cart...');
      const resultAction = await dispatch(addToCartAsync({ variantId: productData.variantId, quantity: 1 }));
      if (addToCartAsync.fulfilled.match(resultAction)) {
        toast.success('Added to cart successfully!', { id: toastId });
      } else {
        toast.error('Failed to add to cart', { id: toastId });
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transform transition-transform duration-300 animate-slide-up">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {productData.shots?.[0]?.url && (
            <img src={productData.shots[0].url} alt="Product" className="w-14 h-14 object-cover rounded-lg shadow-sm hidden sm:block" />
          )}
          <div>
            <h4 className="font-semibold text-sm sm:text-base line-clamp-1 max-w-[200px] md:max-w-md">{productData.shoeName}</h4>
            <p className="text-primary font-bold text-sm sm:text-base">${productData.currentPrice}</p>
          </div>
        </div>
        <ButtonPrimary onClick={handleAddToCart} className="py-3 px-8 whitespace-nowrap shadow-lg hover:shadow-xl transition-all">
          <BsBag className="mr-2" /> Add to Cart
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default StickyAddToCart;
