import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async (name, thunkAPi) => {
    try {
      const response = await axios("http://localhost:3004/api/v1/users");
      return response.data;
    } catch (error) {
      thunkAPi.rejectWithValue("Something went wrong");
    }
  }
);
const initialState = {
  fullName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isCustomerLoggedIn: false,
  customerId: null,
  allCustomers: [],
  error: null,
  tokken: "Token From Email",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fullNameChange: (state, action) => {
      state.fullName = action.payload;
    },
    emailChange: (state, action) => {
      state.email = action.payload;
    },
    passwordChange: (state, action) => {
      state.password = action.payload;
    },
    passwordConfirmationChange: (state, action) => {
      state.passwordConfirmation = action.payload;
    },
    isCustomerLoggedInChanger: (state) => {
      state.isCustomerLoggedIn = true;
    },
    isCustomerLoggedInChangerToFalse: (state) => {
      state.isCustomerLoggedIn = false;
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTokken: (state, action) => {
      state.tokken = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.allCustomers = action.payload;
      // console.log("fulfilled");
    },
    [getAllCustomers.pending]: (state) => {
      // console.log("pending");
    },
    [getAllCustomers.rejected]: (state) => {
      // console.log("rejected");
    },
  },
});

export const {
  fullNameChange,
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  isCustomerLoggedInChanger,
  isCustomerLoggedInChangerToFalse,
  setCustomerId,
  setError,
  setTokken,
  clearError,
} = customerSlice.actions;

export default customerSlice.reducer;
