'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import { Provider } from 'react-redux';

import LikeButton from '@/components/LikeButton';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import InputNumber from '@/shared/InputNumber/InputNumber';
import { store } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeItem, updateQuantity } from '@/store/slices/cartSlice';
import type { ProductType } from '@/data/types';

const CheckoutPageContent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate dynamic totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.product.currentPrice) * item.quantity,
    0
  );
  const total = subtotal;

  const renderProduct = (cartItem: { product: ProductType; quantity: number }) => {
    const { product, quantity } = cartItem;
    const { id, shoeName, shots, currentPrice, slug, rating, shoeCategory } = product;
    const coverImage = shots?.[0]?.url || '/fallback.jpg';
    const altText = shots?.[0]?.altText || shoeName;
    const productSlug = slug || id;

    return (
      <div key={id} className="flex py-5 last:pb-0">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl md:w-40 md:h-40">
          <Image
            src={coverImage}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-contain object-center"
          />
          <Link href={`/products/${productSlug}`} className="absolute inset-0" />
        </div>
        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium md:text-2xl">
                  <Link href={`/products/${productSlug}`}>
                    {shoeName}
                  </Link>
                </h3>
                {shoeCategory && (
                  <span className="my-1 text-sm text-neutral-500">
                    {shoeCategory}
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <MdStar className="text-yellow-400" />
                  <span className="text-sm">{rating}</span>
                </div>
              </div>
              <span className="font-medium md:text-xl">
                ${currentPrice}
              </span>
            </div>
            <p className="text-sm text-neutral-500">
              Quantity: {quantity}
            </p>
          </div>
          <div className="flex w-full items-end justify-between text-sm">
            <div className="flex items-center gap-3">
              <LikeButton />
              <AiOutlineDelete
                className="text-2xl cursor-pointer"
                onClick={() => dispatch(removeItem(id))}
              />
            </div>
            <div>
              <InputNumber
                value={quantity}
                onChange={(newVal) => dispatch(updateQuantity({ id, quantity: newVal }))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isMounted) return null;

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:py-20">
        <div className="mb-16 text-center">
          <h2 className="block text-2xl font-semibold sm:text-3xl lg:text-4xl">Checkout</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="mt-8 divide-y divide-neutral-300">
            {cartItems.length > 0 ? (
              cartItems.map((item) => renderProduct(item))
            ) : (
              <p className="py-5 text-center">Your cart is empty.</p>
            )}
          </div>
          <div className="mt-10 border-t border-neutral-300 pt-6 text-sm">
            <div className="mt-4 flex justify-between pb-4">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8">
            <ButtonPrimary className="w-full">Confirm Order</ButtonPrimary>
          </div>
        </div>
      </main>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Provider store={store}>
      <CheckoutPageContent />
    </Provider>
  );
};

export default CheckoutPage;