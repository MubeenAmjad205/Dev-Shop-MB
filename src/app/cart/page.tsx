'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import InputNumber from '@/shared/InputNumber/InputNumber';
import Loading from '../loading';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeCartItemAsync, updateCartItemAsync, fetchCartAsync, CartItem } from '@/store/slices/cartSlice';

const CartPageContent = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const checkoutUrl = useAppSelector((state) => state.cart.checkoutUrl);
  const cartId = useAppSelector((state) => state.cart.cartId);
  const cartStatus = useAppSelector((state) => state.cart.status);

  useEffect(() => {
    setMounted(true);
    if (cartId) {
      dispatch(fetchCartAsync(cartId));
    }
  }, [cartId, dispatch]);

  if (!mounted) return <div style={{ visibility: 'hidden' }} />;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const renderProduct = (item: CartItem) => {
    const { id, title, price, quantity, image, productHandle } = item;
    const coverImage = image || '/fallback.jpg';
    const productSlug = productHandle || '#';

    return (
      <div key={id} className="flex py-5 last:pb-0">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl md:w-40 md:h-40">
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="contain"
            className="object-contain object-center"
          />
          <Link className="absolute inset-0" href={`/products/${productSlug}`} />
        </div>
        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium md:text-2xl">
                  <Link href={`/products/${productSlug}`}>
                    {title}
                  </Link>
                </h3>
              </div>
              <span className="font-medium md:text-xl">
                ${price}
              </span>
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm mt-4">
            <div className="flex items-center gap-3">
              <AiOutlineDelete
                className="text-2xl cursor-pointer text-red-500"
                onClick={() => dispatch(removeCartItemAsync(id))}
              />
            </div>
            <div>
              <InputNumber
                value={quantity}
                onChange={(newVal) => dispatch(updateCartItemAsync({ lineId: id, quantity: newVal }))}
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
        <div className="mb-14">
          <h2 className="block text-2xl font-medium sm:text-3xl lg:text-4xl">Your Cart</h2>
        </div>
        <hr className="my-10 border-neutral-300 xl:my-12" />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full divide-y divide-neutral-300 lg:w-3/5 xl:w-[55%]">
            {cartStatus === 'loading' && cartItems.length === 0 ? (
              <div className="flex justify-center p-20"><Loading /></div>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => renderProduct(item))
            ) : (
              <p className="py-5 text-center">Your cart is empty.</p>
            )}
          </div>
          <div className="my-10 shrink-0 border-t border-neutral-300 lg:mx-10 lg:my-0 lg:border-l lg:border-t-0 xl:mx-16 2xl:mx-20" />
          <div className="flex-1">
            <div className="sticky top-28">
              <h3 className="text-2xl font-semibold">Summary</h3>
              <div className="mt-7 divide-y divide-neutral-300 text-sm">
                <div className="flex justify-between pb-4">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <ButtonPrimary 
                href={checkoutUrl || '#'} 
                className={`mt-8 w-full ${!checkoutUrl ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!checkoutUrl}
              >
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
