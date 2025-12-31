import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "mycart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existingItem.quantity++;
      }
      state.totalQuantity++; // Ensure totalQuantity updates properly
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalQuantity++; 
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--; 
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find((item) => item.id === action.payload);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; 
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
