'use client';

import { useSession } from '@/lib/auth-client';
import { useAppDispatch } from '@/store/hooks';
import { openAuthModal } from '@/store/slices/authModalSlice';

export const useRequireAuth = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const requireAuth = (action: () => void) => {
    if (session) {
      action();
    } else {
      dispatch(openAuthModal());
    }
  };

  return requireAuth;
};
