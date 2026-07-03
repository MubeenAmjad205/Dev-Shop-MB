'use client';

import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // We don't want the storefront Header and Footer here.
  return (
    <div className="flex h-screen bg-surface dark:bg-black overflow-hidden font-sans">
      {!isLoginPage && <AdminSidebar />}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
