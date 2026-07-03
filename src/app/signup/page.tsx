'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '@/shared/Button/ButtonPrimary';
import FormItem from '@/shared/FormItem';
import Input from '@/shared/Input/Input';

const PageSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Sign up failed');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center justify-center text-3xl font-semibold leading-[115%] md:text-5xl md:leading-[115%]">
          Signup
        </h2>
        <div className="mx-auto max-w-md ">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <FormItem label="First Name">
                  <Input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    rounded="rounded-full"
                    sizeClass="h-12 px-4 py-3"
                    className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                  />
                </FormItem>
                <FormItem label="Last Name">
                  <Input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    rounded="rounded-full"
                    sizeClass="h-12 px-4 py-3"
                    className="border-neutral-300 bg-transparent placeholder:text-neutral-500 focus:border-primary"
                  />
                </FormItem>
              </div>
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
                {loading ? 'Signing up...' : 'Create Account'}
              </ButtonPrimary>
            </div>
            <span className="block text-center text-sm text-neutral-500 mt-4">
              Already have an account? {` `}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
