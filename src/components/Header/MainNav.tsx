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
      <div className="flex items-center gap-5 lg:basis-3/5">
        <Logo />
        {/* Show search input on larger screens */}
        <div className="hidden w-full max-w-2xl items-center gap-5 rounded-full border border-neutral-300 py-1 pr-3 lg:flex">
          <Input
            type="text"
            onChange={handleSearchChange}
            className="border-transparent bg-transparent placeholder:text-neutral-500 focus:border-transparent dark:text-neutral-100"
            placeholder="Search toys, care products..."
          />
          <RiSearch2Line className="text-2xl text-neutral-500" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-5">
        
        <div className="flex items-center divide-x divide-neutral-300 dark:divide-neutral-700">
          <ThemeToggle />
          <CartSideBar />
        </div>
      </div>
    </div>
  );
};

export default MainNav;
