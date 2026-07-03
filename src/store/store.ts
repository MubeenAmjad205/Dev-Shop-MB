import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
import wishlistReducer, { WishlistState } from './slices/wishlistSlice';
import authModalReducer, { AuthModalState } from './slices/authModalSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  authModal: authModalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      // Fallback for old cartState
      const oldCart = localStorage.getItem('cartState');
      if (oldCart) return { cart: JSON.parse(oldCart) };
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: Partial<RootState>) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    wishlist: store.getState().wishlist,
  });
});

export type AppDispatch = typeof store.dispatch;

// Re-export CartState so that it can be named.
export type { CartState, WishlistState, AuthModalState };
