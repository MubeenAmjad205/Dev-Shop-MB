import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistState {
  items: string[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const index = state.items.indexOf(action.payload);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
