import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isCustomerLoggedIn: false,
  customerId: null
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
      state.customerId = action.payload
    }
  },
});

export const {
  fullNameChange,
  emailChange,
  passwordChange,
  passwordConfirmationChange,
  isCustomerLoggedInChanger,
  setCustomerId
} = customerSlice.actions;

export default customerSlice.reducer;
