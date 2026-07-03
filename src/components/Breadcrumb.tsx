'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface BreadcrumbProps {}

const Breadcrumb: React.FC<BreadcrumbProps> = () => {
  // Get the current pathname (e.g., "/products/sneakers")
  const pathname = usePathname();
  // Split the pathname into segments and filter out any empty strings.
  const segments = pathname.split('/').filter((seg) => seg !== '');

  // Don't render breadcrumbs on the home page
  if (segments.length === 0) return null;

  return (
    <nav className="container mt-6 mb-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 px-5 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full shadow-sm">
        {/* Always show Home */}
        <li className="inline-flex items-center">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = '/' + segments.slice(0, index + 1).join('/');
          const displayName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
            
          return (
            <li key={href}>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-neutral-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {isLast ? (
                  <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 ml-1">
                    {displayName}
                  </span>
                ) : (
                  <Link 
                    href={href} 
                    className="text-sm font-medium text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors ml-1"
                  >
                    {displayName}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
