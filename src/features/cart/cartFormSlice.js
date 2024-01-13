import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullAddress: "",
  streetAddress: "",
  apt: "",
  suburb: "",
  state: "",
  zip: "",
  error: "",
};

const cartFormSlice = createSlice({
  name: "cartForm",
  initialState,
  reducers: {
    setFullAddress: (state, action) => {
      state.fullAddress = action.payload;
    },
    setStreetAddress: (state, action) => {
      state.streetAddress = action.payload;
    },
    setApt: (state, action) => {
      state.apt = action.payload;
    },
    setSuburb: (state, action) => {
      state.suburb = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFullAddress,
  setStreetAddress,
  setApt,
  setSuburb,
  setState,
  setZip,
  setError
} = cartFormSlice.actions;

export default cartFormSlice.reducer;
