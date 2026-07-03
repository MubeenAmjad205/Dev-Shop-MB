'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export interface LikeButtonProps {
  className?: string;
  productId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  className = '',
  productId,
}) => {
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector((state) => state.wishlist?.items?.includes(productId));
  const requireAuth = useRequireAuth();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    requireAuth(() => {
      dispatch(toggleWishlist(productId));
    });
  };

  return (
    <button
      type="button"
      className={`flex size-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-colors hover:bg-neutral-100 text-neutral-900 ${className}`}
      onClick={handleToggle}
    >
      <svg className="size-5 transition-colors" viewBox="0 0 24 24" fill="none">
        <path
          d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
          stroke={isLiked ? '#ef4444' : 'currentColor'}
          fill={isLiked ? '#ef4444' : 'none'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default LikeButton;
