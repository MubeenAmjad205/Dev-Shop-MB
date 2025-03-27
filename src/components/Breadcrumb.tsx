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

  return (
    <nav className="m-4 " aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1 text-sm">
        {/* Always show Home */}
        <li>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Home
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          // Build the URL up to the current segment
          const href = '/' + segments.slice(0, index + 1).join('/');
          // Format the segment: replace hyphens with spaces and capitalize first letter
          const displayName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
          return (
            <li key={href} className="flex items-center">
              <span className="text-gray-500 mx-2">{'>'}</span>
              {isLast ? (
                <span className="text-gray-600">{displayName}</span>
              ) : (
                <Link href={href} className="text-blue-500 hover:text-blue-600">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
