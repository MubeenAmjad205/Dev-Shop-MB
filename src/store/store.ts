import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

const loadState = (): any => {
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

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    wishlist: store.getState().wishlist,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export CartState so that it can be named.
export type { CartState };
