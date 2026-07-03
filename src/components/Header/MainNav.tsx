'use client'

import React from 'react';
  import { useRouter } from 'next/navigation';
import { RiSearch2Line } from 'react-icons/ri';
import Input from '@/shared/Input/Input';
import Logo from '@/shared/Logo/Logo';
import CartSideBar from '../CartSideBar';
import MenuBar from './MenuBar';
import { ThemeToggle } from '@/components/ThemeToggle';

const MainNav = () => {
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
  
    if (query) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <div className="container flex items-center justify-between py-4">
      <div className="flex-1 lg:hidden">
        <MenuBar />
      </div>
      <div className="flex items-center gap-4 lg:gap-8 lg:basis-2/3">
        <Logo />
        {/* Show search input on larger screens */}
        <div className="hidden w-full max-w-xl items-center gap-3 rounded-full bg-neutral-100 dark:bg-neutral-800/80 px-5 py-2.5 lg:flex border border-transparent focus-within:border-primary/20 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <RiSearch2Line className="text-xl text-neutral-400" />
          <input
            type="text"
            onChange={handleSearchChange}
            className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-sm placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-100"
            placeholder="Search toys, care products..."
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="h-6 w-[1px] bg-neutral-300 dark:bg-neutral-700 hidden sm:block"></div>
          <CartSideBar />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
