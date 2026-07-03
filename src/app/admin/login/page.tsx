'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/shared/Logo/Logo';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        toast.success('Welcome back, Admin!');
        router.push('/admin/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="bg-white dark:bg-neutral-900 p-10 rounded-3xl shadow-xl w-full max-w-md border border-neutral-100 dark:border-neutral-800">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Admin Portal</h2>
        <p className="text-neutral-500 text-center mb-8">Enter your secure credentials to manage the store.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Master Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-surface dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" 
              required
            />
          </div>
          <ButtonPrimary type="submit" className="w-full py-3" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Login'}
          </ButtonPrimary>
        </form>
      </div>
    </div>
  );
}
