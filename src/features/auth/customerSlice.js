import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCustomers = createAsyncThunk(
  "customer/getAllCustomers",
  async (name, thunkAPi) => {
    try {
      const response = await axios("http://localhost:3001/api/v1/users")
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
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
  },
  extraReducers: {
    [getAllCustomers.fulfilled]: (state, action) => {
      state.allCustomers = action.payload;
      console.log("fulfilled");
    },
    [getAllCustomers.pending]: (state) => {
      console.log("pending")
    },
    [getAllCustomers.rejected]: (state) => {
      console.log("rejected")
    }
  },
});

export const {
  fullNameChange,
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  isCustomerLoggedInChanger,
  setCustomerId,
} = customerSlice.actions;

export default customerSlice.reducer;
