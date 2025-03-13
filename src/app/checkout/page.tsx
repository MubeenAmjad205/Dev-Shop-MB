'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdStar } from 'react-icons/md';
import { useMutation } from '@apollo/client';
import LikeButton from '@/components/LikeButton';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import InputNumber from '@/shared/InputNumber/InputNumber';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeItem, updateQuantity } from '@/store/slices/cartSlice';
import type { ProductType } from '@/data/types';
import shopifyClient from '@/lib/shopifyClient';
import {CREATE_CHECKOUT_MUTATION} from '@/queries/shopifyQueries'

const CheckoutPageContent = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [checkoutCreate, { loading: checkoutLoading }] = useMutation(
    CREATE_CHECKOUT_MUTATION,
    { client: shopifyClient }
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate dynamic totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.product.currentPrice) * item.quantity,
    0
  );
  const total = subtotal; // no additional tax

  // Handler to create checkout session and redirect to Shopify checkout
  const handleCheckout = async () => {
    // Map each cart item to Shopify's line item format.
    // IMPORTANT: Ensure each product has a valid variantId.
    if (cartItems.length === 0) {
      alert('Your cart is empty!');

    }else{

      
      const lineItems = cartItems.map((item) => ({
        variantId: item.product.variantId,
      quantity: item.quantity,
    }));
    const input = { lineItems };
    
    try {
      const { data } = await checkoutCreate({ variables: { input } });
      if (data.checkoutCreate.checkout) {
        window.location.href = data.checkoutCreate.checkout.webUrl;
      } else {
        console.error('Checkout errors:', data.checkoutCreate.checkoutUserErrors);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }; 
  };

  const renderProduct = (cartItem: { product: ProductType; quantity: number }) => {
    const { product, quantity } = cartItem;
    const { id, productName, shots, currentPrice, slug, rating, shoeCategory } = product;
    const coverImage = shots?.[0]?.url || '/fallback.jpg';
    const altText = shots?.[0]?.altText || productName;
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
          <Link
            href={`/products/${productSlug}`}
            className="absolute inset-0"
            key={`link-${id}`}
          />
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

  if (!isMounted) return null;

  return (
    <div className="nc-CheckoutPage">
      <main className="container py-16 lg:py-20">
        <div className="mb-16 text-center" key="heading">
          <h2 className="block text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Checkout
          </h2>
        </div>
        <div className="mx-auto max-w-3xl" key="order-summary">
          <h3 className="text-lg font-semibold" key="summary-heading">
            Order Summary
          </h3>
          <div className="mt-8 divide-y divide-neutral-300" key="products">
            {cartItems.length > 0 ? (
              cartItems.map((item) => renderProduct(item))
            ) : (
              <p key="empty" className="py-5 text-center">
                Your cart is empty.
              </p>
            )}
          </div>
          <div className="mt-10 border-t border-neutral-300 pt-6 text-sm" key="totals">
            <div className="mt-4 flex justify-between pb-4" key="subtotal">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 text-base font-semibold" key="total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8" key="confirm-order">
            <ButtonPrimary
              onClick={handleCheckout}
              className="w-full"
              disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Processing...' : 'Confirm Order'}
            </ButtonPrimary>
          </div>
          {/* <div className="mt-3" key="paypal">
            <ButtonSecondary
              className="inline-flex w-full items-center gap-1 border-2 border-primary text-primary"
              href="/checkout"
            >
              <TbBrandPaypal className="text-2xl" />
              PayPal
            </ButtonSecondary>
          </div> */}
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
