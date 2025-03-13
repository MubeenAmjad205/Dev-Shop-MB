import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './slices/cartSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
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
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
  }
};

const preloadedState = {
  cart: loadState(),
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState().cart);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export CartState so that it can be named.
export type { CartState };
