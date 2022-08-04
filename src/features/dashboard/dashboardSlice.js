import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../../app/services/auth-services/auth-header";
import { getStore } from "../../app/services/auth-services/auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  store: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStore } = dashboardSlice.actions;

export default dashboardSlice.reducer;
