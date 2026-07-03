'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import FormItem from '@/shared/FormItem';
import Input from '@/shared/Input/Input';

const PageLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nc-PageLogin" data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] md:text-5xl md:leading-[115%]">
          Login
        </h2>
        <div className="mx-auto max-w-md">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid gap-6">
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <FormItem label="Email address">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  rounded="rounded-full"
                  sizeClass="h-12 px-4 py-3"
                  placeholder="example@example.com"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                />
              </FormItem>
              <FormItem label="Password">
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rounded="rounded-full"
                  sizeClass="h-12 px-4 py-3"
                  className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                />
              </FormItem>
              <ButtonPrimary type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Continue'}
              </ButtonPrimary>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="block text-center text-sm text-neutral-500 mt-4">
                Don&apos;t have an account? {` `}
                <Link href="/signup" className="text-primary hover:underline">
                  Signup
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
