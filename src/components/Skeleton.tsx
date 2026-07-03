import React from 'react';

export const Skeleton = ({
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800 ${className}`}
      {...props}
    />
  );
};

export const SkeletonProductCard = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[250px] w-full lg:h-[220px]" />
    <div className="space-y-2 mt-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const SkeletonPage = () => (
  <div className="container py-16 space-y-8">
    <Skeleton className="h-10 w-1/3" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
      <SkeletonProductCard />
    </div>
  </div>
);
