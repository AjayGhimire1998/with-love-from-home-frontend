import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getSelectedProduct = createAsyncThunk(
  "homeproduct/getSelectedProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `${API_URL}product/products/${id}`
      );
      // console.log(response.data)
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  selectedProduct: null,
  isProductLoading: false,
  imagePreviewIndex: 0,
  cartItems: [],
  amount: 0,
  cartAmount: 0,
  total: 0,
  isClearCartOpen: false,
  isCheckOutFormOpen: false,
  isStartPaymentFormOpen: false,
  isFinalCheckOutButtonOpen: false,
  fullName: "",

  phone: "",
  email: "",
  createdCarts: [],
};

const homeproductSlice = createSlice({
  name: "homeproduct",
  initialState,
  reducers: {
    setImagePreviewIndex: (state, action) => {
      state.imagePreviewIndex = action.payload;
    },
    increase: (state) => {
      state.amount += 1;
    },
    decrease: (state) => {
      state.amount -= 1;
      if (state.amount < 0) {
        state.amount = 0;
      }
    },
    addToCart: (state) => {
      state.cartItems.push({
        product: state.selectedProduct,
        amount: state.amount,
        id: state.selectedProduct.id,
        totalPrice: state.amount * state.selectedProduct.price,
      });

      state.cartItems = [
        ...new Map(
          state.cartItems.map((product) => [
            product.id,
            product,
            product.amount,
          ])
        ).values(),
      ];

      state.amount = 0;
      state.total = 0;
      state.cartAmount = state.cartItems.length;
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload
      );
      state.cartAmount = state.cartItems.length;
    },

    increaseInCart: (state, action) => {
      const cartItem = state.cartItems.find(
        (product) => product.id === action.payload
      );
      cartItem.amount += 1;
      cartItem.totalPrice = cartItem.amount * cartItem.product.price;
    },
    decreaseInCart: (state, action) => {
      const cartItem = state.cartItems.find(
        (product) => product.id === action.payload
      );
      cartItem.amount -= 1;
      cartItem.totalPrice = cartItem.amount * cartItem.product.price;
    },
    calculateTotal: (state) => {
      let total = 0;
      state.cartItems.forEach((product) => {
        total += product.amount * product.product.price;
      });
      state.total = total;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartAmount = 0;
      state.isClearCartOpen = false;
      state.isCheckOutFormOpen = false;
      state.isFinalCheckOutButtonOpen = false;
      state.selectedProduct = null;
      state.imagePreviewIndex = 0;
      state.amount = 0;
      state.total = 0;
      state.isClearCartOpen = false;
      state.createdCarts = [];
    },
    openClearCartModal: (state) => {
      state.isClearCartOpen = true;
      state.isCheckOutFormOpen = false;
    },
    closeClearCartModal: (state) => {
      state.isClearCartOpen = false;
      state.isCheckOutFormOpen = false;
    },
    openCheckOutForm: (state) => {
      state.isCheckOutFormOpen = true;
      state.isClearCartOpen = false;
    },
    closeCheckOutForm: (state) => {
      state.isCheckOutFormOpen = false;
      state.isClearCartOpen = false;
    },
    openFinalCheckOutButton: (state) => {
      state.isCheckOutFormOpen = false;
      state.isFinalCheckOutButtonOpen = true;
    },
    closeFinalCheckOutButton: (state) => {
      state.isFinalCheckOutButtonOpen = false;
    },
    openStartPaymentForm: (state) => {
      state.isStartPaymentFormOpen = true;
      state.isCheckOutFormOpen = false;
      state.isFinalCheckOutButtonOpen = false;
    },
    closeStartPaymentForm: (state) => {
      state.isStartPaymentFormOpen = false;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCreatedCarts: (state, action) => {
      state.createdCarts.push(action.payload);
    },
  },
  extraReducers: {
    [getSelectedProduct.pending]: (state) => {
      state.isProductLoading = true;
    },
    [getSelectedProduct.fulfilled]: (state, action) => {
      state.selectedProduct = action.payload;
      state.isProductLoading = false;
    },
    [getSelectedProduct.rejected]: (state) => {
      state.isProductLoading = false;
    },
  },
});
export const {
  setImagePreviewIndex,
  increase,
  decrease,
  addToCart,
  removeItem,
  increaseInCart,
  decreaseInCart,
  calculateTotal,
  clearCart,
  openClearCartModal,
  closeClearCartModal,
  openCheckOutForm,
  closeCheckOutForm,
  openFinalCheckOutButton,
  closeFinalCheckOutButton,
  openStartPaymentForm,
  closeStartPaymentForm,
  setFullName,
  setAddress,
  setEmail,
  setPhone,
  setCreatedCarts,
} = homeproductSlice.actions;
export default homeproductSlice.reducer;
