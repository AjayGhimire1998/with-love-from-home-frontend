import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../../app/services/auth-services/auth-header";
import { getStore } from "../../app/services/auth-services/auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

export const getStoreOrders = createAsyncThunk(
  "dashboard/getStoreOrders",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3001/api/v1/stores/${id}/orders`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }
  }
);

const initialState = {
  store: null,
  isOrdersLoading: false,
  storeOrders: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
  extraReducers: {
    [getStoreOrders.pending]: (state) => {
      state.isOrdersLoading = true;
    },
    [getStoreOrders.fulfilled]: (state, action) => {
      state.storeOrders = action.payload;
      state.isOrdersLoading = false;
    },
  },
});

export const { setStore } = dashboardSlice.actions;

export default dashboardSlice.reducer;
