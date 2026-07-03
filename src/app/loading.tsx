import React from 'react';
import { SkeletonPage } from '@/components/Skeleton';

const Loading = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <SkeletonPage />
    </div>
  );
};

export default Loading;
