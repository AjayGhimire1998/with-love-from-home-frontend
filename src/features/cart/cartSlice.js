import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    increase: (state, action) => {
      state.cartItems = state.cartItems.find(
        (item) => item.id === action.payload
      );
      state.amount += 1;
    },
    decrease: (state, action) => {
      state.cartItems = state.cartItems.find(
        (item) => item.id === action.payload
      );
      state.amount -= 1;
    },
  },
});
