'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import LikeButton from '@/components/LikeButton';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import InputNumber from '@/shared/InputNumber/InputNumber';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeItem, updateQuantity } from '@/store/slices/cartSlice';
import type { ProductType } from '@/data/types';

const CartPageContent = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.product.currentPrice) * item.quantity,
    0
  );
  const total = subtotal;

  const renderProduct = (cartItem: { product: ProductType; quantity: number }) => {
    const { product, quantity } = cartItem;
    const { id, productName, shots, currentPrice, slug, rating, shoeCategory } = product;
    const coverImage = shots && shots?.length > 0 ? shots[0]?.url : '/fallback.jpg';
    const altText = shots && shots?.length > 0 ? shots[0]?.altText : productName;
    const productSlug = slug || id;

    return (
      <div key={id} className="flex py-5 last:pb-0">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl md:w-40 md:h-40">
          <Image
            src={coverImage?coverImage:''}
            alt={altText? altText:'Image'}
            layout="fill"
            objectFit="contain"
            className="object-contain object-center"
          />
          <Link className="absolute inset-0" href={`/products/${productSlug}`} key={`link-${id}`} />
        </div>
        <div className="ml-4 flex flex-1 flex-col justify-between" key={`info-${id}`}>
          <div>
            <div className="flex justify-between">
              <div key={`title-${id}`}>
                <h3 className="font-medium md:text-2xl">
                  <Link href={`/products/${productSlug}`} key={`link-title-${id}`}>
                    {productName}
                  </Link>
                </h3>
                {shoeCategory && (
                  <span key={`cat-${id}`} className="my-1 text-sm text-neutral-500">
                    {shoeCategory}
                  </span>
                )}
                <div className="flex items-center gap-1" key={`rating-${id}`}>
                  <MdStar className="text-yellow-400" />
                  <span className="text-sm">{rating}</span>
                </div>
              </div>
              <span key={`price-${id}`} className="font-medium md:text-xl">
                ${currentPrice}
              </span>
            </div>
            <p key={`qty-text-${id}`} className="text-sm text-neutral-500">
              Quantity: {quantity}
            </p>
          </div>
          <div className="flex w-full items-end justify-between text-sm" key={`controls-${id}`}>
            <div className="flex items-center gap-3" key={`actions-${id}`}>
              <LikeButton key={`like-${id}`} />
              <AiOutlineDelete
                key={`delete-${id}`}
                className="text-2xl cursor-pointer"
                onClick={() => dispatch(removeItem(id))}
              />
            </div>
            <div key={`input-${id}`}>
              <InputNumber
                key={`inputNumber-${id}`}
                value={quantity}
                onChange={(newVal) => dispatch(updateQuantity({ id, quantity: newVal }))}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20">
        <div className="mb-14" key="heading">
          <h2 className="block text-2xl font-medium sm:text-3xl lg:text-4xl">Your Cart</h2>
        </div>
        <hr className="my-10 border-neutral-300 xl:my-12" key="hr" />
        <div className="flex flex-col lg:flex-row" key="layout">
          <div className="w-full divide-y divide-neutral-300 lg:w-3/5 xl:w-[55%]" key="products">
            {cartItems.length > 0 ? (
              cartItems.map((item) => renderProduct(item))
            ) : (
              <p key="empty" className="py-5 text-center">
                Your cart is empty.
              </p>
            )}
          </div>
          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" key="separator" />
          <div className="flex-1" key="summary">
            <div className="sticky top-28" key="summary-container">
              <h3 className="text-2xl font-semibold" key="summary-heading">Summary</h3>
              <div className="mt-7 divide-y divide-neutral-300 text-sm" key="totals">
                <div className="flex justify-between pb-4" key="subtotal">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 text-base font-semibold" key="total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <ButtonPrimary href="/checkout" className="mt-8 w-full" key="checkout">
                Checkout Now
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const CartPage = () => {
  return (
    <Provider store={store}>
      <CartPageContent />
    </Provider>
  );
};

export default CartPage;
