'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { closeAuthModal } from '@/store/slices/authModalSlice';
import Link from 'next/link';

const LoginModal = () => {
  const isOpen = useAppSelector((state) => state.authModal?.isOpen);
  const dispatch = useAppDispatch();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => dispatch(closeAuthModal())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-8 text-left align-middle shadow-2xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-neutral-900 dark:text-white text-center mb-4">
                  Sign in required
                </Dialog.Title>
                <div className="mt-2 text-center">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    You need to be logged in to access this feature. Please sign in or create an account to proceed.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Link href="/login" onClick={() => dispatch(closeAuthModal())} className="w-full inline-flex justify-center rounded-full border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none">
                    Sign In
                  </Link>
                  <Link href="/signup" onClick={() => dispatch(closeAuthModal())} className="w-full inline-flex justify-center rounded-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none">
                    Create an account
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
