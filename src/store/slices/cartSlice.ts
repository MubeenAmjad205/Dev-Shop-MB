import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import shopifyClient from '@/lib/shopifyClient';
import { CART_CREATE, CART_LINES_ADD, CART_LINES_UPDATE, CART_LINES_REMOVE, GET_CART } from '@/queries/shopifyQueries';

export interface CartItem {
  id: string; // The line item ID in Shopify
  variantId: string; // The specific product variant ID
  title: string;
  price: number;
  quantity: number;
  image?: string;
  productHandle?: string;
}

export interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  cartId: typeof window !== 'undefined' ? localStorage.getItem('shopifyCartId') : null,
  checkoutUrl: typeof window !== 'undefined' ? localStorage.getItem('shopifyCheckoutUrl') : null,
  items: [],
  status: 'idle',
  error: null,
};

// Helper to map Shopify GraphQL lines to our CartItem interface
const mapShopifyLinesToCartItems = (linesEdges: any[]): CartItem[] => {
  return linesEdges.map((edge: any) => {
    const node = edge.node;
    const merchandise = node.merchandise;
    const product = merchandise.product;
    return {
      id: node.id, // line item id
      variantId: merchandise.id,
      title: `${product.title} - ${merchandise.title}`,
      price: Number(merchandise.price.amount),
      quantity: node.quantity,
      image: product.images?.edges[0]?.node?.url,
      productHandle: product.handle,
    };
  });
};

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCart',
  async (cartId: string, { rejectWithValue }) => {
    try {
      const response = await shopifyClient.query({
        query: GET_CART,
        variables: { cartId },
        fetchPolicy: 'no-cache', // Ensure fresh cart data
      });
      if (!response.data.cart) {
        return rejectWithValue('Cart not found');
      }
      return response.data.cart;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ variantId, quantity }: { variantId: string; quantity: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: CartState };
      const { cartId } = state.cart;

      if (!cartId) {
        // Create new cart
        const response = await shopifyClient.mutate({
          mutation: CART_CREATE,
          variables: {
            input: {
              lines: [{ merchandiseId: variantId, quantity }],
            },
          },
        });
        const cart = response.data.cartCreate.cart;
        if (!cart) throw new Error('Failed to create cart');
        return cart;
      } else {
        // Add to existing cart
        const response = await shopifyClient.mutate({
          mutation: CART_LINES_ADD,
          variables: {
            cartId,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });
        const cart = response.data.cartLinesAdd.cart;
        if (!cart) throw new Error('Failed to add to cart');
        return cart;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async ({ lineId, quantity }: { lineId: string; quantity: number }, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: CartState };
      const { cartId } = state.cart;
      if (!cartId) throw new Error('No active cart');

      const response = await shopifyClient.mutate({
        mutation: CART_LINES_UPDATE,
        variables: {
          cartId,
          lines: [{ id: lineId, quantity }],
        },
      });
      const cart = response.data.cartLinesUpdate.cart;
      if (!cart) throw new Error('Failed to update cart item');
      return cart;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItemAsync = createAsyncThunk(
  'cart/removeCartItem',
  async (lineId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { cart: CartState };
      const { cartId } = state.cart;
      if (!cartId) throw new Error('No active cart');

      const response = await shopifyClient.mutate({
        mutation: CART_LINES_REMOVE,
        variables: {
          cartId,
          lineIds: [lineId],
        },
      });
      const cart = response.data.cartLinesRemove.cart;
      if (!cart) throw new Error('Failed to remove cart item');
      return cart;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartId = null;
      state.checkoutUrl = null;
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('shopifyCartId');
        localStorage.removeItem('shopifyCheckoutUrl');
      }
    },
  },
  extraReducers: (builder) => {
    const handleFulfilled = (state: CartState, action: any) => {
      state.status = 'idle';
      const cart = action.payload;
      if (cart.id) {
        state.cartId = cart.id;
        state.checkoutUrl = cart.checkoutUrl;
        if (typeof window !== 'undefined') {
          localStorage.setItem('shopifyCartId', cart.id);
          localStorage.setItem('shopifyCheckoutUrl', cart.checkoutUrl);
        }
      }
      state.items = mapShopifyLinesToCartItems(cart.lines.edges);
    };

    const handlePending = (state: CartState) => {
      state.status = 'loading';
      state.error = null;
    };

    const handleRejected = (state: CartState, action: any) => {
      state.status = 'failed';
      state.error = action.payload as string;
    };

    builder
      // fetchCart
      .addCase(fetchCartAsync.pending, handlePending)
      .addCase(fetchCartAsync.fulfilled, handleFulfilled)
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        // If cart is completely lost/expired on Shopify end, clear local state
        state.cartId = null;
        state.checkoutUrl = null;
        state.items = [];
        if (typeof window !== 'undefined') {
          localStorage.removeItem('shopifyCartId');
          localStorage.removeItem('shopifyCheckoutUrl');
        }
      })
      // addToCart
      .addCase(addToCartAsync.pending, handlePending)
      .addCase(addToCartAsync.fulfilled, handleFulfilled)
      .addCase(addToCartAsync.rejected, handleRejected)
      // updateCartItem
      .addCase(updateCartItemAsync.pending, handlePending)
      .addCase(updateCartItemAsync.fulfilled, handleFulfilled)
      .addCase(updateCartItemAsync.rejected, handleRejected)
      // removeCartItem
      .addCase(removeCartItemAsync.pending, handlePending)
      .addCase(removeCartItemAsync.fulfilled, handleFulfilled)
      .addCase(removeCartItemAsync.rejected, handleRejected);
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
