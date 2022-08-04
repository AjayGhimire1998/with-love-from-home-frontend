import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCustomerLoggedIn: false,
  isStoreLoggedIn: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    changeNavBarForCustomers: (state) => {
      state.isCustomerLoggedIn = true;
    },
    changeNavBarForStores: (state) => {
      state.isStoreLoggedIn = true;
    },
  },
});

export const { changeNavBarForCustomers, changeNavBarForStores } =
  navbarSlice.actions;

export default navbarSlice.reducer;
