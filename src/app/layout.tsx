import '@/styles/global.css';

import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/shared/Footer/Footer';
// import Breadcrumb from '@/components/Breadcrumb';
import Loading from './loading';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Hotkicks Ecommerce Template',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <Breadcrumb />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  );
}


