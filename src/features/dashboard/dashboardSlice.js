import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../../app/services/auth-services/auth-header";
import { getCurrentStore, getStore } from "../../app/services/auth-services/auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


const headers = authHeader(getCurrentStore());

export const getStoreOrders = createAsyncThunk(
  "dashboard/getStoreOrders",
  async (id, thunkAPI) => {
    try {
      const response = await axios(
        `http://localhost:3004/api/v1/stores/${id}/orders`, {headers}
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
  recentlyUpdatedOrder: [],
  viewOrderStatus: "pending",
  orderId: null,
  rejectMessage: "",
  dateTime: "",
  approveMessage: "",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setViewOrderStatusToApproved: (state) => {
      state.viewOrderStatus = "approved";
    },
    setViewOrderStatusToPending: (state) => {
      state.viewOrderStatus = "pending";
    },
    setViewOrderStatusToRejected: (state) => {
      state.viewOrderStatus = "rejected";
    },
    setRecentlyUpdatedOrder: (state, action) => {
      state.recentlyUpdatedOrder = action.payload;
    },
    replaceRecentlyUpdatedOrder: (state) => {
      state.storeOrders.cart_items = state.storeOrders.cart_items
        .flat(Infinity)
        .map((order) =>
          order.id !== state.recentlyUpdatedOrder.id
            ? order
            : state.recentlyUpdatedOrder
        );
    },
    eraseDeletedOrder: (state, action) => {
      const orderToDelete = state.storeOrders.cart_items
        .flat(Infinity)
        .find((order) => order.id === action.payload);
      state.storeOrders.cart_items = state.storeOrders.cart_items
        .flat(Infinity)
        .filter((order) => order.id !== orderToDelete.id);
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setRejectMessage: (state, action) => {
      state.rejectMessage = action.payload;
    },

    setDateTime: (state, action) => {
      state.dateTime = action.payload;
    },
    setApproveMessage: (state, action) => {
      state.approveMessage = action.payload;
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

export const {
  setStore,
  setViewOrderStatusToApproved,
  setViewOrderStatusToPending,
  setViewOrderStatusToRejected,
  setRecentlyUpdatedOrder,
  replaceRecentlyUpdatedOrder,
  eraseDeletedOrder,
  setOrderId,
  setDateTime,
  setRejectMessage,
  setApproveMessage,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
