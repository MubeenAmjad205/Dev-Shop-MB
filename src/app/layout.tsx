import '@/styles/global.css';

import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/shared/Footer/Footer';
// import Breadcrumb from '@/components/Breadcrumb';
import Loading from './loading';
import Breadcrumb from '@/components/Breadcrumb';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';

import globalConfig from '@/core/config/global.json';

export const metadata: Metadata = {
  title: globalConfig.seo.defaultTitle,
  description: globalConfig.seo.defaultDescription,
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
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NuqsAdapter>
            <Header />
            <Breadcrumb />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
            <Toaster position="bottom-right" toastOptions={{ className: 'dark:bg-neutral-800 dark:text-white' }} />
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}


