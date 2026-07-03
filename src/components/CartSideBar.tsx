'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaBagShopping } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

import ButtonCircle3 from '@/shared/Button/ButtonCircle3';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import ButtonSecondary from '@/shared/Button/ButtonSecondary';
import InputNumber from '@/shared/InputNumber/InputNumber';
import Loading from '@/app/loading';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeCartItemAsync, updateCartItemAsync, fetchCartAsync, CartItem } from '@/store/slices/cartSlice';
import toast from 'react-hot-toast';

export interface CartSideBarProps {}

const CartSideBar: React.FC<CartSideBarProps> = () => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOpenMenu = () => setIsVisible(true);
  const handleCloseMenu = () => setIsVisible(false);

  const handleRemoveItem = async (id: string) => {
    const toastId = toast.loading('Removing item...');
    const resultAction = await dispatch(removeCartItemAsync(id));
    if (removeCartItemAsync.fulfilled.match(resultAction)) {
      toast.success('Item removed', { id: toastId });
    } else {
      toast.error('Failed to remove item', { id: toastId });
    }
  };

  const handleUpdateQuantity = async (id: string, newVal: number) => {
    const toastId = toast.loading('Updating quantity...');
    const resultAction = await dispatch(updateCartItemAsync({ lineId: id, quantity: newVal }));
    if (updateCartItemAsync.fulfilled.match(resultAction)) {
      toast.success('Quantity updated', { id: toastId });
    } else {
      toast.error('Failed to update quantity', { id: toastId });
    }
  };

  const renderProduct = (item: CartItem) => {
    const { id, title, price, quantity, image, productHandle } = item;
    const coverImage = image || '/fallback.jpg';
    const productSlug = productHandle || '#';

    return (
      <div key={id} className="flex py-5 last:pb-0">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            fill
            src={coverImage}
            alt={title}
            className="size-full object-contain object-center"
          />
          <Link onClick={handleCloseMenu} className="absolute inset-0" href={`/products/${productSlug}`} />
        </div>
        <div className="ml-4 flex flex-1 flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">
                  <Link onClick={handleCloseMenu} href={`/products/${productSlug}`}>
                    {title}
                  </Link>
                </h3>
              </div>
              <span className="font-medium">${price}</span>
            </div>
          </div>
          <div className="flex w-full items-end justify-between text-sm mt-4">
            <div className="flex items-center gap-3">
              <AiOutlineDelete
                className="text-2xl cursor-pointer text-red-500 transition-colors hover:text-red-700"
                onClick={() => handleRemoveItem(id)}
              />
            </div>
            <div>
              <InputNumber
                value={quantity}
                onChange={(newVal) => handleUpdateQuantity(id, newVal)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={handleCloseMenu}>
        <div className="z-max fixed inset-y-0 right-0 w-full max-w-md outline-none focus:outline-none md:max-w-md">
          <Transition.Child
            as={Fragment}
            enter="transition duration-100 transform"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition duration-150 transform"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div className="relative z-20">
              <div className="overflow-hidden shadow-lg ring-1 ring-black/5 rounded-l-3xl">
                <div className="relative h-screen bg-surface dark:bg-neutral-900 transition-colors duration-300">
                  <div className="hiddenScrollbar h-screen overflow-y-auto p-5 pb-40">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">Shopping cart</h3>
                      <ButtonCircle3 onClick={handleCloseMenu}>
                        <MdClose className="text-2xl" />
                      </ButtonCircle3>
                    </div>
                    <div className="divide-y divide-neutral-300 mt-4">
                      {cartStatus === 'loading' && cartItems.length === 0 ? (
                         <div className="flex justify-center p-10"><Loading /></div>
                      ) : cartItems.length > 0 ? (
                        cartItems.map((item) => renderProduct(item))
                      ) : (
                        <p className="py-5 text-center">Your cart is empty.</p>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-neutral-50 p-5 shadow-2xl">
                    <p className="flex justify-between">
                      <span>
                        <span className="font-medium">Subtotal</span>
                        <span className="block text-sm text-neutral-500">
                          Shipping and taxes calculated at checkout.
                        </span>
                      </span>
                      <span className="text-xl font-medium">${totalAmount.toFixed(2)}</span>
                    </p>
                    <div className="mt-5 flex items-center gap-5">
                      <ButtonPrimary
                        href={checkoutUrl || '/cart'}
                        onClick={handleCloseMenu}
                        className="w-full flex-1"
                      >
                        Checkout
                      </ButtonPrimary>
                      <ButtonSecondary
                        onClick={handleCloseMenu}
                        href="/cart"
                        className="w-full flex-1 border-2 border-primary text-primary"
                      >
                        View cart
                      </ButtonSecondary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900/60" />
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );

  return (
    <>
      <button
        type="button"
        onClick={handleOpenMenu}
        className="flex items-center gap-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors px-4 py-2 text-primary focus:outline-none"
      >
        <FaBagShopping className="text-xl" />
        <span className="text-sm font-bold tracking-wide lg:block">{totalItems} items</span>
      </button>
      {renderContent()}
    </>
  );
};

export default CartSideBar;
