import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductsImages = createAsyncThunk(
  "static/getProductsImages",
  async (name, thunkAPI) => {
    try {
      const response = await axios("http://localhost:3001/api/v1/products");
      return response.data.products.map((product) => product.images);
    } catch (error) {
      return thunkAPI.rejectWithValue("Somthing went wrong");
    }
  }
);
export const getReviews = createAsyncThunk(
  "static/getReviews",
  async (name, thunkAPI) => {
    try {
      const response = await axios("http://localhost:3001/api/v1/reviews");
      return response.data
        .filter((review) => review.content !== "")
        .slice(0, 9, 1);
    } catch (error) {
      return thunkAPI.rejectWithValue("Somthing went wrong");
    }
  }
);
const initialState = {
  isDataReady: false,
  staticImages: null,
  staticReviews: null,
};

const staticSlice = createSlice({
  name: "static",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductsImages.pending]: (state) => {
      state.staticImages = initialState.staticImages;
    },
    [getProductsImages.fulfilled]: (state, action) => {
      // console.log("Action payload:", action.payload)
      state.staticImages = action.payload;
      state.isDataReady = true;
    },
    [getReviews.fulfilled]: (state, action) => {
      state.staticReviews = action.payload;
    },
  },
});

export default staticSlice.reducer;
